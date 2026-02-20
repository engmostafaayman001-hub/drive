"use client";

import { FormEvent, useState } from "react";
import { useLanguage } from "@/components/ui/language-provider";
import { SearchResult } from "@/types";

type Props = {
  onResults: (results: SearchResult[]) => void;
  onError: (message: string | null) => void;
  onLoading: (loading: boolean) => void;
};

export default function SearchForm({ onResults, onError, onLoading }: Props): JSX.Element {
  const [query, setQuery] = useState("");
  const { t } = useLanguage();

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    onError(null);
    onLoading(true);

    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      onResults([]);
      onError(t.error);
      onLoading(false);
      return;
    }

    const data = (await response.json()) as { results: SearchResult[] };
    onResults(data.results);
    onLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="mb-4 flex gap-2">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="w-full rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
        placeholder={t.search}
        required
      />
      <button
        type="submit"
        className="rounded-md bg-slate-900 px-4 py-2 text-white dark:bg-slate-100 dark:text-slate-900"
      >
        {t.search}
      </button>
    </form>
  );
}
