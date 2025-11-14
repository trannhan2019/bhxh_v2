import { useAuthStore } from "@/stores/auth";
import { Navigate } from "react-router";

export default function GuestGuard({ children }: { children: React.ReactNode }) {
    const { auth } = useAuthStore();
    
    if (auth.token !== null && auth.user !== null) {
        return <Navigate to="/" />;
    }
    
    return <>{children}</>;
}