import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export enum OtpChannel {
  WHATSAPP = 'WHATSAPP',
  EMAIL = 'EMAIL',
}

export class RegisterRequestDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsEnum(OtpChannel)
  @IsNotEmpty()
  channel: OtpChannel;
}
