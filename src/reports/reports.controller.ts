import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateData: { status?: string; notes?: string; assignedTeam?: string },
  ) {
    return this.reportsService.updateStatus(id, updateData);
  }

  @Post()
  create(@Body() reportData: any) {
    return this.reportsService.create(reportData);
  }
}
