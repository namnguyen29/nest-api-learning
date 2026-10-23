import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public getHello(): string {
    console.log('hello service');
    return 'Hello World!';
  }
}
