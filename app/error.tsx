"use client";

export default function ErrorPage({ reset }: { reset: () => void }): JSX.Element {
  return (
    <div className="space-y-2 p-6">
      <p>Something went wrong.</p>
      <button onClick={reset} className="rounded bg-slate-900 px-3 py-2 text-white">
        Retry
      </button>
    </div>
  );
}
