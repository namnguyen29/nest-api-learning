import type { NextFunction, Request, Response } from 'express';

export function noClassLoger(req: Request, res: Response, next: NextFunction) {
  console.log('Hello World, just a no class logger');
  next();
}
