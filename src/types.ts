// src/types.ts
import type { ReactNode } from "react";

export interface ActiveModal {
  id: string;
  data?: Record<string, any>;
}

export interface HistoryModalContextType {
  activeModals: ActiveModal[];
  closeModal: (modalId: string) => void;
  openModal: (params: { modalId: string; [key: string]: any }) => void;
  openModalChecker: (modalId: string) => ActiveModal | undefined;
}

export interface HistoryModalProviderProps {
  children: ReactNode;
}
