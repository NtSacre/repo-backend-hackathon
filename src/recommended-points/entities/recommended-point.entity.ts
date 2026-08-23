import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Zone } from '../../zones/entities/zone.entity';
import { RecommendedPointType } from '../../common/enums/recommended-point-type.enum';

@Entity('recommended_points')
export class RecommendedPoint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Zone, zone => zone.recommendedPoints)
  @JoinColumn({ name: 'zone_id' })
  zone: Zone;

  @Column({ length: 150 })
  name: string;

  @Column({ type: 'enum', enum: RecommendedPointType })
  type: RecommendedPointType;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 7 })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 7 })
  longitude: number;

  @Column({ length: 30, nullable: true })
  phone: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
