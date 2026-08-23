import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Zone } from '../../zones/entities/zone.entity';
import { Severity } from '../../common/enums/severity.enum';

@Entity('risk_zones')
export class RiskZone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Zone, zone => zone.riskZone)
  @JoinColumn({ name: 'zone_id' })
  zone: Zone;

  @Column({ name: 'flood_level', type: 'enum', enum: Severity })
  floodLevel: Severity;

  @Column({ name: 'health_level', type: 'enum', enum: Severity })
  healthLevel: Severity;

  @Column({ type: 'int' })
  score: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
