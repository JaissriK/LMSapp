import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateMemberDto {
  @IsString()
  @IsNotEmpty()
  memberid: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  membername: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  isActive: boolean;
}
