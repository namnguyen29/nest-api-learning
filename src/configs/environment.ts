import { type ValueProvider } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

export interface Environment {
  baseUrl: string;
  timeout: string;
}

export const environemnt: Environment = {
  baseUrl: 'https://env.com',
  timeout: '1000',
};

export const APP_ENV = Symbol('APP_ENV');

export const provideEnvironment = (value: Environment): ValueProvider => ({
  provide: APP_ENV,
  useValue: value,
});
