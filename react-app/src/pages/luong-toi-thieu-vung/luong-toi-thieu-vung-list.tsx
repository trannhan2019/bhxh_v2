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
import type { TLuongToiThieuVung } from "@/types/luong-toi-thieu-vung";
import { Button } from "@/components/ui/button";
import { BadgeCheckIcon, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatViDate } from "@/lib/utils";

export function LuongToiThieuVungList({
  luongToiThieuVungs,
  handleOpenModal,
  handleOpenAlert,
}: {
  luongToiThieuVungs: TLuongToiThieuVung[];
  handleOpenModal: (item: TLuongToiThieuVung | null) => void;
  handleOpenAlert: (id: number) => void;
}) {
  return (
    <div className="rounded-xl border p-2 mt-4">
      <Table className="caption-top">
        <TableCaption className="text-left mb-2">
          Danh sách phòng/đơn vị
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">STT</TableHead>
            <TableHead>Mức lương (đồng)</TableHead>
            <TableHead>Thời gian áp dụng</TableHead>
            <TableHead className="w-[200px]">
              Căn cứ pháp lý
            </TableHead>
            <TableHead>Trạng thái áp dụng</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {luongToiThieuVungs.map((item, idx) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell>{item.mucLuong.toLocaleString("vi-VN")}</TableCell>
              <TableCell>{formatViDate(item.thoiGianApDung)}</TableCell>
              <TableCell className="whitespace-normal">{item.canCuPhapLy}</TableCell>
              <TableCell>
                <Badge variant={item.apDung ? "default" : "destructive"}>
                  <BadgeCheckIcon />
                  {item.apDung ? "Đang áp dụng" : "Không áp dụng"}
                </Badge>
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
