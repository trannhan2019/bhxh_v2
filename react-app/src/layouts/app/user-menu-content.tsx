import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { type TAuthUser } from "@/types/auth";
import { LogOut, UserCog } from "lucide-react";
import { UserInfo } from "./user-info";
import { useMobileNavigation } from "@/hooks/use-mobile-navigation";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/stores/auth";

interface UserMenuContentProps {
  user: TAuthUser;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
  const navigate = useNavigate();
  const cleanup = useMobileNavigation();
  const { setAuth } = useAuthStore();

  const handleLogout = () => {
    setAuth({
      user: null,
      token: null,
    });
    cleanup();
    navigate("/login");
  };

  return (
    <>
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <UserInfo user={user} showEmail={true} />
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link className="block w-full" to="/user">
            <UserCog className="mr-2" />
            Quản lý tài khoản
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Button
            className="flex w-full items-center justify-baseline"
            variant="ghost"
            onClick={handleLogout}
            data-test="logout-button"
          >
            <LogOut className="mr-2" />
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  );
}
