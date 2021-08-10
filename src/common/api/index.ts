import { Maybe } from '@xpacked/tool-belt';
import axios from 'axios';
import { maybeGetJWT } from '../storage';

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
  authorizeToken(): Promise<Maybe<Omit<User, 'password'>>>;
}

export const api: Api = {
  async fetchAllWorkouts() {
    const headers = await getAuthorizationHeader();
    const response = await http.get('workouts', { headers });
    return Maybe.fromValue(response.data);
  },
  async fetchWorkoutById(id: string) {
    const headers = await getAuthorizationHeader();
    const response = await http.get(`workouts/${id}`, { headers });
    return Maybe.fromValue(response.data);
  },
  async addWorkout(workout: Omit<IWorkout, 'id'>) {
    const headers = await getAuthorizationHeader();
    await http.post('workouts', workout, { headers });
  },
  async updateWorkout(workout: IWorkout) {
    const headers = await getAuthorizationHeader();
    await http.put(`workouts/${workout.id}`, workout, { headers });
  },
  async deleteWorkout(id: string) {
    const headers = await getAuthorizationHeader();
    await http.delete(`workouts/${id}`, { headers });
  },
  async signUp(user: Omit<User, 'id'>) {
    const response = await http.post(`auth/signup`, user);
    return Maybe.fromValue(response.data);
  },
  async logIn(user: Omit<User, 'id'>) {
    const response = await http.post(`auth/login`, user);
    return Maybe.fromValue(response.data);
  },
  async authorizeToken() {
    const headers = await getAuthorizationHeader();
    const response = await http.get(`auth/authorize`, { headers });
    return Maybe.fromValue(response.data);
  }
};

async function getAuthorizationHeader() {
  const maybeJWT = await maybeGetJWT();
  return maybeJWT.inCaseOf({
    Nothing: () => {
      return {};
    },
    Just: (jwt) => {
      return {
        Authorization: `Bearer ${jwt}`
      };
    }
  });
}
