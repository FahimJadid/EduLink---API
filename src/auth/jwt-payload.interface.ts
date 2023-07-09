import { Role } from './roles';

export interface JwtPayload {
  sub: string; // User ID
  email: string; // User email
  role: Role; // User role
}
