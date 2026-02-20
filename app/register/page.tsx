"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage(): JSX.Element {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? "")
    };

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      setError("Unable to register");
      return;
    }

    router.replace("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-md space-y-3">
      <h2 className="text-xl font-semibold">Register</h2>
      <input name="name" required className="w-full rounded border px-3 py-2" placeholder="Name" />
      <input name="email" type="email" required className="w-full rounded border px-3 py-2" placeholder="Email" />
      <input name="password" type="password" required className="w-full rounded border px-3 py-2" placeholder="Password" />
      {error ? <p className="text-red-600">{error}</p> : null}
      <button type="submit" className="rounded bg-slate-900 px-4 py-2 text-white">Create Account</button>
    </form>
  );
}
