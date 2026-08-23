import { Injectable, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { OtpCode } from './entities/otp-code.entity';
import { RegisterRequestDto } from './dto/register-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(OtpCode)
    private readonly otpRepository: Repository<OtpCode>,
  ) {}

  private generateOtp(): string {
    return Math.floor(1000 + Math.random() * 9000).toString(); // 4 digit OTP
  }

  async requestRegistrationOtp(registerDto: RegisterRequestDto) {
    const existingUser = await this.usersService.findByPhone(registerDto.phone);
    if (existingUser) {
      throw new BadRequestException('User with this phone number already exists');
    }
    
    const code = this.generateOtp();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // OTP valid for 10 minutes

    const otpRecord = this.otpRepository.create({
      identifier: registerDto.phone,
      code,
      channel: registerDto.channel,
      expiresAt,
    });
    
    await this.otpRepository.save(otpRecord);

    // Mock sending OTP
    this.logger.log(`[MOCK OTP SENDER] Sending OTP ${code} to ${registerDto.phone} via ${registerDto.channel}`);

    return { message: 'OTP sent successfully (Check server logs for MVP)' };
  }

  async requestLoginOtp(loginDto: LoginRequestDto) {
    const user = await this.usersService.findByPhone(loginDto.phone);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const code = this.generateOtp();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // OTP valid for 10 minutes

    const otpRecord = this.otpRepository.create({
      identifier: loginDto.phone,
      code,
      channel: loginDto.channel,
      expiresAt,
    });

    await this.otpRepository.save(otpRecord);

    // Mock sending OTP
    this.logger.log(`[MOCK OTP SENDER] Sending OTP ${code} to ${loginDto.phone} via ${loginDto.channel}`);

    return { message: 'OTP sent successfully (Check server logs for MVP)' };
  }

  async verifyOtp(verifyDto: VerifyOtpDto, userDataForRegistration?: RegisterRequestDto) {
    const { identifier, code } = verifyDto;
    
    const otpRecord = await this.otpRepository.findOne({
      where: { identifier },
      order: { createdAt: 'DESC' },
    });

    if (!otpRecord) {
      throw new UnauthorizedException('OTP not found or expired');
    }

    if (otpRecord.code !== code) {
      throw new UnauthorizedException('Invalid OTP');
    }

    if (new Date() > otpRecord.expiresAt) {
      throw new UnauthorizedException('OTP expired');
    }

    // OTP is valid. Now either log the user in or create them.
    let user = await this.usersService.findByPhone(identifier);

    if (!user) {
      // Registration flow
      if (!userDataForRegistration) {
        throw new BadRequestException('User details missing for registration');
      }
      user = await this.usersService.create({
        fullName: userDataForRegistration.fullName,
        phone: userDataForRegistration.phone,
        email: userDataForRegistration.email,
      });
    }

    // Delete used OTP
    await this.otpRepository.remove(otpRecord);

    // Generate JWT token
    const payload = { sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        fullName: user.fullName,
        role: user.role,
        zone: user.zone ? { id: user.zone.id, name: user.zone.name } : null,
      },
    };
  }
}
