import { create } from 'zustand'
import type { TAuth } from '@/types/auth';
import { persist, createJSONStorage } from 'zustand/middleware';

interface IAuthStore {
    auth: TAuth;
    setAuth: (auth: TAuth) => void;
}

export const useAuthStore = create<IAuthStore>()(
    persist(
        (set) => ({
            auth: {
                user: null,
                token: null,
            },
            setAuth: (auth: TAuth) => set({ auth }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);


