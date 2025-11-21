import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Search, Trash } from "lucide-react";

import type { TBhxhItem } from "@/types/bhxh";
import { formatViDate } from "@/lib/utils";
import { BhxhBadge } from "./bhxh-badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export function BhxhList({
  bhxhs,
  handleOpenModal,
  handleOpenAlert,
  currentPage,
  pageSize,
}: {
  bhxhs: TBhxhItem[];
  handleOpenModal: (item: TBhxhItem | null) => void;
  handleOpenAlert: (id: number) => void;
  currentPage: number;
  pageSize: number;
}) {
  const navigate = useNavigate();
  return (
    <div className="rounded-xl border p-2 mt-4">
      <Table className="caption-top">
        <TableCaption className="text-left mb-2">
          Thông tin theo dõi bảo hiểm xã hội
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[70px]">STT</TableHead>
            <TableHead>Tên cán bộ nhân viên</TableHead>
            <TableHead className="min-w-[200px]">Chức danh</TableHead>
            <TableHead>Tổng hệ số</TableHead>
            <TableHead>Mức lương (đồng)</TableHead>
            <TableHead>Ngày áp dụng</TableHead>
            <TableHead>Ngày nâng lương tiếp theo</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bhxhs.length > 0 ? (
            bhxhs.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {(currentPage - 1) * pageSize + idx + 1}
                </TableCell>
                <TableCell>{item.nhanVien.ten}</TableCell>
                <TableCell className="whitespace-normal">
                  {item.ngachLuong.tenNgach} -{" "}
                  <strong>
                    bậc {item.bacLuong.bac}/{item.tinhToan.maxBac.bacMax}
                  </strong>
                </TableCell>
                <TableCell>
                  {item.tinhToan.tongHeSo.toLocaleString("vi")}
                </TableCell>
                <TableCell>
                  {item.tinhToan.mucLuong.toLocaleString("vi")}
                </TableCell>
                <TableCell>{formatViDate(item.ngayApDung)}</TableCell>
                <TableCell>
                  <BhxhBadge
                    daMaxBac={item.tinhToan.maxBac.isMax}
                    thoiGianNangBacTiepTheo={item.tinhToan.nextNgayApDung}
                  />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="size-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="size-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => navigate(`/bhxh/${item.id}`)}>
                          <Search className="size-4" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleOpenModal(item)}>
                          <Pencil className="size-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={() => handleOpenAlert(item.id)}
                        >
                          <Trash className="size-4 text-red-500" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                Không có dữ liệu
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
