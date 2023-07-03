import { Module } from '@nestjs/common';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Post, PostSchema } from './post.model';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
