import { mockOpportunities } from "@/lib/mock-opportunities";
import { DiscoverList } from "@/components/DiscoverList";

export default function DiscoverPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <p className="text-base text-muted">
        Verified hackathons, bootcamps, internships, and competitions for
        students in Saudi Arabia.
      </p>

      <div className="mt-6">
        <DiscoverList opportunities={mockOpportunities} />
      </div>
    </div>
  );
}
