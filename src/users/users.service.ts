import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    return this.userModel.create(user);
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).select('id email firstName lastName');
  }

  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }
}
