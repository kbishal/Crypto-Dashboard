import axios from "axios";

const API_BASE = "https://api.coingecko.com/api/v3";

export const fetchCoins = (page = 1, perPage = 10) => {
    return axios.get(`${API_BASE}/coins/markets`, {
        params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: perPage,
            page,
            sparkline: false,
        },
    });
};

export const fetchCoinDetail = (id: string) => {
    return axios.get(`${API_BASE}/coins/${id}`);
};

export const fetchMarketChart = (id: string, days: number) => {
    return axios.get(`${API_BASE}/coins/${id}/market_chart`, {
        params: {
            vs_currency: "usd",
            days,
        },
    });
};
