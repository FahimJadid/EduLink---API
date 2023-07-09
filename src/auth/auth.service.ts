import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/users/users.repository';
import { Role } from '../auth/roles';
import { User } from '../users/user.model';
import { JwtPayload } from '../auth/jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async assignRole(userId: string, role: Role): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (user) {
      user.role = role;
      await this.userRepository.update(user);
    }
  }

  async revokeRole(userId: string, role: Role): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (user && user.role === role) {
      user.role = null;
      await this.userRepository.update(user);
    }
  }

  async updateRole(userId: string, newRole: Role): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (user) {
      user.role = newRole;
      await this.userRepository.update(user);
    }
  }

  //
  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async generateJwtToken(user: User): Promise<string> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }
}
