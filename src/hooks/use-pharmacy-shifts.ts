'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { fetchPharmacyShifts } from '@/services/pharmacy-api';

/**
 * Calculate milliseconds until the next 8:00 AM shift change
 * @returns Milliseconds until next 8:00 AM
 */
function getMillisecondsUntilNextShiftChange(): number {
  const now = new Date();
  const next8AM = new Date(now);

  // Set to 8:00 AM today
  next8AM.setHours(8, 0, 0, 0);

  // If it's already past 8:00 AM today, set to 8:00 AM tomorrow
  if (now >= next8AM) {
    next8AM.setDate(next8AM.getDate() + 1);
  }

  return next8AM.getTime() - now.getTime();
}

/**
 * Custom hook for fetching pharmacy shift data with automatic refetching
 *
 * Features:
 * - Automatic refetch at 8:00 AM daily (shift change time)
 * - Background polling every 5 minutes to detect early shift changes
 * - Refetch when user returns to the tab (refetchOnWindowFocus)
 * - Provides loading, error, and data states
 *
 * @returns Query result with shift data, loading state, and error state
 */
export function usePharmacyShifts() {
  // Calculate initial refetch interval based on time until shift change
  const [refetchInterval, setRefetchInterval] = useState<number>(() => {
    const msUntilNextShift = getMillisecondsUntilNextShiftChange();
    // If shift change is within the next 5 minutes, refetch more frequently
    return msUntilNextShift < 5 * 60 * 1000 ? 10 * 1000 : 5 * 60 * 1000;
  });

  // Set up a timeout to switch to frequent polling at 8:00 AM
  useEffect(() => {
    const msUntilNextShift = getMillisecondsUntilNextShiftChange();

    const timeoutId = setTimeout(() => {
      setRefetchInterval(10 * 1000); // Switch to frequent polling after shift change
    }, msUntilNextShift);

    return () => clearTimeout(timeoutId);
  }, []);

  const query = useQuery({
    queryKey: ['pharmacy-shifts'],
    queryFn: fetchPharmacyShifts,
    refetchInterval, // Dynamic interval based on time until shift change
    refetchIntervalInBackground: true, // Continue polling even when tab is not focused
  });

  return query;
}

/**
 * Hook to get countdown to next shift change
 * @returns Object with hours, minutes, and seconds until next shift
 */
export function useShiftCountdown() {
  const [timeUntilShift, setTimeUntilShift] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const ms = getMillisecondsUntilNextShiftChange();
      const hours = Math.floor(ms / (1000 * 60 * 60));
      const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((ms % (1000 * 60)) / 1000);

      setTimeUntilShift({ hours, minutes, seconds });
    };

    // Update immediately
    updateCountdown();

    // Update every second
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return timeUntilShift;
}
