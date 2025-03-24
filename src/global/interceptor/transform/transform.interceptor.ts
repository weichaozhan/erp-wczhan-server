import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';
import { IS_IGNORE_TRANS } from '../../../global/decorator/public.decorator';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isIgnoreTrans = this.reflector.getAllAndOverride<boolean>(
      IS_IGNORE_TRANS,
      [context.getHandler(), context.getClass()],
    );

    if (isIgnoreTrans) {
      return next.handle();
    }
    return next.handle().pipe(
      map((data) => ({
        code: 0,
        message: '请求成功',
        data,
      })),
    );
  }
}
