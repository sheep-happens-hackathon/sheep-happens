import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type User = {
  id: number;
  username: string;
};

type TreeState = {
  user: User;
  setUser: (user: User) => void;
};

export const useTreeStore = create<TreeState>()(
  devtools(
    persist(
      (set) => ({
        user: { id: 1, username: 'demo' },
        setUser: (user) => set({ user }),
      }),
      { name: 'tree-store' }
    )
  )
);
