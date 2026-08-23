import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Report } from '../reports/entities/report.entity';
import { Zone } from '../zones/entities/zone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report, Zone])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
