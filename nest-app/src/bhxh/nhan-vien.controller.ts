import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { NhanVienService } from './bhxh.service';
import { NhanVienDto,NhanVienQueryDto } from './bhxh.dto';

@UseGuards(AuthGuard)
@Controller('nhan-vien')
export class NhanVienController {
  constructor(private readonly nhanVienService: NhanVienService) {}

  @Get()
  async list(
    @Query() query: NhanVienQueryDto,
  ) {
    return this.nhanVienService.list(query);
  }

  @Post()
  async store(@Body() data: NhanVienDto) {
    return await this.nhanVienService.store(data);
  }

  @Patch(':id')
  async update(
    @Body() data: NhanVienDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.nhanVienService.update(id, data);
  }

  @Delete(':id')
  async destroy(@Param('id', ParseIntPipe) id: number) {
    return await this.nhanVienService.destroy(id);
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.nhanVienService.getById(id);
  }
}
