import { useEffect, useState } from "react";
import axios from "axios";
import CoinRow from "../../components/CoinRow/CoinRow";
import Loader from "../../components/Loader/Loader";

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

type SortKey = keyof Pick<Coin, 'name' | 'current_price' | 'price_change_percentage_24h' | 'total_volume' | 'market_cap'>;
type SortOrder = 'asc' | 'desc' | null;

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
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  const itemsPerPage = 10;
  const TOTAL_NUM_OF_COINS = 100;

  useEffect(() => {
    setIsLoading(true);
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
      .catch((err) => console.error("Error fetching coins", err))
      .finally(() => setIsLoading(false))
  }, [currentPage]);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const sortedCoins = [...filteredCoins].sort((a, b) => {
    if (!sortKey || !sortOrder) return 0;
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    return sortOrder === "asc"
      ? Number(aValue) - Number(bValue)
      : Number(bValue) - Number(aValue);
  });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(prev => (prev === "asc" ? "desc" : prev === "desc" ? null : "asc"));
      if (sortOrder === "desc") setSortKey(null); // reset to default
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const totalPages = Math.ceil(TOTAL_NUM_OF_COINS / itemsPerPage);
  const getSortIcon = (key: SortKey) => {
    if (sortKey !== key) return "⇅";
    return sortOrder === "asc" ? "↑" : sortOrder === "desc" ? "↓" : "⇅";
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white px-6 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Crypto Dashboard</h1>
      <input
        type="text"
        placeholder="Search by name or symbol"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="block w-full max-w-md mx-auto mb-6 px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
      />

      <div className="overflow-x-auto shadow-lg rounded-lg">
        {isLoading ? (<div className="h-screen flex items-center justify-center"><Loader/></div>)
          : (<table className="w-full table-auto text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                <th className="py-3 px-4 text-left cursor-pointer" onClick={() => toggleSort("name")}>Name {getSortIcon("name")}</th>
                <th className="py-3 px-4 text-left cursor-pointer" onClick={() => toggleSort("current_price")}>Price {getSortIcon("current_price")}</th>
                <th className="py-3 px-4 text-left hidden sm:table-cell cursor-pointer" onClick={() => toggleSort("price_change_percentage_24h")}>24h {getSortIcon("price_change_percentage_24h")}</th>
                <th className="py-3 px-4 text-left cursor-pointer" onClick={() => toggleSort("total_volume")}>24h Volume {getSortIcon("total_volume")}</th>
                <th className="py-3 px-4 text-left hidden sm:table-cell cursor-pointer" onClick={() => toggleSort("market_cap")}>Market Cap {getSortIcon("market_cap")}</th>
              </tr>
            </thead>
            <tbody>
              {sortedCoins.map((coin) => (
                <CoinRow key={coin.id} {...coin} />
              ))}
            </tbody>
          </table>)}
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center flex-wrap gap-2 mt-6">
        {/* Previous Button */}
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded text-sm font-medium bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-40"
        >
          Prev
        </button>

        {/* Numbered Buttons with Ellipses */}
        {getPaginationButtons(currentPage, totalPages).map((item, index) =>
          typeof item === "number" ? (
            <button
              key={index}
              onClick={() => setCurrentPage(item)}
          className={`px-3 py-1 rounded text-sm font-medium ${
            currentPage === item
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-black dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
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
          className="px-3 py-1 rounded text-sm font-medium bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>

  );
}

export default Dashboard;
