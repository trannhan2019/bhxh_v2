import { Module } from "@nestjs/common";
import { LuongToiThieuVungController } from "./luong-toi-thieu-vung.controller";
import { LuongToiThieuVungService } from "./luong-toi-thieu-vung.service";

@Module({
    controllers: [LuongToiThieuVungController],
    providers: [LuongToiThieuVungService],
})

export class LuongToiThieuVungModule {}