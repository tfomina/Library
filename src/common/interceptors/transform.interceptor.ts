import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
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
      map((data) => {
        if (!data) {
          throw new NotFoundException();
        }
        return { data, status: 'success' };
      }),
      catchError((err) => {
        console.log(err);
        return throwError(err);
      }),
    );
  }
}
