export type OpportunityType =
  | "hackathon"
  | "bootcamp"
  | "internship"
  | "competition"
  | "program";

export interface Opportunity {
  slug: string;
  title: string;
  organizer: string;
  type: OpportunityType;
  tags: string[];
  deadline: string; // ISO date, Asia/Riyadh
  applyUrl: string;
  description: string; // plain text only
  lastVerifiedAt: string; // ISO date
}
