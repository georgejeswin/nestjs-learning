import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  UseInterceptors,
} from '@nestjs/common';
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
  @Get('/:userName')
  async getUserByUserName(@Param('userName') userName: string) {
    const user = await this.userService.findUserByUserName(userName);
    if (user) {
      return new SerializedUser(user);
    }
  }
}
