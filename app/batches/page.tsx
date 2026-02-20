import { prisma } from '@/lib/prisma';

export default async function BatchesPage(): Promise<JSX.Element> {
  const total = await prisma.batchResult.count();

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Batches</h2>
      <p className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">Total indexed rows: {total}</p>
    </section>
  );
}
