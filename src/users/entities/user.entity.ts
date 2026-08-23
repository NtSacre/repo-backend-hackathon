import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Role } from '../../common/enums/role.enum';
import { Zone } from '../../zones/entities/zone.entity';
import { Report } from '../../reports/entities/report.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'full_name', length: 150 })
  fullName: string;

  @Column({ length: 30, unique: true })
  phone: string;

  @Column({ length: 150, unique: true, nullable: true })
  email: string;

  @Column({ type: 'enum', enum: Role, default: Role.CITIZEN })
  role: Role;

  @ManyToOne(() => Zone, zone => zone.users, { nullable: true })
  @JoinColumn({ name: 'zone_id' })
  zone: Zone;

  @OneToMany(() => Report, report => report.user)
  reports: Report[];

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
