import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { LuongToiThieuVungService } from "./luong-toi-thieu-vung.service";
import { LuongToiThieuVungDto } from "./luong-toi-thieu-vung.dto";


@UseGuards(AuthGuard)
@Controller('luong-toi-thieu-vung')
export class LuongToiThieuVungController {
    constructor(private readonly luongToiThieuVungService: LuongToiThieuVungService) {}

    @Get()
      async list() {
        return this.luongToiThieuVungService.list();
      }
    
      @Post()
      async store(@Body() data: LuongToiThieuVungDto) {
        return await this.luongToiThieuVungService.store(data);
      }
    
      @Patch(':id')
      async update(
        @Body() data: LuongToiThieuVungDto,
        @Param('id', ParseIntPipe) id: number,
      ) {
        return await this.luongToiThieuVungService.update(id, data);
      }
    
      @Delete(':id')
      async destroy(@Param('id', ParseIntPipe) id: number) {
        return await this.luongToiThieuVungService.destroy(id);
      }
}