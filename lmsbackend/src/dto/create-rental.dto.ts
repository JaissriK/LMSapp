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
  memberid: string;

  @IsString()
  @IsNotEmpty()
  bookid: string;

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
