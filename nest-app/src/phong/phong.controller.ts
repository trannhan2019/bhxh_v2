import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PhongService } from './phong.service';
import { PhongDto } from './phong.dto';
import { AuthGuard } from 'src/auth/auth.guard';


@UseGuards(AuthGuard)
@Controller('phong')
export class PhongController {
  constructor(private readonly phongService: PhongService) {}

  
  @Get()
  async list() {
    return this.phongService.list();
  }

  @Post()
  async store(@Body() data: PhongDto) {
    return await this.phongService.store(data);
  }

  @Patch(':id')
  async update(
    @Body() data: PhongDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.phongService.update(id, data);
  }

  @Delete(':id')
  async destroy(@Param('id', ParseIntPipe) id: number) {
    return await this.phongService.destroy(id);
  }
}
