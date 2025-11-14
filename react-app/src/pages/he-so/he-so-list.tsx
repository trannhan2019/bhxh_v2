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
import { BadgeCheckIcon, MoreHorizontal, Pencil, Trash } from "lucide-react";
import type { THeSo } from "@/types/he-so";
import { Badge } from "@/components/ui/badge";

export function HeSoList({
  heSos,
  handleOpenModal,
  handleOpenAlert,
}: {
  heSos: THeSo[];
  handleOpenModal: (item: THeSo | null) => void;
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
            <TableHead className="w-[50%]">Chức danh</TableHead>
            <TableHead>Hệ số</TableHead>
            <TableHead>Loại</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {heSos.map((heSo, idx) => (
            <TableRow key={heSo.id}>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell className="whitespace-normal">{heSo.chucDanh}</TableCell>
              <TableCell>{heSo.heSo.toLocaleString('vi-VN')}</TableCell>
              <TableCell>{
                <Badge variant="outline" className={heSo.loai === 'CHUC_VU' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}>
                  <BadgeCheckIcon />
                  {heSo.loai === 'CHUC_VU' ? 'Chức vụ' : 'Trách nhiệm'}
                </Badge>
                }</TableCell>
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
                        onClick={() => handleOpenModal(heSo)}
                      >
                        <Pencil className="size-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={() => handleOpenAlert(heSo.id)}
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
