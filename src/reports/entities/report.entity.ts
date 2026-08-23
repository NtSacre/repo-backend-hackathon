import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Zone } from '../../zones/entities/zone.entity';
import { ReportType } from '../../common/enums/report-type.enum';
import { Severity } from '../../common/enums/severity.enum';
import { ReportStatus } from '../../common/enums/report-status.enum';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.reports)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Zone, zone => zone.reports)
  @JoinColumn({ name: 'zone_id' })
  zone: Zone;

  @Column({ type: 'enum', enum: ReportType })
  type: ReportType;

  @Column({ type: 'enum', enum: Severity })
  severity: Severity;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 7 })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 7 })
  longitude: number;

  @Column({ name: 'photo_url', nullable: true })
  photoUrl: string;

  @Column({ type: 'enum', enum: ReportStatus, default: ReportStatus.PENDING })
  status: ReportStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
