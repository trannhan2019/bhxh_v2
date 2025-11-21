import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BhxhNangBacDto, CreateBhxhDto } from './bhxh.dto';
import { Prisma } from '@prisma/client';
import { addYears, differenceInDays } from 'date-fns';
import { LichSuBhxhDto } from 'src/lich-su-bhxh/lich-su-bhxh.dto';

@Injectable()
export class BhxhService {
  constructor(private prisma: PrismaService) {}

  private SO_NGAY_KIEM_TRA = 15;

  async list(params: { page?: number; pageSize?: number; search?: string }) {
    const { page = 1, pageSize = 15, search = '' } = params;

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // WHERE condition
    const where: Prisma.BhxhWhereInput = {
      nhanVien: {
        trangThai: true,
        ten: search ? { contains: search } : undefined,
      },
    };

    // QUERY DB
    const [items, total] = await Promise.all([
      this.prisma.bhxh.findMany({
        skip,
        take,
        where,
        include: {
          nhanVien: true,
          ngachLuong: {
            include: {
              bacLuongs: true, // cần để tính bậc tiếp theo
            },
          },
          bacLuong: true,
          heSoChucVu: true,
          heSoTrachNhiem: true,
        },
        orderBy: { soThuTu: 'asc' },
      }),

      this.prisma.bhxh.count({ where }),
    ]);

    const luongToiThieuApDung = await this.prisma.luongToiThieuVung.findFirst({
      where: { apDung: true },
      orderBy: { thoiGianApDung: 'desc' },
    });

    // COMPUTED LOGIC
    const itemsWithComputed = items.map((item) => {
      const currentBac = item.bacLuong;
      const ngach = item.ngachLuong;

      // Danh sách tất cả bậc của ngạch (sort tăng dần)
      const bacList = [...ngach.bacLuongs].sort((a, b) => a.bac - b.bac);

      const currentIndex = bacList.findIndex((b) => b.id === currentBac.id);

      const tongHeSo =
        (item.bacLuong.heSo ?? 0) +
        (item.heSoChucVu?.heSo ?? 0) +
        (item.heSoTrachNhiem?.heSo ?? 0);
      const mucLuong = (luongToiThieuApDung?.mucLuong ?? 0) * tongHeSo;

      const maxBac = {
        isMax: currentIndex === bacList.length - 1,
        bacMax: bacList.length,
      };

      const nextBac = maxBac.isMax ? null : bacList[currentIndex + 1];
      const nextTongHeSo =
        (nextBac?.heSo ?? 0) +
        (item.heSoChucVu?.heSo ?? 0) +
        (item.heSoTrachNhiem?.heSo ?? 0);
      const nextMucLuong = (luongToiThieuApDung?.mucLuong ?? 0) * nextTongHeSo;

      // Tính ngày dự kiến nâng bậc
      const nextNgayApDung = maxBac.isMax
        ? null
        : addYears(item.ngayApDung, currentBac.thoiGianNangBac);

      return {
        ...item,
        tinhToan: {
          tongHeSo,
          mucLuong,
          maxBac,
          nextBac,
          nextTongHeSo,
          nextMucLuong,
          nextNgayApDung,
        },
      };
    });

    // RETURN FULL PAGINATION DATA
    return {
      data: itemsWithComputed,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async getById(id: number) {
    const luongToiThieuApDung = await this.prisma.luongToiThieuVung.findFirst({
      where: { apDung: true },
      orderBy: { thoiGianApDung: 'desc' },
    });
    const luongToiThieu = luongToiThieuApDung?.mucLuong ?? 0;

    const item = await this.prisma.bhxh.findUnique({
      where: { id },
      include: {
        nhanVien: {
          include: {
            phong: true,
            chucVu: true,
          },
        },
        ngachLuong: {
          include: {
            bacLuongs: true, // để tính max bậc và tìm next bậc
          },
        },
        bacLuong: true,
        heSoChucVu: true,
        heSoTrachNhiem: true,
      },
    });
    if (!item) throw new NotFoundException('BHXH record not found');
    // --- COMPUTE tổng hệ số hiện tại ---
    const heSoBac = item.bacLuong?.heSo ?? 0;
    const heSoChucVu = item.heSoChucVu?.heSo ?? 0;
    const heSoTrachNhiem = item.heSoTrachNhiem?.heSo ?? 0;
    const tongHeSo = heSoBac + heSoChucVu + heSoTrachNhiem;
    const mucLuong = luongToiThieu * tongHeSo;
    const maxBac = {
      isMax:
        item.ngachLuong.bacLuongs.findIndex(
          (bac) => bac.id === item.bacLuong.id,
        ) ===
        item.ngachLuong.bacLuongs.length - 1,
      bacMax: item.ngachLuong.bacLuongs.length,
    };
    const nextBac = maxBac.isMax
      ? null
      : item.ngachLuong.bacLuongs[
          item.ngachLuong.bacLuongs.findIndex(
            (bac) => bac.id === item.bacLuong.id,
          ) + 1
        ];
    const nextTongHeSo = nextBac?.heSo ?? 0 + heSoChucVu + heSoTrachNhiem;
    const nextMucLuong = luongToiThieu * nextTongHeSo;
    const nextNgayApDung = maxBac.isMax
      ? null
      : addYears(item.ngayApDung, item.bacLuong.thoiGianNangBac);
    return {
      ...item,
      tinhToan: {
        tongHeSo,
        mucLuong,
        maxBac,
        nextBac,
        nextTongHeSo,
        nextMucLuong,
        nextNgayApDung,
      },
    };
  }

  async store(data: CreateBhxhDto) {
    return this.prisma.bhxh.create({ data });
  }

  async update(id: number, data: CreateBhxhDto) {
    return this.prisma.bhxh.update({
      where: { id },
      data,
    });
  }

  async destroy(id: number) {
    return this.prisma.bhxh.delete({ where: { id } });
  }

  async listGanDenHanNangBac() {
    const today = new Date();
    const bhxhs = await this.prisma.bhxh.findMany({
      where: {
        nhanVien: {
          trangThai: true,
          nhanVienVhsc: false,
        },
      },
      include: {
        nhanVien: {
          include: {
            phong: true,
          },
        },
        ngachLuong: {
          include: { bacLuongs: true },
        },
        bacLuong: true,
      },
    });

    const result = bhxhs.filter((item) => {
      const ngayDenHan = addYears(
        item.ngayApDung,
        item.bacLuong.thoiGianNangBac,
      );
      const daysLeft = differenceInDays(ngayDenHan, today);
      return (
        item.ngachLuong.bacLuongs.length !== item.bacLuong.bac &&
        daysLeft <= this.SO_NGAY_KIEM_TRA
      );
    });

    return result;
  }

  async xacNhanNangBac(id: number,values:BhxhNangBacDto) {
    await this.prisma.bhxh.update({
      where: { id },
      data: {
        bacLuongId:values.bacLuongId,
        ngayApDung: values.ngayApDung,
        ghiChu: values.ghiChu,
      },
    });
    const luongToiThieuApDung = await this.prisma.luongToiThieuVung.findFirst({
      where: { apDung: true },
      orderBy: { thoiGianApDung: 'desc' },
    });
    return await this.prisma.lichSuBhxh.create({
      data: {
        nhanVienId: values.nhanVienId,
        ngachLuongId: values.ngachLuongId,
        bacLuongId: values.bacLuongId,
        heSoChucVuId: values.heSoChucVuId,
        heSoTrachNhiemId: values.heSoTrachNhiemId,
        ngayApDung: values.ngayApDung,
        ghiChu: values.ghiChu,
        luongToiThieuVungId: luongToiThieuApDung?.id ?? 0,
      },
    });
  }

  async xacNhanChuyenNgach(id: number,values:BhxhNangBacDto) {
    await this.prisma.bhxh.update({
      where: { id },
      data: {
        ngachLuongId:values.ngachLuongId,
        bacLuongId:values.bacLuongId,
        heSoChucVuId:values.heSoChucVuId,
        heSoTrachNhiemId:values.heSoTrachNhiemId,
        ngayApDung: values.ngayApDung,
        ghiChu: values.ghiChu,
      },
    });
    const luongToiThieuApDung = await this.prisma.luongToiThieuVung.findFirst({
      where: { apDung: true },
      orderBy: { thoiGianApDung: 'desc' },
    });
    return await this.prisma.lichSuBhxh.create({
      data: {
        nhanVienId: values.nhanVienId,
        ngachLuongId: values.ngachLuongId,
        bacLuongId: values.bacLuongId,
        heSoChucVuId: values.heSoChucVuId,
        heSoTrachNhiemId: values.heSoTrachNhiemId,
        ngayApDung: values.ngayApDung,
        ghiChu: values.ghiChu,
        luongToiThieuVungId: luongToiThieuApDung?.id ?? 0,
      },
    });
  }
}
