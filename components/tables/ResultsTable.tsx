"use client";

import { useLanguage } from "@/components/ui/language-provider";
import { SearchResult } from "@/types";

type Props = {
  loading: boolean;
  error: string | null;
  results: SearchResult[];
};

const statusClasses: Record<SearchResult["status"], string> = {
  VERIFIED: "text-green-600",
  PENDING: "text-yellow-500",
  FAILED: "text-red-600"
};

export default function ResultsTable({ loading, error, results }: Props): JSX.Element {
  const { t } = useLanguage();

  if (loading) {
    return <p>{t.loading}</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!results.length) {
    return <p>{t.empty}</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100 dark:bg-slate-800">
          <tr>
            <th className="px-3 py-2 text-start">{t.englishName}</th>
            <th className="px-3 py-2 text-start">{t.arabicName}</th>
            <th className="px-3 py-2 text-start">{t.store}</th>
            <th className="px-3 py-2 text-start">{t.price}</th>
            <th className="px-3 py-2 text-start">{t.directLink}</th>
            <th className="px-3 py-2 text-start">{t.status}</th>
          </tr>
        </thead>
        <tbody>
          {results.map((row) => (
            <tr key={row.id} className="border-t border-slate-200 dark:border-slate-700">
              <td className="px-3 py-2">{row.englishName}</td>
              <td className="px-3 py-2">{row.arabicName}</td>
              <td className="px-3 py-2">{row.store}</td>
              <td className="px-3 py-2">{row.price}</td>
              <td className="px-3 py-2">
                {row.directLink === "Link not available" ? (
                  row.directLink
                ) : (
                  <a href={row.directLink} target="_blank" rel="noreferrer" className="underline">
                    {row.directLink}
                  </a>
                )}
              </td>
              <td className={`px-3 py-2 font-semibold ${statusClasses[row.status]}`}>{t[row.status.toLowerCase() as "verified" | "pending" | "failed"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
