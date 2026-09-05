import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { apiUrl } from "@/lib/api";
import { ProfileForm } from "@/components/ProfileForm";
import { ProfileView } from "@/components/ProfileView";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const res = await fetch(apiUrl("/api/profiles/me"), {
    headers: { Authorization: `Bearer ${session!.access_token}` },
    cache: "no-store",
  });

  if (res.ok) {
    const profile = await res.json();
    return <ProfileView profile={profile} />;
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-12">
      <h1 className="text-xl font-semibold text-ink">Create your profile</h1>
      <ProfileForm />
    </div>
  );
}
