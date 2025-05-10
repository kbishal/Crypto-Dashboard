import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

export const fetchMarketData = () =>
    axios.get(`${BASE_URL}/coins/markets`, {
        params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 25,
            page: 1,
            sparkline: false,
        },
        headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-7rkUgSRocXBkqFA9syduTkKq' }
    });

export const fetchCoinDetail = (id: string) =>
    axios.get(`${BASE_URL}/coins/${id}`, {
        headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-7rkUgSRocXBkqFA9syduTkKq' }
    });

export const fetchCoinChart = (id: string, days: number = 7) =>
    axios.get(`${BASE_URL}/coins/${id}/market_chart`, {
        params: {
            vs_currency: "usd",
            days,
        },
        headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-7rkUgSRocXBkqFA9syduTkKq' }
    });
