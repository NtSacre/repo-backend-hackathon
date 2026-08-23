import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { GuideCategory } from '../../common/enums/guide-category.enum';
import { Language } from '../../common/enums/language.enum';
import { AudioGuide } from '../../audio-guides/entities/audio-guide.entity';

@Entity('safety_guides')
export class SafetyGuide {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ length: 50, nullable: true })
  icon: string;

  @Column({ type: 'enum', enum: GuideCategory })
  category: GuideCategory;

  @Column({ type: 'enum', enum: Language })
  language: Language;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(() => AudioGuide, audioGuide => audioGuide.guide)
  audioGuides: AudioGuide[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
