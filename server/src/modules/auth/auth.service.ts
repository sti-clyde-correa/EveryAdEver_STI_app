import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, } from '../user/entities/user.entity';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    private readonly secret = 'mysecret';
    /**
     * Constructor for AuthService.
     *
     * @param userService The user service that provides CRUD operations for users.
     * @param jwtService The JWT service that provides JWT token generation and verification.
     * @param usersRepository The repository for the User entity.
     */
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) { }

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

    async findOne(email: any): Promise<User | null> {
        // const user = await this.userService.findByEmail(email, true);
        // if (!user) return null;

        // const isMatch = await bcrypt.compare(password, user.password_hash);
        // if (!isMatch) return null;

        // const { password_hash, ...result } = user;
        // return result;
        return this.usersRepository.findOne({ where: { email } });
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

    verifyToken(token: string) {
        return jwt.verify(token, this.secret);
    }
}

// export interface User {
//     id: string;
//     username: string;
//     email: string;
//     password_hash: string;
//     created_at: Date;
//     updated_at: Date;
// }
