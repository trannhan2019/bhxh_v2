import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import {  ChucVuDto } from "./chuc-vu.dto";

@Injectable()
export class ChucVuService {
    constructor(private prisma: PrismaService) {}
    
      async list() {
        return this.prisma.chucVu.findMany({
          orderBy: {
            soThuTu: 'asc',
          },
        });
      }
    
      async store(data: ChucVuDto) {
        return this.prisma.chucVu.create({ data });
      }
    
      async update(id: number, data: ChucVuDto) {
        return this.prisma.chucVu.update({
          where: { id },
          data,
        });
      }
    
      async destroy(id: number) {
        return await this.prisma.$transaction([
          this.prisma.nhanVien.deleteMany({ where: { chucVuId: id } }),
          this.prisma.chucVu.delete({ where: { id } }),
        ]);
      }
}