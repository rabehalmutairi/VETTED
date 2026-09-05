type Profile = {
  display_name: string;
  university: string;
  field: string;
  graduation_year: number;
  skills: string[];
  bio: string;
};

export function ProfileView({ profile }: { profile: Profile }) {
  return (
    <div className="mx-auto max-w-sm px-4 py-12">
      <h1 className="text-xl font-semibold text-ink">{profile.display_name}</h1>
      <p className="mt-1 text-sm font-mono text-muted">
        {profile.university} &middot; {profile.field} &middot; {profile.graduation_year}
      </p>

      {profile.skills.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <span
              key={skill}
              className="border border-hairline px-2 py-1 text-sm font-mono text-muted"
            >
              {skill}
            </span>
          ))}
        </div>
      ) : null}

      {profile.bio ? (
        <p className="mt-6 text-base text-ink whitespace-pre-line">{profile.bio}</p>
      ) : null}
    </div>
  );
}
