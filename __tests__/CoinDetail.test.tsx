import '@testing-library/jest-dom';
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CoinDetail from "../src/pages/CoinDetail/CoinDetail";
import axios from "axios";

// Mocks
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock('d3-format', () => ({
  format: () => (value: number) => `$${value}`,
}));

const mockCoinData = {
  id: "bitcoin",
  name: "Bitcoin",
  symbol: "btc",
  image: { large: "https://dummyimage.com/btc" },
  description: { en: "Bitcoin is a cryptocurrency." },
  market_data: {
    current_price: { usd: 50000 },
    price_change_percentage_24h: 2.5,
  },
};

const mockChartData = {
  prices: [
    [1670000000000, 48000],
    [1670003600000, 48500],
    [1670007200000, 50000],
  ],
};

// Tests
describe("CoinDetail Page", () => {
  beforeEach(() => {
    mockedAxios.get.mockImplementation((url) => {
      if (url.includes("/market_chart")) {
        return Promise.resolve({ data: mockChartData });
      } else {
        return Promise.resolve({ data: mockCoinData });
      }
    });
  });

  it("renders coin name, price, and chart", async () => {
    render(
      <MemoryRouter initialEntries={["/coin/bitcoin"]}>
        <Routes>
          <Route path="/coin/:id" element={<CoinDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Bitcoin Price/i)).toBeInTheDocument();
      expect(screen.getByText(/Bitcoin is a cryptocurrency/i)).toBeInTheDocument();
      expect(screen.getByText(/\$50,000/)).toBeInTheDocument();
    });
  });

  it("displays positive price change in green", async () => {
    render(
      <MemoryRouter initialEntries={["/coin/bitcoin"]}>
        <Routes>
          <Route path="/coin/:id" element={<CoinDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const change = screen.getByText("2.50%");
      expect(change).toHaveClass("text-green-600", { exact: false });
    });
  });
});
