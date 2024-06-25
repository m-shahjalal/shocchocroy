"use client";
// TODO: remove this later
import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type SidebarStore,
  createSidebarStore,
  initSidebarStore,
} from "@/stores/sidebar.store";

export type SidebarStoreApi = ReturnType<typeof createSidebarStore>;

export const CounterStoreContext = createContext<SidebarStoreApi | undefined>(
  undefined
);

export interface CounterStoreProviderProps {
  children: ReactNode;
}

export const CounterStoreProvider = ({
  children,
}: CounterStoreProviderProps) => {
  const storeRef = useRef<SidebarStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createSidebarStore(initSidebarStore());
  }

  return (
    <CounterStoreContext.Provider value={storeRef.current}>
      {children}
    </CounterStoreContext.Provider>
  );
};

export const useCounterStore = <T,>(
  selector: (store: SidebarStore) => T
): T => {
  const counterStoreContext = useContext(CounterStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
