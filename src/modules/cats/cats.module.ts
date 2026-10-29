import { Module } from '@nestjs/common';
import { CatsService } from './cats.service.js';
import { CatsController } from './cats.controller.js';
import { environemnt, provideEnvironment } from '@/configs/environment.js';

@Module({
  providers: [CatsService, provideEnvironment(environemnt)],
  controllers: [CatsController],
})
export class CatsModule {}
