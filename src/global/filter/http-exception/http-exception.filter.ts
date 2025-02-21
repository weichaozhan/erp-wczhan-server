import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res: Response = ctx.getResponse();
    const status = exception.getStatus();

    const defaultMsg = status >= 500 ? 'Internal server error' : 'Bad request';
    const message = exception.message ? exception.message : defaultMsg;

    const errorRes = {
      code: status,
      message,
      content: exception.getResponse(),
    };

    res.status(status);
    res.send(errorRes);
    res.header('Content-Type', 'application/json; charset=utf-8');
  }
}
