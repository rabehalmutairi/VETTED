import Link from "next/link";
import { notFound } from "next/navigation";
import { mockOpportunities } from "@/lib/mock-opportunities";
import { DeadlineChip } from "@/components/DeadlineChip";
import { OutboundLink } from "@/components/OutboundLink";
import { formatDate } from "@/lib/deadline";
import { Opportunity } from "@/lib/types";

const TYPE_LABEL: Record<Opportunity["type"], string> = {
  hackathon: "Hackathon",
  bootcamp: "Bootcamp",
  internship: "Internship",
  competition: "Competition",
  program: "Program",
};

export function generateStaticParams() {
  return mockOpportunities.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const opportunity = mockOpportunities.find((o) => o.slug === slug);
  return { title: opportunity ? opportunity.title : "Not found" };
}

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const opportunity = mockOpportunities.find((o) => o.slug === slug);

  if (!opportunity) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-transform duration-150 hover:underline active:scale-[0.97]"
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 1.5 2 5l4 3.5" />
        </svg>
        All opportunities
      </Link>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold text-foreground">
            {opportunity.title}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {opportunity.organizer} · {TYPE_LABEL[opportunity.type]}
          </p>
        </div>
        <DeadlineChip deadline={opportunity.deadline} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {opportunity.tags.map((tag) => (
          <span
            key={tag}
            className="border border-border px-2 py-1 text-sm text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="mt-6 text-base text-foreground whitespace-pre-line">
        {opportunity.description}
      </p>

      <div className="mt-6 border-t border-border pt-4">
        <OutboundLink
          href={opportunity.applyUrl}
          className="inline-block bg-accent px-4 py-2 text-sm font-semibold text-white transition duration-150 active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent/90"
        >
          Apply
        </OutboundLink>
      </div>

      <p className="mt-6 text-sm text-muted">
        Last verified {formatDate(opportunity.lastVerifiedAt)}
      </p>
    </div>
  );
}
