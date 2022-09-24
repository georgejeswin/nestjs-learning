import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { HttpExceptionFilter } from 'src/users/exceptionFilters/HttpException.filter';
import { UserNotFounException } from 'src/users/exceptions/userNotFound.exception';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types';

// Using Interceptors
@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getUsers() {
    return this.userService.findUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  // Using custom exception filter
  @UseFilters(HttpExceptionFilter)
  @Get('/:username')
  async getUserByusername(@Param('username') username: string) {
    const user = await this.userService.findUserByusername(username);
    if (user) {
      return new SerializedUser(user);
    } else {
      // Using custom exception
      throw new UserNotFounException('User not found');
    }
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
