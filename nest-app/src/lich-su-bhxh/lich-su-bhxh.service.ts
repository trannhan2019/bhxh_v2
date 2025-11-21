import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LichSuBhxhDto } from './lich-su-bhxh.dto';

@Injectable()
export class LichSuBhxhService {
  constructor(private prisma: PrismaService) {}

  async getByNhanVienId(nhanVienId: number) {
    const lichSu = await this.prisma.lichSuBhxh.findMany({
      where: {
        nhanVienId,
      },
      include: {
        ngachLuong: true,
        bacLuong: true,
        heSoChucVu: true,
        heSoTrachNhiem: true,
        luongToiThieuVung: true,
      },
      orderBy: {
        ngayApDung: 'asc',
      },
    });

    return lichSu.map((item) => {
      const heSoBac = item.bacLuong?.heSo ?? 0;
      const heSoChucVu = item.heSoChucVu?.heSo ?? 0;
      const heSoTrachNhiem = item.heSoTrachNhiem?.heSo ?? 0;

      const tongHeSo = heSoBac + heSoChucVu + heSoTrachNhiem;

      const luong = tongHeSo * (item.luongToiThieuVung?.mucLuong ?? 0);

      return {
        ...item,
        tongHeSo,
        luong,
      };
    });
  }

  async store(data: LichSuBhxhDto) {
    return this.prisma.lichSuBhxh.create({ data });
  }

  async update(id: number, data: LichSuBhxhDto) {
    return this.prisma.lichSuBhxh.update({
      where: { id },
      data,
    });
  }

  async destroy(id: number) {
    return this.prisma.lichSuBhxh.delete({ where: { id } });
  }
}
