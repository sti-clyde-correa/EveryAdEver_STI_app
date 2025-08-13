import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private readonly users = [];

  async findAll() {
    return this.users;
  }

  async findOne(id: string) {
    return this.users.find(user => user.id === id);
  }

  async findByUsername(username: string) {
    return this.users.find(user => user.username === username);
  }

  async create(user: { username: string; email: string; password_hash: string }) {
    const newUser = {
      id: uuidv4(),
      ...user,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.users.push(newUser);
    const { password_hash, ...result } = newUser;
    return result;
  }
}
