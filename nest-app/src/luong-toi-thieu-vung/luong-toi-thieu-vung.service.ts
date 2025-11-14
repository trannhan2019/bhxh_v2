import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { LuongToiThieuVungDto } from "./luong-toi-thieu-vung.dto";

@Injectable()
export class LuongToiThieuVungService {
    constructor(private prisma: PrismaService) {}
    
      async list() {
        return this.prisma.luongToiThieuVung.findMany({
          orderBy: {
            thoiGianApDung: 'desc',
          },
        });
      }
    
      async store(data: LuongToiThieuVungDto) {
        return this.prisma.luongToiThieuVung.create({ data });
      }
    
      async update(id: number, data: LuongToiThieuVungDto) {
        return this.prisma.luongToiThieuVung.update({
          where: { id },
          data,
        });
      }
    
      async destroy(id: number) {
        return await this.prisma.luongToiThieuVung.delete({ where: { id } });
      }
}