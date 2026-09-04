"use client";

import { useMemo, useState } from "react";
import { Opportunity, OpportunityType } from "@/lib/types";
import { OpportunityCard } from "./OpportunityCard";

const TYPE_FILTERS: { value: OpportunityType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "hackathon", label: "Hackathons" },
  { value: "bootcamp", label: "Bootcamps" },
  { value: "internship", label: "Internships" },
  { value: "competition", label: "Competitions" },
  { value: "program", label: "Programs" },
];

type SortOrder = "closing-soon" | "recently-added";

export function DiscoverList({ opportunities }: { opportunities: Opportunity[] }) {
  const [typeFilter, setTypeFilter] = useState<OpportunityType | "all">("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("closing-soon");

  const visible = useMemo(() => {
    const filtered =
      typeFilter === "all"
        ? opportunities
        : opportunities.filter((o) => o.type === typeFilter);

    return [...filtered].sort((a, b) =>
      sortOrder === "closing-soon"
        ? a.deadline.localeCompare(b.deadline)
        : b.lastVerifiedAt.localeCompare(a.lastVerifiedAt)
    );
  }, [opportunities, typeFilter, sortOrder]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {TYPE_FILTERS.map((filter) => {
            const active = filter.value === typeFilter;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setTypeFilter(filter.value)}
                className={`px-2 py-1 text-sm font-semibold transition duration-150 active:scale-[0.97] ${
                  active
                    ? "bg-accent text-white"
                    : "border border-border text-foreground [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <label className="flex items-center gap-2 text-sm text-muted">
          Sort
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            className="border border-border px-2 py-1 text-sm text-foreground"
          >
            <option value="closing-soon">Closing soon</option>
            <option value="recently-added">Recently verified</option>
          </select>
        </label>
      </div>

      <div className="mt-4">
        {visible.length === 0 ? (
          <div className="border border-border px-4 py-8 text-center">
            <p className="text-base font-semibold text-foreground">
              No open listings match this filter
            </p>
            <button
              type="button"
              onClick={() => setTypeFilter("all")}
              className="mt-2 text-sm font-semibold text-accent transition-transform duration-150 hover:underline active:scale-[0.97]"
            >
              Clear filter
            </button>
          </div>
        ) : (
          visible.map((opportunity) => (
            <OpportunityCard key={opportunity.slug} opportunity={opportunity} />
          ))
        )}
      </div>
    </div>
  );
}
