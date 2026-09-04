import Link from "next/link";
import { Opportunity } from "@/lib/types";
import { DeadlineChip } from "./DeadlineChip";

const TYPE_LABEL: Record<Opportunity["type"], string> = {
  hackathon: "Hackathon",
  bootcamp: "Bootcamp",
  internship: "Internship",
  competition: "Competition",
  program: "Program",
};

export function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <Link
      href={`/opportunities/${opportunity.slug}`}
      className="group block border-b border-border py-4 first:border-t hover:bg-accent-subtle/50 transition-colors duration-150"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-foreground truncate group-hover:underline">
            {opportunity.title}
          </h3>
          <p className="mt-1 text-sm text-muted">
            {opportunity.organizer} · {TYPE_LABEL[opportunity.type]}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {opportunity.tags.map((tag) => (
              <span
                key={tag}
                className="border border-border px-2 py-1 text-sm text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <DeadlineChip deadline={opportunity.deadline} />
      </div>
    </Link>
  );
}
