import type { FC } from "react";
import { useNavigate } from "react-router-dom";

interface CoinRowProps {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
}

const CoinRow: FC<CoinRowProps> = ({
  id,
  name,
  symbol,
  image,
  current_price,
  market_cap,
  total_volume,
  price_change_percentage_24h,
}) => {
  const navigate = useNavigate();

  return (
    <tr
      className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
      onClick={() => navigate(`/coin/${id}`)}
    >
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <img
            src={image}
            alt={name}
            className="w-6 h-6 object-contain shrink-0 inline-block"
          />
          <div className="leading-tight">
            <div className="font-medium text-black dark:text-white">{name}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {symbol.toUpperCase()}
            </div>
          </div>
        </div>
      </td>

      <td className="py-3 px-4 text-black dark:text-white">
        ${current_price.toLocaleString()}
      </td>

      <td
        className={`py-3 px-4 hidden sm:table-cell ${price_change_percentage_24h >= 0
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
          }`}
      >
        {price_change_percentage_24h.toFixed(2)}%
      </td>

      <td className="py-3 px-4 text-black dark:text-white">
        ${total_volume.toLocaleString()}
      </td>

      <td className="py-3 px-4 hidden sm:table-cell text-black dark:text-white">
        ${market_cap.toLocaleString()}
      </td>
    </tr>
  );
};

export default CoinRow;
