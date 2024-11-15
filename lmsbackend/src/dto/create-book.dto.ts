import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  bookid: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  bookname: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  authorname: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  genre: string;

  @IsNumberString()
  @IsNotEmpty()
  copies: number;

  isActive: boolean;
}
