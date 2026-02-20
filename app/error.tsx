'use client';

export default function Error({ reset }: { reset: () => void }): JSX.Element {
  return (
    <div className="space-y-4 p-4">
      <p>Something went wrong.</p>
      <button type="button" className="rounded bg-slate-900 px-3 py-2 text-white" onClick={reset}>
        Retry
      </button>
    </div>
  );
}
