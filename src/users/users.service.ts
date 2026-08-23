import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findByPhone(phone: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { phone }, relations: { zone: true } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email }, relations: { zone: true } });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id }, relations: { zone: true } });
  }

  private agentProfile = {
    name: 'Agent Municipal',
    role: 'Service Municipal',
    service: 'Protection Civile',
    commune: 'Commune de Dakar',
    matricule: 'AGT-001',
    phone: '',
    email: '',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    shift: 'Garde municipale',
    badgeNumber: 'BDG-001'
  };

  async getAgentProfile() {
    return this.agentProfile;
  }

  async updateAgentProfile(updatedData: Partial<typeof this.agentProfile>) {
    this.agentProfile = { ...this.agentProfile, ...updatedData };
    return this.agentProfile;
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }
}
