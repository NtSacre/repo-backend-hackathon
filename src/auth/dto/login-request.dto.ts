import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { OtpChannel } from './register-request.dto';

export class LoginRequestDto {
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEnum(OtpChannel)
  @IsNotEmpty()
  channel: OtpChannel;
}
