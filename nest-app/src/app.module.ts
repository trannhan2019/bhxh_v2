import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { PhongModule } from './phong/phong.module';
import { ChucVuModule } from './chuc-vu/chuc-vu.module';
import { NhanVienModule } from './nhan-vien/nhan-vien.module';
import { LuongToiThieuVungModule } from './luong-toi-thieu-vung/luong-toi-thieu-vung.module';
import { BacLuongModule } from './bac-luong/bac-luong.module';
import { HeSoModule } from './he-so/he-so.module';
import { BhxhModule } from './bhxh/bhxh.module';
import { LichSuBhxhModule } from './lich-su-bhxh/lich-su-bhxh.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    PrismaModule,
    PhongModule,
    ChucVuModule,
    NhanVienModule,
    LuongToiThieuVungModule,
    BacLuongModule,
    HeSoModule,
    BhxhModule,
    LichSuBhxhModule,
    UserModule,
    TaskModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
