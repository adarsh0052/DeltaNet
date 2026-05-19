import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export interface CryptoCoin {
  coin_id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  last_updated: string;
}

export const fetchCryptoMarketData = async (page: number = 1): Promise<CryptoCoin[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 20, // 20 items per load to satisfy "Large List" requirement
        page: page,
        sparkline: false,
      },
    });

    return response.data.map((coin: any) => ({
      coin_id: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      last_updated: new Date().toISOString(),
    }));
  } catch (error: any) {
    console.error('API Fetch Error:', error.message);
    throw error;
  }
};