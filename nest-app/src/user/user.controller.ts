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
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from './user.service';
import { UserDto, UserUpdateDto } from './user.dto';


@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  
  @Get()
  async list() {
    return this.userService.list();
  }

  @Post()
  async store(@Body() data: UserDto) {
    return await this.userService.store(data);
  }

  @Patch(':id')
  async update(
    @Body() data: UserUpdateDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.userService.update(id, data);
  }

  @Delete(':id')
  async destroy(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.destroy(id);
  }
}
