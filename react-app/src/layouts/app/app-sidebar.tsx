import { AppLogo } from "@/components/app-logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { NavItem } from "@/types/layout";
import {
  Building2,
  LayoutGrid,
  Users2,
  Landmark,
  DollarSign,
  ChartNoAxesColumn,
  HandCoins,
} from "lucide-react";
import { Link } from "react-router";
import { NavQuanLy } from "./nav-qly";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const mainNavItems: NavItem[] = [
  {
    title: "Thông tin BHXH",
    href: "/bhxh",
    icon: LayoutGrid,
  },
];

const quanlyNavItems: NavItem[] = [
  {
    title: "Quản lý bậc lương",
    href: "/bac-luong",
    icon: ChartNoAxesColumn,
  },
  {
    title: "Quản lý các loại hệ số",
    href: "/he-so",
    icon: HandCoins,
  },
  {
    title: "Quản lý mức lương tối thiểu vùng",
    href: "/luong-toi-thieu-vung",
    icon: DollarSign,
  },
  {
    title: "Quản lý cán bộ nhân viên",
    href: "/nhan-vien",
    icon: Users2,
  },
  {
    title: "Quản lý phòng/đơn vị",
    href: "/phong",
    icon: Building2,
  },
  {
    title: "Quản lý chức vụ",
    href: "/chuc-vu",
    icon: Landmark,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
        <NavQuanLy items={quanlyNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
