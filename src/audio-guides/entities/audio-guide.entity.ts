import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SafetyGuide } from '../../guides/entities/safety-guide.entity';
import { Language } from '../../common/enums/language.enum';

@Entity('audio_guides')
export class AudioGuide {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => SafetyGuide, safetyGuide => safetyGuide.audioGuides)
  @JoinColumn({ name: 'guide_id' })
  guide: SafetyGuide;

  @Column({ type: 'enum', enum: Language })
  language: Language;

  @Column({ name: 'audio_url' })
  audioUrl: string;

  @Column({ type: 'int', nullable: true })
  duration: number; // Duration in seconds

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
