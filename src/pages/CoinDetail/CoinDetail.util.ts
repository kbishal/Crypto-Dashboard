import { format } from 'd3-format';

export const smartPriceFormatter = (value: number): string => {
  if (value >= 1000) return format("$.2~s")(value).replace(/([kmbtμ])/g, (d) => d.toUpperCase());
  if (value >= 1) return format("$.2f")(value); // two decimals, no scaling
  return `$${value.toFixed(4)}`; // small values fixed precision
};