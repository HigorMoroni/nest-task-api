import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  private readonly users: UserDto[] = [];

  create(newUser: UserDto) {
    this.users.push({
      ...newUser,
      id: uuid(),
      password: hashSync(newUser.password, 10),
    });
  }

  findByUserName(username: string): UserDto | undefined {
    return this.users.find((user) => user.username === username);
  }
}
