import { ResultRow } from '@/types';

function getStatusClass(status: ResultRow['status']): string {
  if (status === 'VERIFIED') return 'bg-green-100 text-green-700';
  if (status === 'PENDING') return 'bg-yellow-100 text-yellow-700';
  return 'bg-red-100 text-red-700';
}

export function ResultsTable({ rows }: { rows: ResultRow[] }): JSX.Element {
  if (!rows.length) {
    return <p className="rounded-md border border-dashed p-8 text-center">No data available</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100 dark:bg-slate-800">
          <tr>
            <th className="px-3 py-2 text-start">English Name</th>
            <th className="px-3 py-2 text-start">Arabic Name</th>
            <th className="px-3 py-2 text-start">Store</th>
            <th className="px-3 py-2 text-start">Price</th>
            <th className="px-3 py-2 text-start">Direct Link</th>
            <th className="px-3 py-2 text-start">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-slate-200 dark:border-slate-800">
              <td className="px-3 py-2">{row.englishName}</td>
              <td className="px-3 py-2">{row.arabicName}</td>
              <td className="px-3 py-2">{row.store}</td>
              <td className="px-3 py-2">{row.price}</td>
              <td className="px-3 py-2">
                {row.directLink.startsWith('http') ? (
                  <a className="text-blue-600 hover:underline" href={row.directLink} target="_blank" rel="noreferrer">
                    Open
                  </a>
                ) : (
                  'Link not available'
                )}
              </td>
              <td className="px-3 py-2">
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusClass(row.status)}`}>{row.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
