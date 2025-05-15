export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
}
// test
