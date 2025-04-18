import './prepare';

import { NestFactory, Reflector } from '@nestjs/core';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { TransformInterceptor } from './global/interceptor/transform/transform.interceptor';
import { HttpExceptionFilter } from './global/filter/http-exception/http-exception.filter';
import { AllExceptionFilter } from './global/filter/all-exception/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      // 验证器将从已验证（返回的）对象中删除不使用任何验证装饰器的属性。
      whitelist: true,
    }),
  );
  app.use(
    cookieParser(),
    session({
      secret: process.env.SESSION_SECRET,
      cookie: {
        httpOnly: true,
      },
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor(new Reflector()));
  app.useGlobalFilters(new AllExceptionFilter(), new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
