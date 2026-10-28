import { type ValueProvider } from '@nestjs/common';

export interface Environment {
  baseUrl: string;
  timeout: string;
}

export const environemnt: Environment = {
  baseUrl: 'https://env.com',
  timeout: '1000',
};

export const environmentProvider = (value: Environment): ValueProvider => ({
  provide: 'APP_ENV',
  useValue: value,
});
