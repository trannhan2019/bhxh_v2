import { Module } from "@nestjs/common";
import { LichSuBhxhController } from "./lich-su-bhxh.controller";
import { LichSuBhxhService } from "./lich-su-bhxh.service";

@Module({
    controllers: [LichSuBhxhController],
    providers: [LichSuBhxhService],
})
export class LichSuBhxhModule{}