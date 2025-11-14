import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBhxhDto } from "./bhxh.dto";

@Injectable()
export class BhxhService {
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
        return this.prisma.nhanVien.delete({ where: { id } });
      }
}