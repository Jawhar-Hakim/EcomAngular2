export enum Role {
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
  CUSTOMER = 'CUSTOMER'
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  active: boolean;
  createdAt: number;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
