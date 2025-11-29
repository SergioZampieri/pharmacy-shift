import { create } from 'zustand';

/**
 * Dialog types that can be opened
 */
export type DialogType = 'pharmacy-details' | 'settings' | 'about' | null;

/**
 * UI state interface
 */
interface UIState {
  /** Whether mobile navigation menu is open */
  isMobileNavOpen: boolean;
  /** Currently open dialog (null if none) */
  openDialog: DialogType;
  /** Whether sidebar is collapsed (desktop) */
  isSidebarCollapsed: boolean;
  /** Loading state for async actions */
  isLoading: boolean;
  /** Actions */
  toggleMobileNav: () => void;
  setMobileNavOpen: (open: boolean) => void;
  openDialogType: (dialog: DialogType) => void;
  closeDialog: () => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setLoading: (loading: boolean) => void;
}

/**
 * Zustand store for UI state
 * Manages mobile navigation, dialogs, sidebar, and loading states
 */
export const useUIStore = create<UIState>((set) => ({
  isMobileNavOpen: false,
  openDialog: null,
  isSidebarCollapsed: false,
  isLoading: false,

  toggleMobileNav: () => set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),

  setMobileNavOpen: (open) => set({ isMobileNavOpen: open }),

  openDialogType: (dialog) => set({ openDialog: dialog }),

  closeDialog: () => set({ openDialog: null }),

  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),

  setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),

  setLoading: (loading) => set({ isLoading: loading }),
}));
