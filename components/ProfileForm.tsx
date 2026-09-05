"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { apiUrl } from "@/lib/api";
import { FIELDS, SKILLS, UNIVERSITIES } from "@/lib/curated-lists";

export function ProfileForm() {
  const router = useRouter();
  const supabase = createClient();

  const [displayName, setDisplayName] = useState("");
  const [university, setUniversity] = useState<string>(UNIVERSITIES[0]);
  const [field, setField] = useState<string>(FIELDS[0]);
  const [graduationYear, setGraduationYear] = useState(2027);
  const [skills, setSkills] = useState<string[]>([]);
  const [bio, setBio] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function toggleSkill(skill: string) {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setError("Your session expired. Sign in again.");
      setPending(false);
      return;
    }

    const res = await fetch(apiUrl("/api/profiles"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        display_name: displayName,
        university,
        field,
        graduation_year: graduationYear,
        skills,
        bio,
      }),
    });

    setPending(false);
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      setError(body?.detail?.[0]?.msg ?? body?.detail ?? "Could not create profile.");
      return;
    }

    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-mono text-muted" htmlFor="display_name">
          Display name
        </label>
        <input
          id="display_name"
          required
          maxLength={100}
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="border border-hairline bg-surface px-2 py-1 text-sm text-ink"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-mono text-muted" htmlFor="university">
          University
        </label>
        <select
          id="university"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
          className="border border-hairline bg-surface px-2 py-1 text-sm text-ink font-mono"
        >
          {UNIVERSITIES.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-mono text-muted" htmlFor="field">
          Field
        </label>
        <select
          id="field"
          value={field}
          onChange={(e) => setField(e.target.value)}
          className="border border-hairline bg-surface px-2 py-1 text-sm text-ink font-mono"
        >
          {FIELDS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-mono text-muted" htmlFor="graduation_year">
          Graduation year
        </label>
        <input
          id="graduation_year"
          type="number"
          min={2015}
          max={2035}
          required
          value={graduationYear}
          onChange={(e) => setGraduationYear(Number(e.target.value))}
          className="border border-hairline bg-surface px-2 py-1 text-sm text-ink font-mono"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-mono text-muted">Skills</span>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((skill) => {
            const active = skills.includes(skill);
            return (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`px-2 py-1 text-sm font-mono transition duration-150 active:scale-[0.97] ${
                  active
                    ? "bg-accent text-ground"
                    : "border border-hairline text-muted [@media(hover:hover)_and_(pointer:fine)]:hover:border-hairline-lit"
                }`}
              >
                {skill}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <label className="text-sm font-mono text-muted" htmlFor="bio">
            Bio
          </label>
          <span className="text-sm font-mono text-muted">{bio.length}/280</span>
        </div>
        <textarea
          id="bio"
          maxLength={280}
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="border border-hairline bg-surface px-2 py-1 text-sm text-ink"
          placeholder="No contact info — email, phone, or social handles will be rejected."
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="bg-accent px-4 py-2 text-sm font-semibold text-ground transition duration-150 active:scale-[0.97] disabled:opacity-50 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent/90"
      >
        {pending ? "Saving..." : "Create profile"}
      </button>

      {error ? (
        <p className="border border-hairline bg-surface px-3 py-2 text-sm text-ink">
          {error}
        </p>
      ) : null}
    </form>
  );
}
