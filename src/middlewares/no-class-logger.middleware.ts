import type { NextFunction, Request, Response } from 'express';

export function noClassLoger(req: Request, res: Response, next: NextFunction): void {
  console.log('Hello World, just a no class middleware logger');
  next();
}
