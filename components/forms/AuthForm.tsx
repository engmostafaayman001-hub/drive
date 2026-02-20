'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

type AuthFormProps = {
  mode: 'login' | 'register';
};

export function AuthForm({ mode }: AuthFormProps): JSX.Element {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const data = (await response.json()) as { message?: string };
      setError(data.message ?? 'Request failed');
      setLoading(false);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  }

  return (
    <form className="space-y-3 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900" onSubmit={handleSubmit}>
      {mode === 'register' && (
        <input name="name" placeholder="Name" required className="w-full rounded-md border px-3 py-2 dark:bg-slate-950" />
      )}
      <input name="email" type="email" placeholder="Email" required className="w-full rounded-md border px-3 py-2 dark:bg-slate-950" />
      <input
        name="password"
        type="password"
        placeholder="Password"
        minLength={8}
        required
        className="w-full rounded-md border px-3 py-2 dark:bg-slate-950"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={loading} className="w-full rounded-md bg-slate-900 px-4 py-2 text-white disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900">
        {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Register'}
      </button>
    </form>
  );
}
