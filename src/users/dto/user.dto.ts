import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  readonly password?: string;
}
