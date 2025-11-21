import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmailBhxh(html: string) {
    return this.mailerService.sendMail({
      from: 'Lương BHXH <phongtochuchanhchinh.sba@gmail.com>',
      to: ['anyone@example.com'],
      subject: 'Thông báo nâng lương BHXH gần đến hạn',
      html,
    });
  }
}