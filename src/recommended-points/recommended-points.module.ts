import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendedPointsController } from './recommended-points.controller';
import { RecommendedPointsService } from './recommended-points.service';
import { RecommendedPoint } from './entities/recommended-point.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecommendedPoint])],
  controllers: [RecommendedPointsController],
  providers: [RecommendedPointsService]
})
export class RecommendedPointsModule {}
