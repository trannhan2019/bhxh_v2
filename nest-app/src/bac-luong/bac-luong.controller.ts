import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { BacLuongDto, NgachLuongDto, UpdateNgachLuongDto } from "./bac-luong.dto";
import { BacLuongService } from "./bac-luong.service";


@UseGuards(AuthGuard)
@Controller('bac-luong')
export class BacLuongController {
    constructor(private readonly bacLuongService: BacLuongService) {}

    @Get()
      async list() {
        return this.bacLuongService.list();
      }

      @Get('ngach-luong')
      async listNgachLuong(){
        return await this.bacLuongService.listNgachLuong()
      }

      @Get('ngach-luong/:ngachLuongId')
      async listBacLuongByNgachLuong(@Param('ngachLuongId', ParseIntPipe) ngachLuongId: number){
        return await this.bacLuongService.listBacLuongByNgachLuong(ngachLuongId)
      }
    
      @Post()
      async store(@Body() data: NgachLuongDto) {
        return await this.bacLuongService.store(data);
      }
    
      @Patch(':id')
      async update(
        @Body() data: UpdateNgachLuongDto,
        @Param('id', ParseIntPipe) id: number,
      ) {
        return await this.bacLuongService.update(id, data);
      }
    
      @Delete(':id')
      async destroy(@Param('id', ParseIntPipe) id: number) {
        return await this.bacLuongService.destroy(id);
      }
}