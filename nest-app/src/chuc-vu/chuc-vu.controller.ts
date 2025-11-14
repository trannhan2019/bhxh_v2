import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { ChucVuService } from "./chuc-vu.service";
import { ChucVuDto } from "./chuc-vu.dto";


@UseGuards(AuthGuard)
@Controller('chuc-vu')
export class ChucVuController {
    constructor(private readonly chucVuService: ChucVuService) {}

    @Get()
      async list() {
        return this.chucVuService.list();
      }
    
      @Post()
      async store(@Body() data: ChucVuDto) {
        return await this.chucVuService.store(data);
      }
    
      @Patch(':id')
      async update(
        @Body() data: ChucVuDto,
        @Param('id', ParseIntPipe) id: number,
      ) {
        return await this.chucVuService.update(id, data);
      }
    
      @Delete(':id')
      async destroy(@Param('id', ParseIntPipe) id: number) {
        return await this.chucVuService.destroy(id);
      }
}