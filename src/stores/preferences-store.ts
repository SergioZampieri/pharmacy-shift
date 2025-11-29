import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

/**
 * User preferences state interface
 */
interface PreferencesState {
  /** User's preferred theme (light/dark) */
  theme: 'light' | 'dark';
  /** Whether to show shift countdown */
  showCountdown: boolean;
  /** Whether to enable notifications for shift changes */
  enableNotifications: boolean;
  /** Actions */
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  setShowCountdown: (show: boolean) => void;
  setEnableNotifications: (enable: boolean) => void;
}

/**
 * Zustand store for user preferences
 * Persisted to localStorage for cross-session persistence
 */
export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      theme: 'light',
      showCountdown: true,
      enableNotifications: false,

      setTheme: (theme) => set({ theme }),

      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

      setShowCountdown: (show) => set({ showCountdown: show }),

      setEnableNotifications: (enable) => set({ enableNotifications: enable }),
    }),
    {
      name: 'pharmacy-shifts-preferences',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
