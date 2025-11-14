import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import { type TUser } from '@/types/user';
import { LogOut, Settings } from 'lucide-react';
import { UserInfo } from './user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/stores/auth';

interface UserMenuContentProps {
    user: TUser;
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
        navigate('/login');
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
                    <Link
                        className="block w-full"
                        to="#"
                    >
                        <Settings className="mr-2" />
                        Settings
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Button
                    className="block w-full"
                    variant="link"
                    onClick={handleLogout}
                    data-test="logout-button"
                >
                    <LogOut className="mr-2" />
                    Log out
                </Button>
            </DropdownMenuItem>
        </>
    );
}