import {
  Controller,
  Post,
  Get,
  UsePipes,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { userSchema } from './joi/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { User } from './schemas/user.schema';
import { MongoDBErrorCodes } from 'src/db/mongoDBErrorCodes.enum';

const saltOrRounds = 10;

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @UsePipes(new JoiValidationPipe(userSchema))
  async create(@Body() registrationData: RegisterUserDto): Promise<User> {
    const passwordHash = await bcrypt.hash(
      registrationData.password,
      saltOrRounds,
    );

    try {
      const user = await this.usersService.create({
        ...registrationData,
        passwordHash,
      });
      user.passwordHash = undefined;
      return user;
    } catch (error) {
      if (error?.code === MongoDBErrorCodes.UniqueViolation) {
        throw new HttpException(
          'Пользователь с таким email уже зарегистрирован',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Произошла ошибка',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    try {
      return await this.usersService.findById(id);
    } catch (error) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
  }
}
