import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(user: Partial<User>) {
    console.log('user', user);
    const payload: Partial<User> = {
      username: user.username,
      userId: user.userId,
      id: user.id,
      email: user.email,
      roles: user.roles,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      type: 'Bearer',
      accessToken,
    };
  }
}
