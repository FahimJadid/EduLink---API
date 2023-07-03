import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/user.model';

@Schema()
export class Post extends Document implements PostDocument {
  @Prop({ type: User, required: true })
  author: User;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export interface PostDocument extends Document {
  author: User;
  content: string;
  createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
