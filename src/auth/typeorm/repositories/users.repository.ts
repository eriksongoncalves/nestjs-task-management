import {
  ConflictException,
  InternalServerErrorException
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';

import { AuthCredentialsDto } from '../../dto/auth-credentials-dto';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;

    const salt = await genSalt();
    const passwordHash = await hash(password, salt);

    const user = this.create({
      username,
      password: passwordHash
    });

    try {
      await this.save(user);
      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      }

      console.log(error);

      console.log(error.code);

      throw new InternalServerErrorException();
    }
  }
}
