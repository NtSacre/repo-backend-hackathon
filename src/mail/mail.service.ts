import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false, // true pour le port 465, false pour 587 (STARTTLS)
      auth: {
        user: this.configService.get<string>('MAIL_USERNAME'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });
  }

  async sendOtpEmail(to: string, code: string): Promise<void> {
    const fromAddress = this.configService.get<string>('MAIL_FROM_ADDRESS');
    const fromName = this.configService.get<string>('MAIL_FROM_NAME');

    try {
      await this.transporter.sendMail({
        from: `"${fromName}" <${fromAddress}>`,
        to,
        subject: 'Votre code de vérification',
        text: `Votre code de vérification est : ${code}. Il expire dans 10 minutes.`,
        html: `<p>Votre code de vérification est : <b>${code}</b></p><p>Il expire dans 10 minutes.</p>`,
      });
      this.logger.log(`OTP envoyé par email à ${to}`);
    } catch (error) {
      this.logger.error(`Échec de l'envoi de l'email à ${to}`, error);
      throw error;
    }
  }
}