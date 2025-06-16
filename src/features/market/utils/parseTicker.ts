import type { SymbolTicker } from "../models/SymbolTicker";

export function parseTicker(data: any): SymbolTicker {
  return {
    symbol: data.s,
    lastPrice: data.c,
    priceChange: data.p,
    priceChangePercent: data.P,
    bestBid: data.b,
    bestAsk: data.a,
  };
}
