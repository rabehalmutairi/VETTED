"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignInPage() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOtp({ email });

    setPending(false);
    if (error) {
      setError(error.message);
      return;
    }
    setStep("code");
  }

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });

    setPending(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-12">
      <h1 className="text-xl font-semibold text-ink">Sign in</h1>

      {step === "email" ? (
        <form onSubmit={handleSendCode} className="mt-6 flex flex-col gap-3">
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
            {pending ? "Sending..." : "Send code"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode} className="mt-6 flex flex-col gap-3">
          <p className="text-sm text-muted">
            Enter the code sent to <span className="text-ink">{email}</span>
          </p>
          <label className="text-sm font-mono text-muted" htmlFor="code">
            Code
          </label>
          <input
            id="code"
            type="text"
            inputMode="numeric"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border border-hairline bg-surface px-2 py-1 text-sm text-ink font-mono"
            placeholder="123456"
          />
          <button
            type="submit"
            disabled={pending}
            className="bg-accent px-4 py-2 text-sm font-semibold text-ground transition duration-150 active:scale-[0.97] disabled:opacity-50 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent/90"
          >
            {pending ? "Verifying..." : "Verify"}
          </button>
        </form>
      )}

      {error ? (
        <p className="mt-4 border border-hairline bg-surface px-3 py-2 text-sm text-ink">
          {error}
        </p>
      ) : null}
    </div>
  );
}
