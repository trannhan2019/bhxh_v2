import { Module } from "@nestjs/common";
import { BacLuongController } from "./bac-luong.controller";
import { BacLuongService } from "./bac-luong.service";

@Module({
    controllers: [BacLuongController],
    providers: [BacLuongService],
})

export class BacLuongModule {}