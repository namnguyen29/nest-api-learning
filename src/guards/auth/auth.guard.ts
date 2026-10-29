import { CanActivate, ClassProvider, ExecutionContext, Injectable } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Observable } from 'rxjs';
import { type Request } from 'express';
import { isRole, TRole } from '../roles/roles.decorator.js';

interface MockUser {
  id: number;
  name: string;
  roles: TRole[];
}

export interface AuthenticatedRequest extends Request {
  user?: MockUser;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    console.log('auth guard context');
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const roleFromHeader = request.headers['x-role'];
    const roles: TRole[] = isRole(roleFromHeader) ? [roleFromHeader] : ['user'];

    request.user = {
      id: 1,
      name: 'Nam',
      roles,
    };

    return true;
  }
}

export const provideAuthGuard = (): ClassProvider => ({
  useClass: AuthGuard,
  provide: APP_GUARD,
});
