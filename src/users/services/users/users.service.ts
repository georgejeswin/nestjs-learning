import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { SerializedUser, User } from 'src/users/types';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      userName: 'testUser1',
      password: '123456',
    },
    {
      userName: 'testUser2',
      password: '123456',
    },
    {
      userName: 'testUser3',
      password: '123456',
    },
    {
      userName: 'testUser4',
      password: '123456',
    },
  ];

  async findUsers() {
    return this.users.map((user) => plainToClass(SerializedUser, user));
  }

  async findUserByUserName(userName: string) {
    return this.users.find((user) => {
      return userName === user.userName;
    });
  }
}
