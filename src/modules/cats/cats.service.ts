import { HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import cats from './cats.json' with { type: 'json' };
import { type CreateCatDto, type Cat } from './cats.dto.js';
import { type Environemnt } from '@/configs/environment.js';

@Injectable()
export class CatsService {
  constructor(
    @Inject('APP_ENV')
    private readonly env: Environemnt,
  ) {}

  public findAll(): Cat[] {
    console.log('read env::', this.env);
    return cats;
  }

  public findById(id: string): Cat {
    const cat = cats.find((cat) => cat.id === id);
    if (!cat) {
      throw new NotFoundException({
        message: 'Cat not found',
        error: 'Not Found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    return cat;
  }

  public createCat(request: CreateCatDto): Cat {
    const newCat: Cat = {
      id: `cat-${cats.length + 1}`,
      name: request.name,
      address: request.address,
    };
    cats.push(newCat);

    return newCat;
  }

  public deleteCat(id: string): void {
    const catIndex = cats.findIndex((cat) => cat.id === id);
    if (catIndex === -1) {
      throw new NotFoundException('Cat Not Found');
    }
    cats.splice(catIndex, 1);
  }

  public updateCat(id: string, request: CreateCatDto): Cat {
    const catIndex = cats.findIndex((cat) => cat.id === id);
    if (catIndex === -1) {
      throw new NotFoundException('Cat Not Found');
    }

    const updatedCat: Cat = {
      id,
      name: request.name,
      address: request.address,
    };

    cats[catIndex] = updatedCat;

    return updatedCat;
  }
}
