import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document implements UserDocument {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  bio: string;

  @Prop()
  profilePicture: string;

  @Prop()
  contactDetails: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  bio: string;
  profilePicture: string;
  contactDetails: string;
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
