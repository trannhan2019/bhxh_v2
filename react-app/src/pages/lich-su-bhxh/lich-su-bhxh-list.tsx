import {
  Table,
  TableBody,
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
import type { TLichSuBhxhItem } from "@/types/lich-su-bhxh";
import { formatViDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";

interface Props {
  data: TLichSuBhxhItem[];
  handleOpenModal: (item: TLichSuBhxhItem | null) => void;
  handleOpenAlert: (id: number) => void;
}

export function LichSuBhxhList({
  data,
  handleOpenModal,
  handleOpenAlert,
}: Props) {
  return (
    <div className="rounded-xl border p-2 mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[70px]">STT</TableHead>
            <TableHead>Ngày áp dụng</TableHead>
            <TableHead className="w-[250px]">Bậc lương</TableHead>
            <TableHead className="w-[200px]">Phụ cấp (nếu có)</TableHead>
            <TableHead className="w-[150px] whitespace-normal">
              Mức lương tối thiểu vùng áp dụng (đồng)
            </TableHead>
            <TableHead className="w-[150px] whitespace-normal">
              Mức lương tham gia BHXH (đồng)
            </TableHead>
            <TableHead className="w-[150px]">Ghi chú</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell>{formatViDate(item.ngayApDung)}</TableCell>
                <TableCell className="whitespace-normal">
                  {item.ngachLuong.tenNgach} -{" "}
                  <strong>bậc {item.bacLuong.bac}</strong> - hệ số:{" "}
                  {item.bacLuong.heSo.toLocaleString("vi")}
                </TableCell>
                <TableCell className="whitespace-normal">
                  {item.heSoChucVu ? item.heSoChucVu.chucDanh : ""}
                  {item.heSoTrachNhiem
                    ? " " + item.heSoTrachNhiem.chucDanh
                    : ""}
                </TableCell>
                <TableCell>
                  {item.luongToiThieuVung.mucLuong.toLocaleString("vi")}
                </TableCell>
                <TableCell>{item.luong.toLocaleString("vi")}</TableCell>
                <TableCell className="whitespace-normal">
                  {item.ghiChu}
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
