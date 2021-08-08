import { Api, User } from '../common/api';

export type Ports = {
  api: Api;
  user: Omit<User, 'password'>;
};
