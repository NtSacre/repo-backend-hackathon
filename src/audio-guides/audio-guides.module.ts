import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudioGuidesController } from './audio-guides.controller';
import { AudioGuidesService } from './audio-guides.service';
import { AudioGuide } from './entities/audio-guide.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AudioGuide])],
  controllers: [AudioGuidesController],
  providers: [AudioGuidesService]
})
export class AudioGuidesModule {}
