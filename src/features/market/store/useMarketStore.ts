import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SymbolTicker } from "../models/SymbolTicker";

export interface Watchlist {
  name: string;
  symbols: string[];
}

interface MarketState {
  watchlists: Watchlist[];
  activeList: string | null;
  tickers: Record<string, SymbolTicker>;
  createWatchlist: (name: string) => void;
  selectWatchlist: (name: string) => void;
  addSymbolToActiveList: (symbol: string) => void;
  updateTicker: (symbol: string, data: SymbolTicker) => void;
  removeSymbolFromActiveList: (symbol: string) => void;
}

export const useMarketStore = create<MarketState>()(
  persist(
    (set, get) => ({
      watchlists: [],
      activeList: null,
      tickers: {},
      createWatchlist: (name) => {
        const exists = get().watchlists.some((w) => w.name === name);
        if (exists) return;
        set((state) => ({
          watchlists: [...state.watchlists, { name, symbols: [] }],
          activeList: name,
        }));
      },
      selectWatchlist: (name) => set({ activeList: name }),
      addSymbolToActiveList: (symbol) => {
        const { activeList, watchlists } = get();
        if (!activeList) return;
        set({
          watchlists: watchlists.map((w) =>
            w.name === activeList && !w.symbols.includes(symbol)
              ? { ...w, symbols: [...w.symbols, symbol] }
              : w
          ),
        });
      },
      updateTicker: (symbol, data) => {
        set((state) => ({
          tickers: { ...state.tickers, [symbol]: data },
        }));
      },
      removeSymbolFromActiveList: (symbol) => {
        const { activeList, watchlists } = get();
        if (!activeList) return;
        set({
          watchlists: watchlists.map((w) =>
            w.name === activeList
              ? { ...w, symbols: w.symbols.filter((s) => s !== symbol) }
              : w
          ),
        });
      },
    }),
    {
      name: "market-storage",
      partialize: (state) => ({
        watchlists: state.watchlists,
        activeList: state.activeList,
      }),
    }
  )
);
