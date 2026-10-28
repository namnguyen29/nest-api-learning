import { Module } from '@nestjs/common';
import { DogsController } from './dogs.controller.js';
import { environemnt, environmentProvider } from '@/configs/environment.js';

@Module({
  controllers: [DogsController],
  providers: [environmentProvider(environemnt)],
})
export class DogsModule {}
