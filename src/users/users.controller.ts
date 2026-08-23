import { Controller, Get, Put, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  getAgentProfile() {
    return this.usersService.getAgentProfile();
  }

  @Put('profile')
  updateAgentProfile(@Body() updatedData: any) {
    return this.usersService.updateAgentProfile(updatedData);
  }
}
