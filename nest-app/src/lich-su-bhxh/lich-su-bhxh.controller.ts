import {
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Controller } from '@nestjs/common';
import { LichSuBhxhService } from './lich-su-bhxh.service';
import { LichSuBhxhDto } from './lich-su-bhxh.dto';

@UseGuards(AuthGuard)
@Controller('lich-su-bhxh')
export class LichSuBhxhController {
  constructor(private readonly lichSuBhxhService: LichSuBhxhService) {}

  @Get('nhan-vien/:id')
  async getByNhanVienId(@Param('id', ParseIntPipe) id: number) {
    return this.lichSuBhxhService.getByNhanVienId(id);
  }

  @Post('nhan-vien')
  async store(@Body() data: LichSuBhxhDto) {
    return await this.lichSuBhxhService.store(data);
  }

  @Patch('nhan-vien/:id')
  async update(
    @Body() data: LichSuBhxhDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.lichSuBhxhService.update(id, data);
  }

  @Delete(':id')
  async destroy(@Param('id', ParseIntPipe) id: number) {
    return await this.lichSuBhxhService.destroy(id);
  }
}
