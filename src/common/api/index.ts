import { Maybe } from '@unpacked/tool-belt';
import axios from 'axios';

export type Goal = 'strength' | 'hypertrophy';

export type IWorkout = {
  id: string;
  name: string;
  goal: Goal;
};

export type User = {
  id: string;
  email: string;
  password: string;
};

export type JWTResponse = {
  jwt: string;
};

const baseURL = __DEV__ ? 'http://localhost:8080' : 'https://swole-workouts.herokuapp.com/';
const http = axios.create({ baseURL });

export type Api = {
  fetchAllWorkouts(): Promise<Maybe<IWorkout[]>>;
  fetchWorkoutById(id: string): Promise<Maybe<IWorkout>>;
  addWorkout(workout: Omit<IWorkout, 'id'>): Promise<void>;
  updateWorkout(workout: IWorkout): Promise<void>;
  deleteWorkout(id: string): Promise<void>;
  signUp(user: Omit<User, 'id'>):Promise<Maybe<Omit<User, 'password'> & JWTResponse>>;
  logIn(user: Omit<User, 'id'>): Promise<Maybe<Omit<User, 'password'> & JWTResponse>>;
  authorizeToken(jwt: string): Promise<Maybe<Omit<User, 'password'>>>;
}

export const api: Api = {
  async fetchAllWorkouts() {
    const response = await http.get('workouts');
    return Maybe.fromValue(response.data);
  },
  async fetchWorkoutById(id: string) {
    const response = await http.get(`workouts/${id}`);
    return Maybe.fromValue(response.data);
  },
  async addWorkout(workout: Omit<IWorkout, 'id'>) {
    await http.post('workouts', workout);
  },
  async updateWorkout(workout: IWorkout) {
    await http.put(`workouts/${workout.id}`, workout);
  },
  async deleteWorkout(id: string) {
    await http.delete(`workouts/${id}`);
  },
  async signUp(user: Omit<User, 'id'>) {
    const response = await http.post(`auth/signup`, user);
    return Maybe.fromValue(response.data);
  },
  async logIn(user: Omit<User, 'id'>) {
    const response = await http.post(`auth/login`, user);
    return Maybe.fromValue(response.data);
  },
  async authorizeToken(jwt: string) {
    const response = await http.get(`auth/authorize`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    return Maybe.fromValue(response.data);
  }
};
