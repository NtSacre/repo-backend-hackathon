import { IsString, IsNotEmpty } from 'class-validator';

export class VerifyOtpDto {
  @IsString()
  @IsNotEmpty()
  identifier: string; // phone or email

  @IsString()
  @IsNotEmpty()
  code: string;
}
