import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CoinDetail from "./pages/CoinDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/coin/:id" element={<CoinDetail />} />
      </Routes>
    </Router>
  );
}

export default App;