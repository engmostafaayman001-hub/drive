import { prisma } from '@/lib/prisma';
import { ResultsTable } from '@/components/tables/ResultsTable';
import { ResultRow } from '@/types';

export default async function DashboardPage(): Promise<JSX.Element> {
  const rows = await prisma.batchResult.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20
  });

  const mapped: ResultRow[] = rows.map((row) => ({
    id: row.id,
    englishName: row.englishName,
    arabicName: row.arabicName,
    store: row.store,
    price: row.price.toString(),
    directLink: row.directLink,
    status: row.status
  }));

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <ResultsTable rows={mapped} />
    </section>
  );
}
