import { Module } from "@nestjs/common";
import { NhanVienController } from "./nhan-vien.controller";
import { NhanVienService } from "./bhxh.service";

@Module({
    controllers: [NhanVienController],
    providers: [NhanVienService],
})

export class NhanVienModule {}