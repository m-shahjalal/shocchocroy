// TODO: remove this later
import { createStore } from "zustand/vanilla";

export type SidebarState = {
  isOpen: boolean;
};

export type SidebarActions = {
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
};

export type SidebarStore = SidebarState & SidebarActions;

export const defaultInitState: SidebarState = {
  isOpen: false,
};

export const initSidebarStore = (): SidebarState => {
  return { isOpen: false };
};

export const createSidebarStore = (
  initState: SidebarState = defaultInitState
) => {
  return createStore<SidebarStore>()((set) => ({
    ...initState,
    toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
    openSidebar: () => set((state) => ({ isOpen: true })),
    closeSidebar: () => set((state) => ({ isOpen: false })),
  }));
};
