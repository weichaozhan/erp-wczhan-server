import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { LocalStrategy } from 'src/global/strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { getJWTOptions } from '../global/tools';
import { CaptchaGuard } from '../global/guard/captcha.guard';

const jwtModule = JwtModule.register(
  getJWTOptions(process.env.NODE_ENV === 'development'),
);

@Module({
  imports: [TypeOrmModule.forFeature([User]), jwtModule],
  controllers: [AuthController],
  providers: [CaptchaGuard, LocalStrategy, AuthService],
  exports: [jwtModule],
})
export class AuthModule {}
