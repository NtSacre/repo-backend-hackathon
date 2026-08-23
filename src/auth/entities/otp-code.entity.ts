import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('otp_codes')
export class OtpCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  identifier: string; // phone number or email

  @Column()
  code: string;

  @Column()
  channel: string; // WHATSAPP or EMAIL

  @Column()
  expiresAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
