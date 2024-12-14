import { Node, TreeDescription } from '@/types/types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type User = {
  id: number;
  username: string;
};

type TreeState = {
  user: User;
  setUser: (user: User) => void;
  treeDescriptions: TreeDescription[];
  setTreeDescriptions: (treeDescriptions: TreeDescription[]) => void;
  nodes: Node[];
  setNodes: (nodeInputs: Node[]) => void;
  addTreeDescription: (treeDescription: TreeDescription) => void;
};

export const useTreeStore = create<TreeState>()(
  devtools(
    // persist(
    (set) => ({
      user: { id: 1, username: 'demo' },
      setUser: (user) => set({ user }),
      treeDescriptions: [],
      setTreeDescriptions: (treeDescriptions) => set({ treeDescriptions }),
      nodes: [],
      setNodes: (nodes) => set({ nodes }),
      addTreeDescription: (treeDescription) =>
        set((state) => ({
          treeDescriptions: [...state.treeDescriptions, treeDescription],
        })),
    })
    // ),
    // { name: 'tree-store' }
  )
);
