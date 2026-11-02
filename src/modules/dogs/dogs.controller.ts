import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';

import { APP_ENV, type Environment } from '@/configs/environment.js';
import { HttpExceptionFilter } from '@/filters/http-exception.filter.js';
import { TimeoutInterceptor } from '@/interceptors/timeout/timeout.interceptor.js';
import { sleep } from './dogs.helper.js';

@Controller('dogs')
export class DogsController {
  constructor(
    @Inject(APP_ENV)
    private readonly env: Environment,
  ) {}

  @Get()
  @UseFilters(HttpExceptionFilter)
  public findAll() {
    console.log('This action returns all dogs at', this.env.baseUrl);
    throw new HttpException('Forbidden request xxx', HttpStatus.FORBIDDEN);
  }

  @Get(':id')
  @UseInterceptors(TimeoutInterceptor)
  public async findOne(@Param('id', ParseIntPipe) id: string) {
    await sleep();
    return `Find a dog with id: ${id}`;
  }
}
