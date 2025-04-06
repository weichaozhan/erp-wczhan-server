import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: Partial<User>) {
    const payload = {
      username: user.username,
      userId: user.userId,
      id: user.id,
      email: user.email,
    };
    const accessToken = this.jwtService.sign(payload);

    console.log('payload', payload);

    return {
      type: 'Bearer',
      accessToken,
    };
  }
}
