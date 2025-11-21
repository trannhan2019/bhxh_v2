import { Module } from "@nestjs/common";
import { BhxhController } from "./bhxh.controller";
import { BhxhService } from "./bhxh.service";
import { ReportModule } from "../report/report.module";


@Module({
    imports: [ReportModule],
    controllers: [BhxhController],
    providers: [BhxhService],
    exports: [BhxhService],
})

export class BhxhModule {}