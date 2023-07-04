import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/user.model';

@Schema()
export class Post extends Document implements PostDocument {
  @Prop({ type: User, required: true })
  author: User;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export interface PostDocument extends Document {
  author: User;
  title: string;
  content: string;
  createdAt: Date;
}

// Create an index on the title and content fields
export const PostSchema = SchemaFactory.createForClass(Post);
PostSchema.index({ title: 'text', content: 'text' });
