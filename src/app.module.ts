import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './global/guard/jwt-auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CaptchaModule } from './captcha/captcha.module';
import { RoleModule } from './role/role.module';
import { SysmoduleModule } from './sysmodule/sysmodule.module';
import { PermissionModule } from './permission/permission.module';

import envConfig from './envConfig';
import { SysModule } from './sysmodule/entities/sysmodule.entity';
import { Role } from './role/entities/role.entity';
import { Permission } from './permission/entities/permission.entity';
import { User } from './user/entities/user.entity';
import { PermissionGuard } from './global/guard/permission.guard';
import { GroupService } from './group/group.service';
import { GroupController } from './group/group.controller';
import { GroupModule } from './group/group.module';
import { Group } from './group/entity/group.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envConfig.path],
    }),
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST') ?? 'localhost',
        port: configService.get('DB_PORT') ?? 3306,
        username: configService.get('DB_USERNAME') ?? 'root',
        password: configService.get('DB_PASSWORD') ?? '123456',
        database: configService.get('DB_DATABASE') ?? 'nest-demo',
        synchronize: true,
        retryDelay: 500,
        retryAttempts: 10,
        autoLoadEntities: true,
      }),
    }),
    TypeOrmModule.forFeature([User, Group, Role, SysModule, Permission]),
    AuthModule,
    CaptchaModule,
    RoleModule,
    SysmoduleModule,
    PermissionModule,
    GroupModule,
  ],
  controllers: [AppController, GroupController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
    GroupService,
  ],
})
export class AppModule {}
