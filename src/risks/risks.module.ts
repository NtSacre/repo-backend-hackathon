import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RisksController } from './risks.controller';
import { RisksService } from './risks.service';
import { RiskZone } from './entities/risk-zone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RiskZone])],
  controllers: [RisksController],
  providers: [RisksService]
})
export class RisksModule {}
