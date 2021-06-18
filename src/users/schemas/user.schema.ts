import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ require: true, unique: true })
  email: string;

  @Prop({ require: true })
  passwordHash: string;

  @Prop({ require: true })
  firstName: string;

  @Prop({ require: true })
  lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
