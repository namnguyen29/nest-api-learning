import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: NextFunction): void {
    const startTime = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - startTime;
      let additionalMessage = '';

      if (duration > 100 && res.statusCode < HttpStatus.BAD_REQUEST) {
        additionalMessage = ' [SLOW REQUEST]';
      } else if (res.statusCode >= HttpStatus.BAD_REQUEST) {
        additionalMessage = ' [FAILED]';
      }

      console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} (+${duration}ms)${additionalMessage}`);
    });

    next();
  }
}
