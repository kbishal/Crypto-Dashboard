import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // ✅ Import this
import Dashboard from "../src/pages/Dashboard/Dashboard";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockCoins = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "btc",
    image: "https://dummyimage.com/btc",
    current_price: 50000,
    market_cap: 1000000000,
    total_volume: 50000000,
    price_change_percentage_24h: 2.5,
  },
];

describe("Dashboard", () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: mockCoins });
  });

  it("renders and displays coin data", async () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/Search by name or symbol/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/bitcoin/i)).toBeInTheDocument();
    });
  });
});
