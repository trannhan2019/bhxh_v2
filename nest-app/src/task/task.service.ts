import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BhxhService } from 'src/bhxh/bhxh.service';
import { EmailService } from 'src/mailer/mailer.service';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    private readonly bhxhService: BhxhService,
    private readonly emailService: EmailService,
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleCron() {
    this.logger.log('Running scheduled job...');
    const data = await this.bhxhService.listGanDenHanNangBac();
    if (data.length > 0) {
      let htmlContent = `
    <!doctype html>
    <html lang="vn">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Thông báo nâng bậc BHXH</title>
      </head>
      <body>
        <h3>Danh sách nhân sự sắp đến kỳ nâng bậc</h3>
  `;

      for (const thongTin of data) {
        htmlContent += `
        <div style="margin-bottom: 15px; padding: 10px; border-bottom: 1px solid #ccc;">
          <p>
            Nhân viên <strong>${thongTin.nhanVien.ten}</strong> thuộc ${thongTin.nhanVien.phong.ten} gần đến ngày nâng bậc lương tham gia BHXH. Vui lòng truy cập trang web để cập nhật thông tin.
          </p>
        </div>
      `;
      }

      htmlContent += `
        <p>Trân trọng,</p>
        <p>Hệ thống quản lý</p>
      </body>
    </html>
  `;
      await this.emailService.sendEmailBhxh(htmlContent);
      this.logger.log('Send email successfully');
    } else {
      this.logger.log('No data found');
      return false;
    }
  }
}
