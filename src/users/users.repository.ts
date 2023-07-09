import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';
import { Role } from '../auth/roles';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findById(userId: string): Promise<User | null> {
    return this.userModel.findById(userId).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findByRole(role: Role): Promise<User[]> {
    return this.userModel.find({ role }).exec();
  }

  async updateRole(userId: string, role: Role): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(userId, { role }, { new: true })
      .exec();
  }

  async save(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async update(user: User): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(user._id, user, { new: true })
      .exec();
  }

  async delete(userId: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(userId).exec();
  }
}
