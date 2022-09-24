import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { decodePassword } from 'src/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/types';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('USER_SERVICE') private readonly usersService: UsersService,
  ) {}
  async validateUser(username: string, password: string) {
    const userDb = await this.usersService.findUserByusername(username);
    if (userDb) {
      const decodedPassword = decodePassword(password, userDb.password);
      if (decodedPassword) {
        return userDb;
      } else {
        return null;
      }
    } else return null;
  }

  async login(user: User) {
    const payload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
