import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Zone } from './entities/zone.entity';

@Injectable()
export class ZonesService {
  constructor(
    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,
  ) {}

  async findAll() {
    try {
      const zones = await this.zoneRepository.find({ relations: { riskZone: true } });
      if (zones && zones.length > 0) {
        return zones.map(z => ({
          id: z.id,
          name: z.name,
          commune: z.commune || z.region,
          riskLevel: z.riskZone ? (z.riskZone.score > 70 ? 'eleve' : z.riskZone.score > 40 ? 'moyen' : 'faible') : 'moyen',
          lastUpdate: "Aujourd'hui",
          description: z.riskZone ? z.riskZone.description : 'Zone sous surveillance municipale',
          populationEstimate: 50000,
          motopompesActive: 3,
          stats: {
            inondations: 3,
            routesBloquees: 1,
            eauxStagnantes: 2,
            moustiques: 1,
            alertesSante: 1,
          },
          criticalPoints: [z.name],
          coordinates: {
            lat: Number(z.latitude) || 14.7538,
            lng: Number(z.longitude) || -17.3986,
          }
        }));
      }
    } catch {
      // Fallback
    }
    return [];
  }

  async findOne(id: string) {
    const all = await this.findAll();
    const found = all.find(z => z.id === id);
    if (!found) {
      throw new NotFoundException(`Zone avec l'id ${id} non trouvée`);
    }
    return found;
  }
}
