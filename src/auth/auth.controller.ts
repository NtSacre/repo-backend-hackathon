import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { AuthGuard } from '@nestjs/passport';

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
  async verifyOtp(@Body() body: { verifyDto: VerifyOtpDto, userData?: RegisterRequestDto }) {
    // If it's a registration, the frontend should send userData along with verifyDto.
    // In a real app, userData could be cached on the server temporarily instead of sent back from the frontend.
    return this.authService.verifyOtp(body.verifyDto, body.userData);
  }

  // To secure endpoints, we need a JwtAuthGuard, which I will implement.
  // For now, this is a placeholder for GET /auth/me
  // @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
