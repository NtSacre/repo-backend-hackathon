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

  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }
}
