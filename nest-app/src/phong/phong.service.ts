import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PhongDto } from './phong.dto';

@Injectable()
export class PhongService {
  constructor(private prisma: PrismaService) {}

  async list() {
    return this.prisma.phong.findMany({
      orderBy: {
        soThuTu: 'asc',
      },
    });
  }

  async store(data: PhongDto) {
    return this.prisma.phong.create({ data });
  }

  async update(id: number, data: PhongDto) {
    return this.prisma.phong.update({
      where: { id },
      data,
    });
  }

  async destroy(id: number) {
    return await this.prisma.$transaction([
      this.prisma.nhanVien.deleteMany({ where: { phongId: id } }),
      this.prisma.phong.delete({ where: { id } }),
    ]);
  }
}
