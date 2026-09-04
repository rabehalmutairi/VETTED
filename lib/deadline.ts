export type DeadlineUrgency = "open" | "closing-soon" | "today" | "closed";

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const CLOSING_SOON_THRESHOLD_DAYS = 7;

function daysUntil(deadline: string, now: Date): number {
  const deadlineUtc = Date.parse(`${deadline}T00:00:00Z`);
  const todayUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.round((deadlineUtc - todayUtc) / MS_PER_DAY);
}

export function getDeadlineUrgency(deadline: string, now: Date = new Date()): DeadlineUrgency {
  const days = daysUntil(deadline, now);
  if (days < 0) return "closed";
  if (days === 0) return "today";
  if (days <= CLOSING_SOON_THRESHOLD_DAYS) return "closing-soon";
  return "open";
}

export function formatDeadlineLabel(deadline: string, now: Date = new Date()): string {
  const days = daysUntil(deadline, now);
  if (days < 0) return "Closed";
  if (days === 0) return "Closes today";
  if (days === 1) return "Closes tomorrow";
  if (days <= CLOSING_SOON_THRESHOLD_DAYS) return `Closes in ${days} days`;

  return `Closes ${new Date(`${deadline}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })}`;
}

export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
