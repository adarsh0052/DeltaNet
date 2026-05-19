export interface MarketItem {
    id: number;
    title: string;
    body: string;
  }
  
  export interface MarketState {
    items: MarketItem[];
    page: number;
    loading: boolean;
    error: string | null;
    searchQuery: string;
  }