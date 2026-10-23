import { type ValueProvider } from '@nestjs/common';

export interface Environemnt {
  baseUrl: string;
  timeout: string;
}

export const environemnt: Environemnt = {
  baseUrl: 'https://env.com',
  timeout: '1000',
};

export const environmentProvider = (value: Environemnt): ValueProvider => ({
  provide: 'APP_ENV',
  useValue: value,
});
