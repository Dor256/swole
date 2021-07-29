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

const baseURL = 'http://localhost:8080/';
const http = axios.create({ baseURL });

export type Api = {
  fetchAllWorkouts(): Promise<Maybe<IWorkout[]>>;
  fetchWorkoutById(id: string): Promise<Maybe<IWorkout>>;
  addWorkout(workout: Omit<IWorkout, 'id'>): Promise<void>;
  updateWorkout(workout: IWorkout): Promise<void>;
  deleteWorkout(id: string): Promise<void>;
  signUp(user: Omit<User, 'id'>): Promise<void>;
  logIn(user: Omit<User, 'id'>): Promise<Maybe<Omit<User, 'password'>>>;
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
    await http.post('workouts', { data: workout });
  },
  async updateWorkout(workout: IWorkout) {
    await http.put(`workouts/${workout.id}`, { data: workout });
  },
  async deleteWorkout(id: string) {
    await http.delete(`workouts/${id}`);
  },
  async signUp(user: Omit<User, 'id'>) {
    await http.post(`auth/signup`, user);
  },
  async logIn(user: Omit<User, 'id'>) {
    const response = await http.post(`auth/login`, user);
    return Maybe.fromValue(response.data);
  }
};
