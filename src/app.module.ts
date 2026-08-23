import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ZonesModule } from './zones/zones.module';
import { ReportsModule } from './reports/reports.module';
import { RisksModule } from './risks/risks.module';
import { WeatherModule } from './weather/weather.module';
import { GuidesModule } from './guides/guides.module';
import { AudioGuidesModule } from './audio-guides/audio-guides.module';
import { RecommendedPointsModule } from './recommended-points/recommended-points.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    ZonesModule,
    ReportsModule,
    RisksModule,
    WeatherModule,
    GuidesModule,
    AudioGuidesModule,
    RecommendedPointsModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
