import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "../src/pages/Dashboard/Dashboard";
import axios from "axios";

// Mocks
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
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "eth",
    image: "https://dummyimage.com/eth",
    current_price: 4000,
    market_cap: 500000000,
    total_volume: 25000000,
    price_change_percentage_24h: -1.2,
  },
];

// Tests
describe.skip("Dashboard", () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
    mockedAxios.get.mockResolvedValue({ data: mockCoins });
  });

  it("renders title and search input", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    expect(screen.getByText(/crypto dashboard/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it("renders coins after API call", async () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/bitcoin/i)).toBeInTheDocument();
      expect(screen.getByText(/ethereum/i)).toBeInTheDocument();
    });
  });

  it("filters coins by search input", async () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/bitcoin/i)).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: "bit" } });

    expect(screen.getByText(/bitcoin/i)).toBeInTheDocument();
    expect(screen.queryByText(/ethereum/i)).not.toBeInTheDocument();
  });

  it("shows no results if search doesn't match", async () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/bitcoin/i)).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: "dogecoin" } });

    expect(screen.queryByText(/bitcoin/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/ethereum/i)).not.toBeInTheDocument();
  });

  it("handles pagination click", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockCoins });
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/bitcoin/i)).toBeInTheDocument();
    });

    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeInTheDocument();
    fireEvent.click(nextButton);

    // Expect 2 Axios call triggered
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
  });
});
