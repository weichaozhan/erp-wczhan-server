import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from 'src/types/static';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res: Response = ctx.getResponse();
    const status = exception.getStatus();

    const defaultMsg = status >= 500 ? 'Internal server error' : 'Bad request';
    const expRes = exception.getResponse();
    const message = exception.message ? exception.message : defaultMsg;

    let expResMsg: string = '';
    if (typeof expRes === 'string') {
      expResMsg = expRes;
    } else if (Object.prototype.toString.call(expRes) === '[object Object]') {
      expResMsg = (expRes as any)?.message?.toString();
    }

    const errorRes: ApiResponse = {
      code: status,
      message: expResMsg || message,
      content: expRes,
    };

    res.status(status);
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.send(errorRes);
  }
}
