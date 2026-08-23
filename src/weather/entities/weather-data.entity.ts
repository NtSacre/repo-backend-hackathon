import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Zone } from '../../zones/entities/zone.entity';

@Entity('weather_data')
export class WeatherData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Zone, zone => zone.weatherData)
  @JoinColumn({ name: 'zone_id' })
  zone: Zone;

  @Column('decimal', { precision: 5, scale: 2 })
  temperature: number;

  @Column({ name: 'rain_probability', type: 'int' })
  rainProbability: number;

  @Column({ name: 'rainfall_mm', type: 'int' })
  rainfallMm: number;

  @Column({ length: 50 })
  condition: string;

  @Column({ type: 'date', name: 'forecast_date' })
  forecastDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
