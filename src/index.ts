// src\index.ts
// This file serves as the main entry point, re-exporting modules.
// This allows consumers to import from 'react-history-modals' directly.

export {
  HistoryModalProvider,
  useHistoryModals,
  HistoryModalContext,
} from "./HistoryModalContext";
export type {
  ActiveModal,
  HistoryModalContextType,
  HistoryModalProviderProps,
} from "./types";
