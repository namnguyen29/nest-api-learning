import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export interface Cat {
  id: string;
  name: string;
  address: string;
}

export class CreateCatDto {
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @MinLength(2, { message: 'Address must be at least 2 characters' })
  @IsString()
  @IsNotEmpty()
  public readonly address: string;
}
