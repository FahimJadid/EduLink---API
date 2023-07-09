import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEnum,
} from 'class-validator';
import { Role } from '../roles';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'Password too weak',
  })
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}

export class AuthResponseDto {
  accessToken: string;
  expiresIn: number;
  user: {
    id: string;
    email: string;
    role: Role;
  };
}

export class RoleDto {
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
