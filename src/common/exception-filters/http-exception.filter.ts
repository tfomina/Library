import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus() || 500;
    const errorMessage = exception.message;

    response.status(statusCode).json({
      timestamp: new Date().toISOString(),
      status: 'fail',
      data: errorMessage,
      code: statusCode,
    });
  }
}
