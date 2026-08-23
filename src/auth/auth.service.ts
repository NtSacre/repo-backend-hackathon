import { Injectable, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { OtpCode } from './entities/otp-code.entity';
import { RegisterRequestDto, OtpChannel } from './dto/register-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    @InjectRepository(OtpCode)
    private readonly otpRepository: Repository<OtpCode>,
  ) {}

  private generateOtp(): string {
    return Math.floor(1000 + Math.random() * 9000).toString(); // 4 digit OTP
  }

  private async dispatchOtp(channel: OtpChannel, code: string, phone: string, email?: string) {
    if (channel === OtpChannel.EMAIL) {
      if (!email) {
        throw new BadRequestException('Un email est requis pour ce canal');
      }
      await this.mailService.sendOtpEmail(email, code);
    } else {
      // WhatsApp pas encore branché : mock en attendant le service
      this.logger.log(`[MOCK OTP SENDER] Sending OTP ${code} to ${phone} via ${channel}`);
    }
  }

  private async createAndSendOtp(userId: string, channel: OtpChannel, phone: string, email?: string) {
    const code = this.generateOtp();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // OTP valide 10 minutes

    const otpRecord = this.otpRepository.create({
      identifier: userId, // on stocke l'id user, comme en Laravel (user_id)
      code,
      channel,
      expiresAt,
    });
    await this.otpRepository.save(otpRecord);

    await this.dispatchOtp(channel, code, phone, email);
  }

  /**
   * Register - Étape 1 : créer l'utilisateur immédiatement, puis envoyer l'OTP
   * (équivalent du AuthService::register() en Laravel)
   */
  async requestRegistrationOtp(registerDto: RegisterRequestDto) {
    const existingUser = await this.usersService.findByPhone(registerDto.phone);
    if (existingUser) {
      throw new BadRequestException('User with this phone number already exists');
    }

    const user = await this.usersService.create({
      fullName: registerDto.fullName,
      phone: registerDto.phone,
      email: registerDto.email,
    });

    await this.createAndSendOtp(user.id.toString(), registerDto.channel, registerDto.phone, registerDto.email);

    return {
      message: 'OTP sent successfully',
      userId: user.id,
    };
  }

  /**
   * Login - Étape 1 : retrouver l'utilisateur, envoyer l'OTP
   * (équivalent du AuthService::login() en Laravel)
   */
  async requestLoginOtp(loginDto: LoginRequestDto) {
    const user = await this.usersService.findByPhone(loginDto.phone);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    await this.createAndSendOtp(user.id.toString(), loginDto.channel, loginDto.phone, user.email);

    return {
      message: 'OTP sent successfully',
      userId: user.id,
    };
  }

  /**
   * Étape 2 : vérifier l'OTP avec juste userId + code
   * (équivalent du AuthService::verifyOtp() en Laravel)
   */
  async verifyOtp(verifyDto: VerifyOtpDto) {
    const { userId, code } = verifyDto;

    const otpRecord = await this.otpRepository.findOne({
      where: { identifier: userId },
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

    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Supprime l'OTP utilisé
    await this.otpRepository.remove(otpRecord);

    // Génère le JWT
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