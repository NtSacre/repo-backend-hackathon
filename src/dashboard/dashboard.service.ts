import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../reports/entities/report.entity';
import { Zone } from '../zones/entities/zone.entity';
import { ReportStatus } from '../common/enums/report-status.enum';

export interface DashboardNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: string;
  read: boolean;
  signalementId?: string;
}

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,
  ) {}

  async getStats() {
    try {
      const signalementsRecents = await this.reportRepository.count();
      const zonesARisque = await this.zoneRepository.count();
      const interventionsEnCours = await this.reportRepository.count({
        where: { status: ReportStatus.IN_PROGRESS },
      });
      const alertesCitoyennes = await this.reportRepository.count({
        where: { status: ReportStatus.PENDING },
      });

      return {
        signalementsRecents,
        zonesARisque,
        interventionsEnCours,
        alertesCitoyennes,
      };
    } catch {
      return {
        signalementsRecents: 0,
        zonesARisque: 0,
        interventionsEnCours: 0,
        alertesCitoyennes: 0,
      };
    }
  }

  private broadcasts: any[] = [];
  private notifications: DashboardNotification[] = [];

  async getBroadcasts() {
    return this.broadcasts;
  }

  async createBroadcast(broadcastData: any) {
    const newBc = {
      id: `bc-${Date.now()}`,
      timestamp: "À l'instant",
      status: 'envoye',
      ...broadcastData
    };
    this.broadcasts.unshift(newBc);

    // Auto-create a notification
    this.notifications.unshift({
      id: `notif-${Date.now()}`,
      title: `📢 Diffusion : ${newBc.title}`,
      message: `${newBc.recipientsCount || 0} personnes notifiées à ${newBc.zoneName || 'Commune'}.`,
      timestamp: "À l'instant",
      type: newBc.priority === 'haute' ? 'urgent' : 'info',
      read: false
    });

    return newBc;
  }

  async getNotifications() {
    return this.notifications;
  }

  async getOverview() {
    const stats = await this.getStats();
    return {
      stats,
      broadcasts: this.broadcasts,
      notifications: this.notifications,
      message: 'Données du tableau de bord municipal chargées avec succès',
      timestamp: new Date().toISOString(),
    };
  }
}
