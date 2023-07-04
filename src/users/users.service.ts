import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  // pagination
  async findAll(
    queryDto: PaginationQueryDto,
    searchQuery: string,
  ): Promise<User[]> {
    const { limit, page } = queryDto;
    const skip = (page - 1) * limit;

    let query = this.userModel.find();

    // Apply search query if provided
    if (searchQuery) {
      query = query.find({
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          { email: { $regex: searchQuery, $options: 'i' } },
        ],
      });
    }

    query = query.skip(skip).limit(limit);

    return query.exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id);
  }
}
