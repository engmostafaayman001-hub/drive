"use client";

import { useState } from "react";
import SearchForm from "@/components/forms/SearchForm";
import ResultsTable from "@/components/tables/ResultsTable";
import { SearchResult } from "@/types";

export default function DashboardPage(): JSX.Element {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold">Dashboard</h2>
      <SearchForm onResults={setResults} onError={setError} onLoading={setLoading} />
      <ResultsTable results={results} loading={loading} error={error} />
    </section>
  );
}
