import { Controller, Post, Patch, Param, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  RoleDto,
  LoginDto,
  RegisterDto,
  AuthResponseDto,
} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Patch('assign-role/:userId')
  async assignRole(
    @Param('userId') userId: string,
    @Body() roleDto: RoleDto,
  ): Promise<void> {
    await this.authService.assignRole(userId, roleDto.role);
  }

  @Patch('revoke-role/:userId')
  async revokeRole(
    @Param('userId') userId: string,
    @Body() roleDto: RoleDto,
  ): Promise<void> {
    await this.authService.revokeRole(userId, roleDto.role);
  }

  @Patch('update-role/:userId')
  async updateRole(
    @Param('userId') userId: string,
    @Body() roleDto: RoleDto,
  ): Promise<void> {
    await this.authService.updateRole(userId, roleDto.role);
  }
}
