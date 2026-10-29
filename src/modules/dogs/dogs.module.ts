import { Module } from '@nestjs/common';
import { DogsController } from './dogs.controller.js';
import { environemnt, provideEnvironment } from '@/configs/environment.js';

@Module({
  controllers: [DogsController],
  providers: [provideEnvironment(environemnt)],
})
export class DogsModule {}
