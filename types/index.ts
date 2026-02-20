export type SearchResult = {
  id: string;
  englishName: string;
  arabicName: string;
  store: string;
  price: string;
  directLink: string;
  status: "VERIFIED" | "PENDING" | "FAILED";
  similarity: number;
};
