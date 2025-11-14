import { Module } from "@nestjs/common";
import { ChucVuController } from "./chuc-vu.controller";
import { ChucVuService } from "./chuc-vu.service";

@Module({
    controllers: [ChucVuController],
    providers: [ChucVuService],
})

export class ChucVuModule {}