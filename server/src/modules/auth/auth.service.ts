import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

//   async validateUser(username: string, password: string): Promise<any> {
//   const user = await this.userService.findByUsername(username, true);

//   // If no user found, return null immediately
//   if (!user) return null;

//   // Check password
//   const isMatch = await bcrypt.compare(password, user.password_hash);
//   if (!isMatch) return null;

//   // Remove password hash before returning
//   const { password_hash, ...result } = user;
//   return result;
// }

async validateUser(username: string, password: string) {
  const user = await this.userService.findByUsername(username, true); // Now TS knows it includes password_hash

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) return null;

  const { password_hash, ...result } = user;
  return result;
}

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, email: string, password: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return this.userService.create({
      username,
      email,
      password_hash: hash,
    });
  }
}

export interface User {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}
