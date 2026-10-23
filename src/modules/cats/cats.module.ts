import { Module } from '@nestjs/common';
import { CatsService } from './cats.service.js';
import { CatsController } from './cats.controller.js';
import { environemnt, environmentProvider } from '@/configs/environment.js';

@Module({
  providers: [CatsService, environmentProvider(environemnt)],
  controllers: [CatsController],
})
export class CatsModule {}
