import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { useNavigate } from "react-router-dom";


interface CoinData {
  name: string;
  symbol: string;
  market_data: {
    current_price: { usd: number };
    price_change_percentage_24h: number;
  };
  image: { large: string };
  description: { en: string };
}

const CoinDetail = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState<CoinData | null>(null);
  const [chartData, setChartData] = useState<{ time: string; price: number }[]>([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then(res => setCoin(res.data))
      .catch(err => console.error("Coin fetch error", err));

    axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
      params: { vs_currency: "usd", days: 1 }
    })
      .then(res => {
        const formatted = res.data.prices.map((p: [number, number]) => ({
          time: new Date(p[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          price: p[1]
        }));
        setChartData(formatted);
      })
      .catch(err => console.error("Chart fetch error", err));
  }, [id]);

  if (!coin) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white px-6 py-10">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-4 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        ← Back to Dashboard
      </button>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <img src={coin.image.large} alt={coin.name} className="w-12 h-12 object-contain" />
        <h1 className="text-3xl font-bold">
          {coin.name} Price ({coin.symbol.toUpperCase()})
        </h1>
        <span className="ml-2 bg-yellow-500 text-xs font-bold px-2 py-1 rounded">HOT</span>
      </div>

      {/* Price summary */}
      <div className="mb-8 text-lg">
        <span className="text-gray-700 dark:text-gray-300">
          1 {coin.symbol.toUpperCase()} ={" "}
        </span>
        <span className="font-semibold text-xl text-black dark:text-white">
          ${coin.market_data.current_price.usd.toLocaleString()}
        </span>
        <span
          className={`ml-2 font-medium ${coin.market_data.price_change_percentage_24h >= 0
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
            }`}
        >
          {coin.market_data.price_change_percentage_24h.toFixed(2)}%
        </span>
      </div>

      {/* Chart */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="time" stroke="#888" />
            <YAxis stroke="#888" domain={["auto", "auto"]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                color: "#fff",
              }}
              labelStyle={{ color: "#ccc" }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#facc15"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* About Section */}
      <div className="mt-10 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">About {coin.name}</h2>
        <p
          className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: coin.description.en || "No description available.",
          }}
        />
      </div>
    </div>
  );
};

export default CoinDetail;
