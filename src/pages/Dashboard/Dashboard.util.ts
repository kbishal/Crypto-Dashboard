export interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
}

export type SortKey = keyof Pick<Coin, 'name' | 'current_price' | 'price_change_percentage_24h' | 'total_volume' | 'market_cap'>;
export type SortOrder = 'asc' | 'desc' | null;

export const ITEMS_PER_PAGE = 10;
// This required as the API does not provide if the current batch is last batch or not
// Hence a assumption that the total no. of coins would be 100 in our case
export const TOTAL_NUM_OF_COINS = 100;

export function getPaginationButtons(current: number, total: number, siblings = 1): (number | string)[] {
  const range: (number | string)[] = [];
  const start = Math.max(2, current - siblings);
  const end = Math.min(total - 1, current + siblings);
  range.push(1);
  if (start > 2) {
    range.push("...");
  }

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  if (end < total - 1) {
    range.push("...");
  }

  if (total > 1) {
    range.push(total);
  }

  return range;
}
