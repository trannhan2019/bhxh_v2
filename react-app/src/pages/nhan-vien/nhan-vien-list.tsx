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
import { Button } from "@/components/ui/button";
import {
  BadgeCheckIcon,
  MoreHorizontal,
  Pencil,
  Search,
  Trash,
} from "lucide-react";
import type { TNhanVienRes } from "@/types/nhan-vien";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router";

export function NhanVienList({
  nhanViens,
  handleOpenModal,
  handleOpenAlert,
  currentPage,
  pageSize,
}: {
  nhanViens: TNhanVienRes[];
  handleOpenModal: (item: TNhanVienRes | null) => void;
  handleOpenAlert: (id: number) => void;
  currentPage: number;
  pageSize: number;
}) {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border p-2 mt-4">
      <Table className="caption-top">
        <TableCaption className="text-left mb-2">
          Danh sách phòng/đơn vị
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">STT</TableHead>
            <TableHead>Họ và tên</TableHead>
            <TableHead>Phòng</TableHead>
            <TableHead>Chức vụ</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {nhanViens.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                Không có dữ liệu
              </TableCell>
            </TableRow>
          )}
          {nhanViens.map((item, idx) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {(currentPage - 1) * pageSize + idx + 1}
              </TableCell>
              <TableCell>{item.ten}</TableCell>
              <TableCell>{item.phong.ten}</TableCell>
              <TableCell>{item.chucVu.ten}</TableCell>
              <TableCell>
                <Badge variant={item.trangThai ? "default" : "destructive"}>
                  <BadgeCheckIcon />
                  {item.trangThai ? "Đang hoạt động" : "Đã nghỉ việc"}
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
                      <DropdownMenuItem
                        onClick={() => navigate(`/bhxh/${item.bhxh.id}`)}
                      >
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
