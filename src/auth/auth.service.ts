import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/users/users.repository';
import { Role } from '../auth/roles';
import { User } from '../users/user.model';
import { JwtPayload } from '../auth/jwt-payload.interface';
import { LoginDto, RegisterDto, AuthResponseDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
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

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.generateJwtToken(user);

    const authResponse: AuthResponseDto = {
      accessToken,
      expiresIn: this.configService.get<number>('JWT_EXPIRATION_TIME'),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };

    return authResponse;
  }

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { email, password } = registerDto;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    const newUser = new User();
    newUser.email = email;
    newUser.password = password;
    newUser.role = Role.User;

    const createdUser = await this.userRepository.save(newUser);

    const accessToken = await this.generateJwtToken(createdUser);

    const authResponse: AuthResponseDto = {
      accessToken,
      expiresIn: this.configService.get<number>('JWT_EXPIRATION_TIME'),
      user: {
        id: createdUser.id,
        email: createdUser.email,
        role: createdUser.role,
      },
    };

    return authResponse;
  }
}
