import { Controller, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, UseFilters } from '@nestjs/common';

import { type Environment } from '@/configs/environment.js';
import { HttpExceptionFilter } from '@/filters/http-exception.filter.js';

@Controller('dogs')
export class DogsController {
  constructor(
    @Inject('APP_ENV')
    private readonly env: Environment,
  ) {}

  @Get()
  @UseFilters(HttpExceptionFilter)
  public findAll() {
    console.log('This action returns all dogs at', this.env.baseUrl);
    throw new HttpException('Forbidden request xxx', HttpStatus.FORBIDDEN);
  }

  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: string) {
    return `Find a dog with id: ${id}`;
  }
}
