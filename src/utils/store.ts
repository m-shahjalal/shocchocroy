import { atom } from 'jotai';

export const sidebarAtom = atom({
  isSidebarOpen: false,
});

export const cartAtom = atom({
  items: [],
});
