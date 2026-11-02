import { CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException } from '@nestjs/common';
import { Observable, TimeoutError, catchError, timeout, throwError } from 'rxjs';

/**
 * ỨNG DỤNG THỰC TẾ CỦA TIMEOUT INTERCEPTOR:
 *
 * 1. Ngăn chặn treo connection (Connection Starvation):
 *    - Khi gọi 3rd-party API (cổng thanh toán, SMS, dịch vụ bên ngoài) bị chậm hoặc down.
 *    - Khi câu query Database gặp deadlock hoặc table lock mà không tự ngắt.
 *    - Khi logic code bị dính Promise không bao giờ resolve/reject.
 *
 * 2. Bảo vệ tài nguyên server Node.js:
 *    - Node.js là single-threaded event loop. Nếu để hàng trăm request treo chờ,
 *      socket pool và RAM sẽ bị cạn kiệt, dẫn đến server sập hoàn toàn.
 *
 * 3. Trả về mã lỗi HTTP chuẩn (408 Request Timeout):
 *    - Giúp Client/Frontend biết chính xác là do xử lý quá thời gian quy định
 *      thay vì bị treo vô tận hoặc nhận mã 504 không rõ nguồn gốc từ Reverse Proxy (Nginx/Cloudflare).
 *
 * CÁCH TEST THỰC TẾ:
 * Trong bất kỳ route handler nào (vd: DogsController), thử tạo 1 hàm sleep:
 *   await new Promise(resolve => setTimeout(resolve, 6000));
 * Khi gọi API đó, interceptor sẽ ngắt sau 5000ms và ném ra 408 Request Timeout.
 */
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  private readonly timeoutDuration = 5000;

  public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      timeout(this.timeoutDuration),

      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(
            () =>
              new RequestTimeoutException(
                `Request đã bị hủy do xử lý vượt quá thời gian cho phép (${this.timeoutDuration}ms)`,
              ),
          );
        }

        return throwError(() => err);
      }),
    );
  }
}
