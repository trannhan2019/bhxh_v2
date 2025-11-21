import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getBhxhNotification } from "@/apis/bhxh";
import { Link } from "react-router";

export function AppNotification() {
  const { data: notifications } = useQuery({
    queryKey: ["bhxh-notifications"],
    queryFn: getBhxhNotification,
  });

  return (
    <div className="mr-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative p-3 rounded-full hover:bg-gray-100"
          >
            <Bell className="size-5" />

            {notifications && notifications.length > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1.5 py-0.5">
                {notifications.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-72 max-h-[400px] overflow-y-auto ">
          <DropdownMenuLabel className="font-semibold text-center">
            Thông báo
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {notifications?.map((item) => (
            <DropdownMenuItem
              asChild
              key={item.id}
              className="block px-3 py-2 rounded-xl hover:bg-gray-100 cursor-pointer"
            >
              <Link
                to={`/bhxh/${item.id}`}
                className="block whitespace-normal text-left leading-snug"
              >
                <span className="font-semibold">{item.nhanVien.ten}</span> thuộc{" "}
                {item.nhanVien.phong.ten} gần đến hạn nâng lương BHXH
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
