import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { searchSchema } from "@/lib/validation";

function normalize(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ");
}

function similarityScore(query: string, text: string): number {
  const q = normalize(query);
  const t = normalize(text);
  if (!q || !t) return 0;
  if (t.includes(q)) return q.length / t.length + 1;
  const queryWords = q.split(" ");
  const textWords = new Set(t.split(" "));
  const matches = queryWords.filter((word) => textWords.has(word)).length;
  return matches / Math.max(queryWords.length, 1);
}

function isValidLink(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get("q") ?? "";
  const parsed = searchSchema.safeParse({ q: raw });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  }

  const normalized = normalize(parsed.data.q);

  const rows = await prisma.batchResult.findMany({
    where: {
      OR: [
        { englishName: { contains: normalized, mode: "insensitive" } },
        { arabicName: { contains: normalized, mode: "insensitive" } },
        { store: { contains: normalized, mode: "insensitive" } }
      ]
    }
  });

  const results = rows
    .map((row) => {
      const fullText = `${row.englishName} ${row.arabicName} ${row.store}`;
      const similarity = similarityScore(normalized, fullText);
      const completeness = [row.englishName, row.arabicName, row.store, row.directLink].filter(Boolean).length;
      return {
        id: row.id,
        englishName: row.englishName,
        arabicName: row.arabicName,
        store: row.store,
        price: row.price.toString(),
        directLink: isValidLink(row.directLink) ? row.directLink : "Link not available",
        status: row.status,
        similarity,
        completeness
      };
    })
    .sort((a, b) => {
      if (b.similarity !== a.similarity) return b.similarity - a.similarity;
      return b.completeness - a.completeness;
    })
    .map(({ completeness, ...rest }) => rest);

  return NextResponse.json({ results });
}
