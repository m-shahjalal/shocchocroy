import { CompleteProduct } from '@/server/schema';
import { atom } from 'jotai';

export const sidebarAtom = atom({
  isSidebarOpen: false,
});

export const cartAtom = atom({
  items: [] as { data: CompleteProduct; quantity: number }[],
});
