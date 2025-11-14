import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { HeSoDto } from "./he-so.dto";

@Injectable()
export class HeSoService {
    constructor(private prisma: PrismaService) {}
    
      async list() {
        return this.prisma.heSo.findMany({
          orderBy: {
            id: 'asc',
          },
        });
      }
    
      async store(data: HeSoDto) {
        return this.prisma.heSo.create({ data });
      }
    
      async update(id: number, data: HeSoDto) {
        return this.prisma.heSo.update({
          where: { id },
          data,
        });
      }
    
      async destroy(id: number) {
        // return await this.prisma.$transaction([
        //   this.prisma.nhanVien.deleteMany({ where: { chucVuId: id } }),
        //   this.prisma.chucVu.delete({ where: { id } }),
        // ]);
        return this.prisma.heSo.delete({ where: { id } });
      }
}