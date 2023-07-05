import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/users/users.repository';
import { Role } from '../auth/roles';
import { User } from '../users/user.model';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

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
}
