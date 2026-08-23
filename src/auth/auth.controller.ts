import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerRequest(@Body() registerDto: RegisterRequestDto) {
    return this.authService.requestRegistrationOtp(registerDto);
  }

  @Post('login')
  async loginRequest(@Body() loginDto: LoginRequestDto) {
    return this.authService.requestLoginOtp(loginDto);
  }

  @Post('verify')
  async verifyOtp(@Body() verifyDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout() {
    // JWT stateless : rien à invalider côté serveur.
    // Le frontend doit supprimer le token stocké (localStorage / mémoire / cookie).
    return { message: 'Déconnexion réussie' };
  }
}