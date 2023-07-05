import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/auth/roles';

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

  @Prop({ default: Role.User })
  role: Role;
}

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  bio: string;
  profilePicture: string;
  contactDetails: string;
  createdAt: Date;
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ name: 1, email: 1 });
