import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EmailService } from './mailer.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_TRAP_HOST,
        port: process.env.MAIL_TRAP_PORT as unknown as number,
        auth: {
          user: process.env.MAIL_TRAP_USER,
          pass: process.env.MAIL_TRAP_PASS,
        },
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EMailerModule {}