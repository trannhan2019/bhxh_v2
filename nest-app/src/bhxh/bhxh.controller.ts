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
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { BhxhService } from './bhxh.service';
import { CreateBhxhDto, BhxhQueryDto, BhxhNangBacDto } from './bhxh.dto';
import { ReportService } from 'src/report/report.service';
import { LichSuBhxhDto } from 'src/lich-su-bhxh/lich-su-bhxh.dto';

@UseGuards(AuthGuard)
@Controller('bhxh')
export class BhxhController {
  constructor(
    private readonly bhxhService: BhxhService,
    private readonly reportService: ReportService,
  ) {}

  @Get()
  async list(@Query() query: BhxhQueryDto) {
    return this.bhxhService.list(query);
  }

  @Post()
  async store(@Body() data: CreateBhxhDto) {
    return await this.bhxhService.store(data);
  }

  @Patch('nang-bac/:id')
  async xacNhanNangBac(
    @Body() data: BhxhNangBacDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.bhxhService.xacNhanNangBac(id, data);
  }

  @Patch('chuyen-ngach/:id')
  async xacNhanChuyenNgach(
    @Body() data: BhxhNangBacDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.bhxhService.xacNhanChuyenNgach(id, data);
  }

  @Patch(':id')
  async update(
    @Body() data: CreateBhxhDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.bhxhService.update(id, data);
  }

  @Delete(':id')
  async destroy(@Param('id', ParseIntPipe) id: number) {
    return await this.bhxhService.destroy(id);
  }

  @Get('notification')
  async listNotification() {
    return this.bhxhService.listGanDenHanNangBac();
  }

  @Get('export/:id')
  async export(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    const data = await this.bhxhService.getById(id);
    if (!data) {
      throw new Error('Không có thông tin Thông tin');
    }
    const buffer = await this.reportService.exportBhxhToExcel(data);
    response.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    response.setHeader(
      'Content-Disposition',
      'attachment; filename="bhxh.xlsx"',
    );
    return response.send(Buffer.from(buffer));
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.bhxhService.getById(id);
  }
}
