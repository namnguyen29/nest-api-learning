import { CallHandler, ClassProvider, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { map, Observable, tap } from 'rxjs';

interface IResponse<T> {
  data: T;
}

@Injectable()
export class LoggingInterceptor<T> implements NestInterceptor<T, IResponse<T>> {
  public intercept(context: ExecutionContext, next: CallHandler<T>): Observable<IResponse<T>> {
    console.log('INTERCEPTOR Before...');

    const now = Date.now();
    return next.handle().pipe(
      tap((data) => {
        console.log(data);
        console.log(`INTERCEPTOR After... ${Date.now() - now}ms`);
      }),
      map((data) => {
        return {
          data,
        };
      }),
    );
  }
}

export const provideLoggingInterceptor = (): ClassProvider => ({
  provide: APP_INTERCEPTOR,
  useClass: LoggingInterceptor,
});
