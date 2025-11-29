/**
 * Format countdown time for pharmacy shift badges
 *
 * @param hours - Hours remaining
 * @param minutes - Minutes remaining
 * @returns Formatted time string (e.g., "9h", "45m", "Starting soon")
 */
export function formatShiftCountdown(hours: number, minutes: number): string {
  if (hours > 0) {
    return `${hours}h`;
  }

  if (minutes > 0) {
    return `${minutes}m`;
  }

  return 'Starting soon';
}

/**
 * Get badge text for pharmacy shift status
 *
 * @param isCurrentShift - Whether pharmacy is on current shift
 * @param hours - Hours until next shift
 * @param minutes - Minutes until next shift
 * @returns Badge text to display
 */
export function getShiftBadgeText(
  isCurrentShift: boolean,
  hours: number,
  minutes: number,
): string {
  if (isCurrentShift) {
    return 'ON DUTY';
  }

  const timeText = formatShiftCountdown(hours, minutes);
  return `Next turn in ${timeText}`;
}
