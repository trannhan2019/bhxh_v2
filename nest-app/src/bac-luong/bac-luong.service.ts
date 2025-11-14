import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  BacLuongDto,
  NgachLuongDto,
  UpdateNgachLuongDto,
} from './bac-luong.dto';

@Injectable()
export class BacLuongService {
  constructor(private prisma: PrismaService) {}

  async list() {
    return this.prisma.ngachLuong.findMany({
      orderBy: {
        soThuTu: 'asc',
      },
      include: {
        bacLuongs: {
          orderBy: {
            bac: 'asc',
          },
        },
      },
    });
  }

  async store(data: NgachLuongDto) {
    return this.prisma.ngachLuong.create({
      data: {
        tenNgach: data.tenNgach,
        maNgach: data.maNgach,
        soThuTu: data.soThuTu ?? 0,
        bacLuongs: {
          create: data.bacLuongs,
        },
      },
      include: {
        bacLuongs: true,
      },
    });
  }

  async update(id: number, dto: UpdateNgachLuongDto) {
    const existing = await this.prisma.ngachLuong.findUnique({
      where: { id },
      include: { bacLuongs: true },
    });

    if (!existing) {
      throw new NotFoundException('Ngạch lương không tồn tại');
    }

    // Bắt đầu transaction để đảm bảo tất cả thay đổi atomic
    return this.prisma.$transaction(async (tx) => {
      // 1️⃣ Cập nhật thông tin ngạch
      const updatedNgach = await tx.ngachLuong.update({
        where: { id },
        data: {
          maNgach: dto.maNgach,
          tenNgach: dto.tenNgach,
          soThuTu: dto.soThuTu ?? 0,
        },
      });

      // 2️⃣ Danh sách ID bậc lương hiện tại
      const currentIds = existing.bacLuongs.map((b) => b.id);
      const incomingIds = dto.bacLuongs.filter((b) => b.id).map((b) => b.id!);

      // 3️⃣ Xóa các bậc không còn trong danh sách gửi lên
      const toDelete = currentIds.filter((id) => !incomingIds.includes(id));
      if (toDelete.length > 0) {
        await tx.bacLuong.deleteMany({ where: { id: { in: toDelete } } });
      }

      // 4️⃣ Cập nhật hoặc thêm mới bậc lương
      for (const bac of dto.bacLuongs) {
        if (bac.id) {
          // Update bậc cũ
          await tx.bacLuong.update({
            where: { id: bac.id },
            data: {
              bac: bac.bac,
              heSo: bac.heSo,
              thoiGianNangBac: bac.thoiGianNangBac,
            },
          });
        } else {
          // Thêm mới
          await tx.bacLuong.create({
            data: {
              bac: bac.bac,
              heSo: bac.heSo,
              thoiGianNangBac: bac.thoiGianNangBac,
              ngachLuongId: id,
            },
          });
        }
      }

      // 5️⃣ Trả kết quả
      return tx.ngachLuong.findUnique({
        where: { id },
        include: { bacLuongs: true },
      });
    });
  }

  async destroy(id: number) {
    const existing = await this.prisma.ngachLuong.findUnique({
      where: { id },
      include: { bacLuongs: true },
    });

    if (!existing) {
      throw new NotFoundException('Ngạch lương không tồn tại');
    }

    // Xoá trong transaction để đảm bảo đồng bộ
    return this.prisma.$transaction(async (tx) => {
      await tx.bacLuong.deleteMany({
        where: { ngachLuongId: id },
      });

      await tx.ngachLuong.delete({
        where: { id },
      });

      return {
        message: 'Xoá ngạch lương và các bậc lương liên quan thành công!',
      };
    });
  }
}
