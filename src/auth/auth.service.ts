import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

interface PayloadAuth {
  roles: number[];
  permissions: number[];
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(user: Partial<User>) {
    const payload: Omit<Partial<User>, 'roles'> & PayloadAuth = {
      username: user.username,
      userId: user.userId,
      id: user.id,
      email: user.email,
      roles: user.roles.map((role) => role.id),
      permissions: [],
    };
    const accessToken = this.jwtService.sign(payload);

    console.log('payload', payload);

    return {
      type: 'Bearer',
      accessToken,
    };
  }
}
