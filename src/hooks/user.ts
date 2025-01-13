import { User } from '@/types';
import { create } from 'zustand';

interface StoreUser {
    user?: User;
    removeUser: () => void;
    updateUser: (newUser: User) => void;
}

export const useStoreUser = create<StoreUser>((set) => ({
    user: undefined,
    removeUser: () => set({ user: undefined }),
    updateUser: (newUser: User) => set({ user: newUser }),
}));
