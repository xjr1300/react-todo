import { create } from 'zustand';
import { createJSONStorage, persist, devtools } from 'zustand/middleware';
import type { User } from '@/types';

const AUTH_STORAGE_KEY = 'auth-storage';

interface AuthState {
  user: User | null | undefined;
  setUser: (user: User | null | undefined) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => {
          set({ user }, false, 'setUser');
        },
        logout: () => {
          set({ user: null }, false, 'logout');
          localStorage.removeItem(AUTH_STORAGE_KEY);
        },
      }),
      {
        name: AUTH_STORAGE_KEY,
        storage: createJSONStorage(() => localStorage),
      }
    ),
    {
      name: 'AuthStore',
    }
  )
);
