export function formatCreationDate(dateInput: string | number | Date) {
  const msPerDay = 1000 * 60 * 60 * 24;
  const msPerMonth = msPerDay * 30; // approx
  const msPerYear = msPerDay * 365; // approx
  const created = new Date(dateInput);
  if (isNaN(created.getTime())) return '';
  const diff = Date.now() - created.getTime();
  if (diff < 0) return 'In the future';

  const years = Math.floor(diff / msPerYear);
  const months = Math.floor((diff % msPerYear) / msPerMonth);
  const days = Math.floor((diff % msPerMonth) / msPerDay);

  if (years === 0) {
    if (months === 0) {
      const d = Math.max(1, days);
      return `${d} day${d === 1 ? '' : 's'} ago`;
    }
    return `${months} month${months === 1 ? '' : 's'} ago`;
  }

  // years >= 1
  if (months === 0) {
    return `${years} year${years === 1 ? '' : 's'} ago`;
  }
  return `${years} year${years === 1 ? '' : 's'} ${months} month${months === 1 ? '' : 's'} ago`;
}
