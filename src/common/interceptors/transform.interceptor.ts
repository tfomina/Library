import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  status: string;
}

@Injectable()
export class TranfrormInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T> | any> {
    return next.handle().pipe(
      map((data) => ({ data, status: 'success' })),
      catchError((err) =>
        throwError(new HttpException('Error', HttpStatus.BAD_GATEWAY)),
      ),
    );
  }
}
