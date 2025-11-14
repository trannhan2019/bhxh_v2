import { Module } from "@nestjs/common";
import { HeSoController } from "./he-so.controller";
import { HeSoService } from "./he-so.service";

@Module({
    controllers: [HeSoController],
    providers: [HeSoService],
})

export class HeSoModule {}