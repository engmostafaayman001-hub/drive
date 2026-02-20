import { SearchStatus } from '@prisma/client';

export type ResultRow = {
  id: string;
  englishName: string;
  arabicName: string;
  store: string;
  price: string;
  directLink: string;
  status: SearchStatus;
};
