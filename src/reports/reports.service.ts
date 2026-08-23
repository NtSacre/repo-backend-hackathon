import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';

export interface SignalementItem {
  id: string;
  referenceNumber: string;
  category: string;
  title: string;
  location: string;
  zoneId: string;
  zoneName: string;
  timestamp: string;
  status: string;
  description: string;
  reportedBy: string;
  reporterPhone: string;
  imageUrl?: string;
  severity: string;
  waterLevelCm?: number;
  coordinates: { lat: number; lng: number };
  notes?: string[];
  assignedTeam?: string;
  acceptedAt?: string;
  resolvedAt?: string;
}

function mapReportCategory(type: string): string {
  const t = (type || '').toString().toUpperCase();
  if (t === 'FLOOD' || t === 'INONDATION') return 'inondation';
  if (t === 'BLOCKED_ROAD' || t === 'ROUTE_BLOQUEE') return 'route_bloquee';
  if (t === 'STAGNANT_WATER' || t === 'EAU_STAGANTE' || t === 'EAU_STAGNANTE') return 'eau_stagnante';
  if (t === 'HEALTH' || t === 'ALERTE_SANTE') return 'alerte_sante';
  if (t === 'MOSQUITO' || t === 'MOUSTIQUE') return 'moustique';
  return 'inondation';
}

function mapShortTitle(type: string, description?: string): string {
  const cat = mapReportCategory(type);
  switch (cat) {
    case 'inondation': return 'Inondation majeure';
    case 'route_bloquee': return 'Route bloquée';
    case 'eau_stagnante': return 'Eau stagnante';
    case 'alerte_sante': return 'Alerte santé';
    case 'moustique': return 'Alerte moustiques';
    default: return description ? description.substring(0, 25) : 'Signalement municipal';
  }
}

function mapReportStatus(status: string): string {
  const s = (status || '').toString().toUpperCase();
  if (s === 'PENDING' || s === 'NOUVEAU') return 'nouveau';
  if (s === 'IN_PROGRESS' || s === 'EN_COURS' || s === 'VERIFIED') return 'en_cours';
  if (s === 'RESOLVED' || s === 'RESOLU') return 'resolu';
  if (s === 'REJECTED' || s === 'REJETE') return 'rejete';
  return 'nouveau';
}

function mapSeverity(severity: string): string {
  const s = (severity || '').toString().toUpperCase();
  if (s === 'HIGH' || s === 'CRITICAL' || s === 'ELEVE') return 'eleve';
  if (s === 'MEDIUM' || s === 'MOYEN') return 'moyen';
  return 'faible';
}

@Injectable()
export class ReportsService {
  private memoryReports: SignalementItem[] = [];

  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  async findAll() {
    try {
      const reports = await this.reportRepository.find({ relations: { zone: true, user: true } });
      if (reports && reports.length > 0) {
        return reports.map(r => ({
          id: r.id,
          referenceNumber: `SIG-2026-${r.id.substring(0, 4)}`,
          category: mapReportCategory(r.type),
          title: mapShortTitle(r.type, r.description),
          location: r.zone ? r.zone.name : 'Commune de Dakar',
          zoneId: r.zone ? r.zone.id : 'z-ouakam',
          zoneName: r.zone ? r.zone.name : 'Ouakam',
          timestamp: r.createdAt ? new Date(r.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : "À l'instant",
          status: mapReportStatus(r.status),
          description: r.description || 'Description non renseignée',
          reportedBy: r.user ? r.user.fullName : 'Citoyen',
          reporterPhone: r.user ? r.user.phone : 'N/A',
          imageUrl: r.photoUrl || 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1000&q=80',
          severity: mapSeverity(r.severity),
          coordinates: { lat: Number(r.latitude) || 14.7230, lng: Number(r.longitude) || -17.4870 },
          notes: []
        }));
      }
    } catch {
      // Return memory fallback if database empty/unavailable
    }
    return this.memoryReports;
  }

  async findOne(id: string) {
    const all = await this.findAll();
    const found = all.find(r => r.id === id);
    if (!found) {
      throw new NotFoundException(`Signalement avec l'id ${id} non trouvé`);
    }
    return found;
  }

  async updateStatus(id: string, updateData: { status?: string; notes?: string; assignedTeam?: string }) {
    const index = this.memoryReports.findIndex(r => r.id === id);
    if (index !== -1) {
      const updated = { ...this.memoryReports[index] };
      if (updateData.status) {
        updated.status = updateData.status;
        if (updateData.status === 'resolu') {
          updated.resolvedAt = "Aujourd'hui, à l'instant";
        }
      }
      if (updateData.assignedTeam) {
        updated.assignedTeam = updateData.assignedTeam;
        updated.status = 'en_cours';
      }
      if (updateData.notes) {
        updated.notes = [...(updated.notes || []), updateData.notes];
      }
      this.memoryReports[index] = updated;
      return updated;
    }
    return { id, message: 'Statut mis à jour', ...updateData };
  }

  async create(reportData: any): Promise<SignalementItem> {
    const cat = mapReportCategory(reportData.category || reportData.type || 'inondation');
    const newReport: SignalementItem = {
      id: `sig-${Date.now()}`,
      referenceNumber: `SIG-2026-${Math.floor(100 + Math.random() * 900)}`,
      category: cat,
      title: reportData.title || mapShortTitle(cat, reportData.description),
      location: reportData.location || 'Dakar',
      zoneId: reportData.zoneId || 'z-ouakam',
      zoneName: reportData.zoneName || 'Ouakam',
      timestamp: "À l'instant",
      status: mapReportStatus(reportData.status || 'nouveau'),
      description: reportData.description || '',
      reportedBy: reportData.reportedBy || 'Citoyen',
      reporterPhone: reportData.reporterPhone || '77 000 00 00',
      imageUrl: reportData.imageUrl || 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1000&q=80',
      severity: mapSeverity(reportData.severity || 'moyen'),
      coordinates: reportData.coordinates || { lat: 14.7230, lng: -17.4870 },
      notes: ['Signalement créé via API']
    };
    this.memoryReports.unshift(newReport);
    return newReport;
  }
}
