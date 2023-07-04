import { IsOptional, IsInt, Min, IsIn } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  search?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortBy: 'asc' | 'desc';

  @IsOptional()
  @IsIn(['name', 'email', 'createdAt']) // Add more fields for sorting here
  sortField: string;
}
