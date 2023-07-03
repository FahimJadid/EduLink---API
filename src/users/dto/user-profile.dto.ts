import { IsString, IsOptional } from 'class-validator';

export class UserProfileDto {
  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsString()
  contactDetails?: string;
}
