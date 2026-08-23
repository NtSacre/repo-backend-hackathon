import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuidesController } from './guides.controller';
import { GuidesService } from './guides.service';
import { SafetyGuide } from './entities/safety-guide.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SafetyGuide])],
  controllers: [GuidesController],
  providers: [GuidesService]
})
export class GuidesModule {}
