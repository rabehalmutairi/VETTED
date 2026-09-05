"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}

function SignInForm() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const linkError = searchParams.get("error");

  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSendLink(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/confirm` },
    });

    setPending(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-12">
      <h1 className="text-xl font-semibold text-ink">Sign in</h1>

      {sent ? (
        <p className="mt-6 text-sm text-muted">
          Check <span className="text-ink">{email}</span> for a sign-in link.
        </p>
      ) : (
        <form onSubmit={handleSendLink} className="mt-6 flex flex-col gap-3">
          <label className="text-sm font-mono text-muted" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-hairline bg-surface px-2 py-1 text-sm text-ink"
            placeholder="you@example.com"
          />
          <button
            type="submit"
            disabled={pending}
            className="bg-accent px-4 py-2 text-sm font-semibold text-ground transition duration-150 active:scale-[0.97] disabled:opacity-50 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent/90"
          >
            {pending ? "Sending..." : "Send sign-in link"}
          </button>
        </form>
      )}

      {error ? (
        <p className="mt-4 border border-hairline bg-surface px-3 py-2 text-sm text-ink">
          {error}
        </p>
      ) : null}

      {!error && linkError ? (
        <p className="mt-4 border border-hairline bg-surface px-3 py-2 text-sm text-ink">
          That link is invalid or expired. Request a new one below.
        </p>
      ) : null}
    </div>
  );
}
