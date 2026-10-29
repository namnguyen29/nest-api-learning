import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CatsService } from './cats.service.js';
import { CreateCatDto, type Cat } from './cats.dto.js';
import { RolesGuard } from '@/guards/roles/roles.guard.js';
import { Roles } from '@/guards/roles/roles.decorator.js';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(['admin'])
  public findAll(): Cat[] {
    return this.catsService.findAll();
  }

  @Get('query')
  public findByQuery(@Query('size', ParseIntPipe) size: number, @Query('age', ParseIntPipe) age: number) {
    console.log({ size, age });
    return this.catsService.findAll();
  }

  @Get(':id')
  public findById(@Param('id') id: string): Cat {
    console.log(id);
    return this.catsService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public createCat(@Body() cat: CreateCatDto): Cat {
    return this.catsService.createCat(cat);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public deleteCat(@Param('id') id: string): void {
    this.catsService.deleteCat(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  public updateCat(@Param('id') id: string, @Body() cat: CreateCatDto): Cat {
    return this.catsService.updateCat(id, cat);
  }
}
