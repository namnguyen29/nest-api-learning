import { Reflector } from '@nestjs/core';

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MOD: 'mod',
} as const;

type TRoleKey = keyof typeof ROLES;

export type TRole = (typeof ROLES)[TRoleKey];

export function isRole(value: unknown): value is TRole {
  return Object.values(ROLES).some((role) => role === value);
}

export const Roles = Reflector.createDecorator<TRole[]>();
