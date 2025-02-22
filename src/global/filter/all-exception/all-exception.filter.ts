import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: Error & QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res: Response = ctx.getResponse();
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.status(500);
    res.send({
      code: 500,
      message: exception?.message,
      exception,
    });
  }
}
