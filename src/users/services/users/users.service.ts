import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User as UserEntity } from '../../../typeorm';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { SerializedUser, User } from 'src/users/types';
import { Repository } from 'typeorm';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private users: User[] = [];

  async findUsers() {
    return this.users.map((user) => plainToClass(SerializedUser, user));
  }

  async createUser(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    const newUser = await this.userRepository.create({
      ...createUserDto,
      password,
    });
    return this.userRepository.save(newUser);
  }
  async findUserByusername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }
}
