import {
  IsBooleanString,
  IsDateString,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateRentalDto {
  @IsString()
  @IsNotEmpty()
  rentalid: string;

  @IsString()
  @IsNotEmpty()
  membername: string;

  @IsString()
  @IsNotEmpty()
  bookname: string;

  @IsDateString()
  @IsNotEmpty()
  rentstart: Date;

  @IsDateString()
  @IsNotEmpty()
  rentend: Date;

  @IsBooleanString()
  rentreturn: boolean;

  isActive: boolean;
}
