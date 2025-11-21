import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import * as ExcelJS from 'exceljs';
import { join } from 'path';
import { type BhxhDataDto } from 'src/bhxh/bhxh.dto';

@Injectable()
export class ReportService {
  async exportBhxhToExcel(data: BhxhDataDto) {
    // 1. Đọc file template
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(
      join(__dirname, '..', 'templates', 'bhxh_template.xlsx'),
    );

    const worksheet = workbook.getWorksheet('Sheet1');
    if (!worksheet) throw new Error("Không tìm thấy worksheet 'Sheet1'");

    worksheet.getCell('B4').value = data.nhanVien.ten;
    worksheet.getCell('B5').value = data.nhanVien.chucVu.ten;
    worksheet.getCell('B6').value = data.nhanVien.phong.ten;
    const bacLuong = `${data.ngachLuong.tenNgach} - Bậc ${data.bacLuong.bac}/${data.tinhToan.maxBac.bacMax}`;
    worksheet.getCell('B7').value = bacLuong;
    worksheet.getCell('B8').value = data.bacLuong.heSo;
    worksheet.getCell('B9').value = data.heSoChucVu?.heSo ?? 0;
    worksheet.getCell('B10').value = data.heSoTrachNhiem?.heSo ?? 0;
    worksheet.getCell('B11').value = data.tinhToan.tongHeSo;
    worksheet.getCell('B12').value = data.tinhToan.mucLuong;
    worksheet.getCell('B13').value = format(data.ngayApDung, 'dd/MM/yyyy');

    if (data.tinhToan.maxBac.isMax) {
        const maxBacInfo = 'Đã đạt bậc cao nhất';
        worksheet.getCell('B14').value = maxBacInfo;
    } else {
        const bacLuongMoi = `${data.ngachLuong.tenNgach} - Bậc ${data.tinhToan.nextBac?.bac}/${data.tinhToan.maxBac?.bacMax}`;
        worksheet.getCell('B15').value = bacLuongMoi;
        worksheet.getCell('B16').value = data.tinhToan.nextBac?.heSo ?? 0;
        worksheet.getCell('B17').value = data.heSoChucVu?.heSo ?? 0;
        worksheet.getCell('B18').value = data.heSoTrachNhiem?.heSo ?? 0;
        worksheet.getCell('B19').value = data.tinhToan.nextTongHeSo;
        worksheet.getCell('B20').value = data.tinhToan.nextMucLuong;
        worksheet.getCell('B21').value = data.tinhToan.nextNgayApDung ? format(data.tinhToan.nextNgayApDung, 'dd/MM/yyyy') : null;
    }
    

    // 4. Xuất ra Buffer (để gửi qua HTTP)
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }
}
