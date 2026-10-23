import { Module } from '@nestjs/common';
import { CatsService } from './cats.service.js';
import { CatsController } from './cats.controller.js';

@Module({
  providers: [CatsService],
  controllers: [CatsController],
})
export class CatsModule {}
