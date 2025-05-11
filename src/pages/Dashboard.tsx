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

function getPaginationButtons(current: number, total: number, siblings = 1): (number | string)[] {
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


function Dashboard() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const TOTAL_NUM_OF_COINS = 100;

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: itemsPerPage,
          page: currentPage,
          sparkline: false,
        },
      })
      .then((res) => setCoins(res.data))
      .catch((err) => console.error("Error fetching coins", err));
  }, [currentPage]);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(TOTAL_NUM_OF_COINS / itemsPerPage);

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

      {/* Pagination */}

      <div className="flex justify-end items-center flex-wrap gap-2 mt-6">
        {/* Previous Button */}
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded text-sm font-medium bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-40"
        >
          Prev
        </button>

        {/* Numbered Buttons with Ellipses */}
        {getPaginationButtons(currentPage, totalPages).map((item, index) =>
          typeof item === "number" ? (
            <button
              key={index}
              onClick={() => setCurrentPage(item)}
              className={`px-3 py-1 rounded text-sm font-medium ${currentPage === item
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
            >
              {item}
            </button>
          ) : (
            <span key={index} className="px-2 text-gray-400 select-none">...</span>
          )
        )}

        {/* Next Button */}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded text-sm font-medium bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
