"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? "")
    };

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      setError("Invalid credentials");
      return;
    }

    router.replace("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-md space-y-3">
      <h2 className="text-xl font-semibold">Login</h2>
      <input name="email" type="email" required className="w-full rounded border px-3 py-2" placeholder="Email" />
      <input name="password" type="password" required className="w-full rounded border px-3 py-2" placeholder="Password" />
      {error ? <p className="text-red-600">{error}</p> : null}
      <button type="submit" className="rounded bg-slate-900 px-4 py-2 text-white">Sign In</button>
    </form>
  );
}
