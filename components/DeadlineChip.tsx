import { formatDeadlineLabel, getDeadlineUrgency } from "@/lib/deadline";

interface DeadlineChipProps {
  deadline: string;
}

// Urgency reads through weight and fill, not a second color, per CLAUDE.md's
// one-accent rule — closing-soon fills solid, everything else stays outlined.
export function DeadlineChip({ deadline }: DeadlineChipProps) {
  const urgency = getDeadlineUrgency(deadline);
  const label = formatDeadlineLabel(deadline);

  const styles = {
    open: "border border-accent text-accent",
    "closing-soon": "bg-accent text-white",
    today: "bg-accent text-white",
    closed: "border border-border text-muted",
  }[urgency];

  return (
    <span
      className={`inline-block shrink-0 whitespace-nowrap px-2 py-1 text-sm font-semibold ${styles}`}
    >
      {label}
    </span>
  );
}
