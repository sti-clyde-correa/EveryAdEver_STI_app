import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserWithPassword } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findAll() {
        const users = await this.usersRepository.find();
        return users.map(({ password_hash, ...user }) => user);
    }

    async findByUsernameAll(username: string, includePassword = false): Promise<any> {
        let query = this.usersRepository.createQueryBuilder('user')
            //   .where('user.username = :username', { username });
            .where('1=1');

        if (!includePassword) {
            query = query.select([
                'user.user_id',
                'user.username',
                'user.email',
                'user.created_at',
                'user.updated_at',
            ]);
        }

        const user = await query.getOne();
        if (!user) {
            throw new NotFoundException(`User with username "${username}" not found`);
        }
        return user;
    }


  async findOne(user_id: string) {
    const user = await this.usersRepository.findOne({ where: { user_id } });
    if (!user) {
        throw new NotFoundException(`User with ID "${user_id}" not found`);
    }
    const { password_hash, ...result } = user;
    return result;
}

//   async findByUsername(username: string, includePassword = false) : Promise<UserWithPassword | null> {
//     const user = await this.usersRepository.findOne({ where: { username } });
//     if (!user) {
//       throw new NotFoundException(`User with username "${username}" not found`);
//     }
//     if (includePassword) {
//       return user;
//     }
//     const { password_hash, ...result } = user;
//     return result;
//   }
async findByUsername<T extends boolean>(
    username: string,
    includePassword: T
): Promise < T extends true ? UserWithPassword : User > {
    const user = await this.usersRepository.findOne({ where: { username } });

    if(!user) {
        throw new NotFoundException(`User with username "${username}" not found`);
    }

  if(includePassword) {
        return user as any; // Has password_hash
    }

  const { password_hash, ...result } = user;
    return result as any;
}


  async create(user: { username: string; email: string; password_hash: string }) {
    const newUser = this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    const { password_hash, ...result } = newUser;
    return result;
}
}
