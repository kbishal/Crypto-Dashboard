import { Link } from "react-router-dom";

interface CoinCardProps {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  image: string;
}

const CoinCard: React.FC<CoinCardProps> = ({
  id,
  name,
  symbol,
  current_price,
  market_cap,
  price_change_percentage_24h,
  image,
}) => {
  return (
    <Link
      to={`/coin/${id}`}
      className="bg-white border rounded-2xl shadow-sm p-4 hover:shadow-lg transition-all"
    >
      <div className="flex items-center gap-4">
        <img src={image} alt={name} className="w-10 h-10 rounded-full" />
        <div className="flex-1">
          <h2 className="text-lg font-semibold">
            {name} ({symbol.toUpperCase()})
          </h2>
          <p className="text-sm text-gray-700">💲 {current_price.toLocaleString()}</p>
          <p className="text-sm text-gray-500">
            Market Cap: {market_cap.toLocaleString()}
          </p>
          <p
            className={`text-sm ${
              price_change_percentage_24h >= 0
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            24h: {price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CoinCard;
