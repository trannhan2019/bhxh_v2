import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatViDate } from "@/lib/utils";
import { type TBhxhItem } from "@/types/bhxh";
import {
  ArrowBigRight,
  BadgeCheckIcon,
  CalendarCheck,
  ChartNoAxesCombined,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { BhxhNangBacModal } from "./bhxh-nang-bac-modal";
import { BhxhChuyenNgachModal } from "./bhxh-chuyen-ngach-modal";

interface Props {
  data: TBhxhItem;
}

export function BhxhDetailInfo({ data }: Props) {
  const [openNangBac, setOpenNangBac] = useState(false);
  const [openChuyenNgach, setOpenChuyenNgach] = useState(false);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
      <div className="mb-4 border-b-2 border-gray-200 py-4 flex justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {data.nhanVien.ten}
          </h2>
          <p className="text-gray-500">{data.nhanVien.chucVu.ten}</p>
          <p className="text-sm text-gray-400">{data.nhanVien.phong.ten}</p>
        </div>
        <div className="flex gap-3">
          {!data.tinhToan.maxBac.isMax && (
            <Button
              variant="outline"
              className="border-blue-500 hover:bg-blue-500 hover:text-white"
              size="lg"
              onClick={() => setOpenNangBac(true)}
            >
              <ChartNoAxesCombined />
              Xác nhận nâng lương
            </Button>
          )}

          <Button
            variant="outline"
            size="lg"
            className="border-orange-400  hover:bg-orange-500 hover:text-white"
            onClick={() => setOpenChuyenNgach(true)}
          >
            <TrendingUp />
            Chuyển ngạch lương
          </Button>
        </div>
      </div>

      {/* Các modal nâng lương, chuyển ngạch lương */}

      <BhxhNangBacModal
        open={openNangBac}
        setOpen={setOpenNangBac}
        bhxh={data}
      />
      <BhxhChuyenNgachModal
        open={openChuyenNgach}
        setOpen={setOpenChuyenNgach}
        bhxh={data}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <h3 className="text-xl mb-3 flex gap-2 items-center font-semibold">
            <CalendarCheck />
            Thông tin mức lương đang tham gia
          </h3>
          <div className="mb-3">
            <p className="text-sm text-gray-500">Chức danh: </p>
            <p className="font-medium">
              {data.ngachLuong.tenNgach} -{" "}
              <strong>
                bậc {data.bacLuong.bac}/{data.tinhToan.maxBac.bacMax}
              </strong>
            </p>
          </div>
          <div className="mb-3">
            <p className="text-sm text-gray-500">Hệ số lương: </p>
            <p className="font-medium">{data.bacLuong.heSo}</p>
          </div>
          {data.heSoChucVu && (
            <div className="mb-3">
              <p className="text-sm text-gray-500">Hệ số phụ cấp: </p>
              <p className="font-medium">{data.heSoChucVu.heSo}</p>
            </div>
          )}
          {data.heSoTrachNhiem && (
            <div className="mb-3">
              <p className="text-sm text-gray-500">Hệ số trách nhiệm: </p>
              <p className="font-medium">{data.heSoTrachNhiem.heSo}</p>
            </div>
          )}
          <div className="mb-3">
            <p className="text-sm text-gray-500">Tổng hệ số lương: </p>
            <p className="font-medium">{data.tinhToan.tongHeSo}</p>
          </div>
          <div className="mb-3">
            <p className="text-sm text-gray-500">Mức lương: </p>
            <p className="font-medium">
              {data.tinhToan.mucLuong.toLocaleString("vi")} (đồng)
            </p>
          </div>
          <div className="mb-3">
            <p className="text-sm text-gray-500">Ngày áp dụng: </p>
            <p className="font-medium">{formatViDate(data.ngayApDung)}</p>
          </div>
          <div className="mb-3">
            <p className="text-sm text-gray-500">Thông tin khác: </p>
            <p className="font-medium">{data.ghiChu ?? "Đang cập nhật..."}</p>
          </div>
        </div>
        <div>
          <h3 className="text-xl mb-3 flex items-center gap-2 font-semibold">
            <ArrowBigRight />
            Thông tin mức lương lần nâng tiếp theo
          </h3>
          {data.tinhToan.maxBac.isMax ? (
            <Badge
              variant={"outline"}
              className="bg-green-400 text-sm text-white"
            >
              <BadgeCheckIcon />
              Đã đạt bậc lương cao nhất
            </Badge>
          ) : (
            <div>
              <div className="mb-3">
                <p className="text-sm text-gray-500">Chức danh: </p>
                <p className="font-medium">
                  {data.ngachLuong.tenNgach} -{" "}
                  <strong>
                    bậc {data.tinhToan.nextBac?.bac}/
                    {data.tinhToan.maxBac.bacMax}
                  </strong>
                </p>
              </div>
              <div className="mb-3">
                <p className="text-sm text-gray-500">Hệ số lương: </p>
                <p className="font-medium">{data.tinhToan?.nextBac?.heSo}</p>
              </div>
              {data.heSoChucVu && (
                <div className="mb-3">
                  <p className="text-sm text-gray-500">
                    Hệ số phụ cấp chức vụ:{" "}
                  </p>
                  <p className="font-medium">{data.heSoChucVu.heSo}</p>
                </div>
              )}
              {data.heSoTrachNhiem && (
                <div className="mb-3">
                  <p className="text-sm text-gray-500">Hệ số trách nhiệm: </p>
                  <p className="font-medium">{data.heSoTrachNhiem.heSo}</p>
                </div>
              )}
              <div className="mb-3">
                <p className="text-sm text-gray-500">Tổng hệ số lương: </p>
                <p className="font-medium">{data.tinhToan?.nextBac?.heSo}</p>
              </div>
              <div className="mb-3">
                <p className="text-sm text-gray-500">Mức lương: </p>
                <p className="font-medium">
                  {data.tinhToan?.nextMucLuong?.toLocaleString("vi")} (đồng)
                </p>
              </div>
              <div className="mb-3">
                <p className="text-sm text-gray-500">Ngày áp dụng: </p>
                <p className="font-medium">
                  {formatViDate(data.tinhToan?.nextNgayApDung)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
