import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { WeatherData } from './entities/weather-data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherData])],
  controllers: [WeatherController],
  providers: [WeatherService]
})
export class WeatherModule {}
