import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { HeSoService } from "./he-so.service";
import { HeSoDto } from "./he-so.dto";


@UseGuards(AuthGuard)
@Controller('he-so')
export class HeSoController {
    constructor(private readonly heSoService: HeSoService) {}

    @Get()
      async list() {
        return this.heSoService.list();
      }

      @Get('loai')
      async listByLoai() {
        return this.heSoService.listByLoai();
      }
    
      @Post()
      async store(@Body() data: HeSoDto) {
        return await this.heSoService.store(data);
      }
    
      @Patch(':id')
      async update(
        @Body() data: HeSoDto,
        @Param('id', ParseIntPipe) id: number,
      ) {
        return await this.heSoService.update(id, data);
      }
    
      @Delete(':id')
      async destroy(@Param('id', ParseIntPipe) id: number) {
        return await this.heSoService.destroy(id);
      }
}