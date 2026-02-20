import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { normalizeSearchQuery } from '@/lib/i18n';
import { searchSchema } from '@/lib/validation';

function scoreRecord(query: string, values: string[]): number {
  return values.reduce((score, value) => {
    const normalized = normalizeSearchQuery(value);
    if (normalized === query) return score + 100;
    if (normalized.startsWith(query)) return score + 75;
    if (normalized.includes(query)) return score + 50;
    return score;
  }, 0);
}

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const parsed = searchSchema.safeParse({ query: searchParams.get('query') ?? '' });

  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid search query' }, { status: 400 });
  }

  const query = normalizeSearchQuery(parsed.data.query);

  const rows = await prisma.batchResult.findMany({
    where: {
      OR: [
        { englishName: { contains: query, mode: 'insensitive' } },
        { arabicName: { contains: query, mode: 'insensitive' } },
        { store: { contains: query, mode: 'insensitive' } }
      ]
    },
    take: 100
  });

  const ranked = rows
    .map((row) => {
      const completeness = [row.englishName, row.arabicName, row.store, row.directLink].filter(Boolean).length;
      const similarity = scoreRecord(query, [row.englishName, row.arabicName, row.store]);
      return { row, similarity, completeness };
    })
    .sort((a, b) => {
      if (b.similarity !== a.similarity) return b.similarity - a.similarity;
      return b.completeness - a.completeness;
    })
    .map(({ row }) => ({
      ...row,
      directLink: row.directLink.startsWith('http') ? row.directLink : 'Link not available',
      price: row.price.toString()
    }));

  return NextResponse.json({ data: ranked });
}
