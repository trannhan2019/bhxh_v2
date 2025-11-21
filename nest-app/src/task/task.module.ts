import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { BhxhModule } from 'src/bhxh/bhxh.module';
import { EMailerModule } from 'src/mailer/mailer.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [BhxhModule, EMailerModule,ScheduleModule.forRoot()],
  providers: [TaskService],
})
export class TaskModule {}