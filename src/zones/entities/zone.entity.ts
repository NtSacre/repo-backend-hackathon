import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Report } from '../../reports/entities/report.entity';
import { RiskZone } from '../../risks/entities/risk-zone.entity';
import { WeatherData } from '../../weather/entities/weather-data.entity';
import { RecommendedPoint } from '../../recommended-points/entities/recommended-point.entity';

@Entity('zones')
export class Zone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 150 })
  commune: string;

  @Column({ length: 150, nullable: true })
  department: string;

  @Column({ length: 150, default: 'Dakar' })
  region: string;

  @Column('decimal', { precision: 10, scale: 7 })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 7 })
  longitude: number;

  @OneToMany(() => User, user => user.zone)
  users: User[];

  @OneToMany(() => Report, report => report.zone)
  reports: Report[];

  @OneToOne(() => RiskZone, riskZone => riskZone.zone)
  riskZone: RiskZone;

  @OneToMany(() => WeatherData, weatherData => weatherData.zone)
  weatherData: WeatherData[];

  @OneToMany(() => RecommendedPoint, recommendedPoint => recommendedPoint.zone)
  recommendedPoints: RecommendedPoint[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
