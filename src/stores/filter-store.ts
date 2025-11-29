import { create } from 'zustand';

/**
 * Filter options for pharmacy display
 */
export type PharmacyFilter = 'current' | 'next' | 'all';

/**
 * Filter state interface
 */
interface FilterState {
  /** Current filter selection */
  filter: PharmacyFilter;
  /** Whether to show only pharmacies with specific services */
  showOnlyOpen: boolean;
  /** Search query for pharmacy name/address */
  searchQuery: string;
  /** Actions */
  setFilter: (filter: PharmacyFilter) => void;
  setShowOnlyOpen: (showOnlyOpen: boolean) => void;
  setSearchQuery: (query: string) => void;
  /** Reset all filters to defaults */
  resetFilters: () => void;
}

/**
 * Default filter configuration
 */
const DEFAULT_FILTER: PharmacyFilter = 'all';

/**
 * Zustand store for pharmacy filters
 * Manages which pharmacies are displayed on the map and in lists
 */
export const useFilterStore = create<FilterState>((set) => ({
  filter: DEFAULT_FILTER,
  showOnlyOpen: false,
  searchQuery: '',

  setFilter: (filter) => set({ filter }),

  setShowOnlyOpen: (showOnlyOpen) => set({ showOnlyOpen }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  resetFilters: () =>
    set({
      filter: DEFAULT_FILTER,
      showOnlyOpen: false,
      searchQuery: '',
    }),
}));
