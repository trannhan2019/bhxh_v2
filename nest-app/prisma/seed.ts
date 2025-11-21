import { PrismaClient,HeSoLoai } from '@prisma/client';
import { phongData } from './mock/phong.data';
import { chucvuData } from './mock/chuc-vu.data';
import { nhanVienData } from './mock/nhan-vien.data';
import { luongToiThieuVungData } from './mock/luong-toi-thieu.data';
import { ngachLuongData } from './mock/ngach-luong.data';
import { bacLuongData } from './mock/bac-luong.data';
import { heSoData } from './mock/he-so.data';
import { bhxhData } from './mock/bhxh.data';
import { lichSuBhxhData } from './mock/lich-su-bhxh.data';

const prisma = new PrismaClient();

async function clearTable(tableName: string) {
  // Xoá dữ liệu
  await prisma.$executeRawUnsafe(`DELETE FROM "${tableName}"`);
  // Reset auto-increment về 1
  await prisma.$executeRawUnsafe(
    `DELETE FROM sqlite_sequence WHERE name='${tableName}'`,
  );
}

async function main() {
  // Xoá theo thứ tự để tránh lỗi khoá ngoại
  await clearTable('LichSuBhxh');
  await clearTable('Bhxh');
  await clearTable('HeSo');
  await clearTable('NhanVien');
  await clearTable('BacLuong');
  await clearTable('NgachLuong');
  await clearTable('LuongToiThieuVung');
  await clearTable('ChucVu');
  await clearTable('Phong');

  // Insert lại dữ liệu
  await prisma.phong.createMany({ data: phongData });
  await prisma.chucVu.createMany({ data: chucvuData });
  await prisma.luongToiThieuVung.createMany({ data: luongToiThieuVungData });
  await prisma.ngachLuong.createMany({ data: ngachLuongData });
  await prisma.bacLuong.createMany({ data: bacLuongData });
  await prisma.heSo.createMany({ data: heSoData.map((item) => ({ ...item, loai: HeSoLoai[item.loai] })) });
  await prisma.nhanVien.createMany({ data: nhanVienData });
  await prisma.bhxh.createMany({ data: bhxhData });
  await prisma.lichSuBhxh.createMany({ data: lichSuBhxhData });
  console.log('Seed completed');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
