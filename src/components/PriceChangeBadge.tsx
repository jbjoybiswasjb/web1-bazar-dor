interface PriceChangeBadgeProps {
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
}

// Helper function to convert English digits to Bengali digits
function toBengaliNumber(num: number): string {
  const englishToBengali: Record<string, string> = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯', '.': '.'
  };
  return num
    .toFixed(1)
    .split('')
    .map(digit => englishToBengali[digit] || digit)
    .join('');
}

export default function PriceChangeBadge({ change }: PriceChangeBadgeProps) {
  // 1. Fixed object comparison by checking change.pct instead of change
  if (change.pct > 0) {
    return (
      <span className="rounded-full bg-success/10 px-3 py-1 text-sm font-medium text-success inline-flex items-center gap-1">
        ▲ {toBengaliNumber(change.pct)}%
      </span>
    );
  }

  if (change.pct < 0) {
    return (
      <span className="rounded-full bg-danger/10 px-3 py-1 text-sm font-medium text-danger inline-flex items-center gap-1">
        ▼ {toBengaliNumber(Math.abs(change.pct))}%
      </span>
    );
  }

  return (
    <span className="rounded-full bg-default-100 px-3 py-1 text-sm font-medium text-default-600 inline-flex items-center gap-1">
      — ০.০%
    </span>
  );
}