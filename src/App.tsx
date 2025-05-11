import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import CoinDetail from "./pages/CoinDetail/CoinDetail";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen transition-colors duration-300 relative">
      {/* Floating Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 z-50 px-3 py-2 text-sm rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:opacity-80 transition flex items-center gap-2"
      >
        {/* Icon always visible */}
        {theme === "dark" ? "☀️" : "🌙"}

        {/* Text only on small screens and up */}
        <span className="hidden sm:inline">
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </span>
      </button>


      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/coin/:id" element={<CoinDetail />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;