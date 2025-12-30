import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: number;
  phone: string;
  fullName: string;
  isVerified: boolean;
}

interface UserState {
  user: User | null;
  token: string | null;
  hasHydrated: boolean;
  setUser: (user: User, token: string) => void;
  clearUser: () => void;
  setHasHydrated: (hydrated: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      hasHydrated: false,
      setUser: (user, token) => set({ user, token }),
      clearUser: () => set({ user: null, token: null }),
      setHasHydrated: (hydrated) => set({ hasHydrated: hydrated }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        // Called when rehydration is complete
        state?.setHasHydrated(true);
      },
    },
  ),
);
