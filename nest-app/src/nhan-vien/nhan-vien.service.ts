import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { NhanVienDto } from "./nhan-vien.dto";

@Injectable()
export class NhanVienService {
    constructor(private prisma: PrismaService) {}
    
      async list({ page = 1, pageSize = 15, search = '' }) {
        const nhanViens = await this.prisma.nhanVien.findMany({
          where:{
            ten: {
              contains: search,
            },
          },
          skip: (page - 1) * pageSize,
          take: pageSize,
          orderBy: {
            soThuTu: 'asc',
          },
          include: {
            phong: {
              select: {
                id: true,
                ten: true,
              },
            },
            chucVu: {
              select: {
                id: true,
                ten: true,
              },
            },
          },
        });
        const total = await this.prisma.nhanVien.count({
          where:{
            ten: {
              contains: search,
            },
          },
        });
        return {
          data: nhanViens,
          total,
        };
      }

      async getById(id: number) {
        return this.prisma.nhanVien.findUnique({ where: { id } });
      }
    
      async store(data: NhanVienDto) {
        return this.prisma.nhanVien.create({ data });
      }
    
      async update(id: number, data: NhanVienDto) {
        return this.prisma.nhanVien.update({
          where: { id },
          data,
        });
      }
    
      async destroy(id: number) {
        return this.prisma.nhanVien.delete({ where: { id } });
      }
}