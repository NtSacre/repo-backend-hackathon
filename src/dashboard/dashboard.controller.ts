import { Controller, Get, Post, Body } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  getStats() {
    return this.dashboardService.getStats();
  }

  @Get('overview')
  getOverview() {
    return this.dashboardService.getOverview();
  }

  @Get('broadcasts')
  getBroadcasts() {
    return this.dashboardService.getBroadcasts();
  }

  @Post('broadcasts')
  createBroadcast(@Body() broadcastData: any) {
    return this.dashboardService.createBroadcast(broadcastData);
  }

  @Get('notifications')
  getNotifications() {
    return this.dashboardService.getNotifications();
  }
}
