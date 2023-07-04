import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder } from 'mongoose';
import { Post, PostDocument } from './post.model';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  async findAll(
    queryDto: PaginationQueryDto,
    searchQuery: string,
  ): Promise<Post[]> {
    const { limit, page, sortBy, sortField } = queryDto;
    const skip = (page - 1) * limit;

    let query = this.postModel.find();

    // Apply search query if provided
    if (searchQuery) {
      query = query.find({
        $or: [
          { title: { $regex: searchQuery, $options: 'i' } },
          { content: { $regex: searchQuery, $options: 'i' } },
        ],
      });
    }

    // Apply sorting options if provided
    if (sortField && sortBy) {
      const sortOptions: { [key: string]: SortOrder } = {
        [sortField]: sortBy === 'asc' ? 1 : -1,
      };
      query = query.sort(sortOptions);
    }

    query = query.skip(skip).limit(limit);

    return query.exec();
  }

  async findOne(id: string): Promise<Post> {
    return this.postModel.findById(id).exec();
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    return this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true });
  }

  async remove(id: string): Promise<Post> {
    return this.postModel.findByIdAndRemove(id);
  }
}
