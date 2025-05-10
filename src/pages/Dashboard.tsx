import { useEffect, useState } from "react";
import axios from "axios";
import CoinRow from "../components/CoinRow";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
}

function Dashboard() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 25,
          page: 1,
          sparkline: false,
        },
      })
      .then((res) => setCoins(res.data))
      .catch((err) => console.error("Error fetching coins", err));
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Crypto Dashboard
      </h1>

      <input
        type="text"
        placeholder="Search by name or symbol"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="block w-full max-w-md mx-auto mb-6 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
      />

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-800 text-gray-400">
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left hidden sm:table-cell">24h</th>
              <th className="py-3 px-4 text-left">24h Volume</th>
              <th className="py-3 px-4 text-left hidden sm:table-cell">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.map((coin) => (
              <CoinRow key={coin.id} {...coin} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
