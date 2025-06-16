import { useEffect, useRef } from "react";
import { fetchAvailableSymbols } from "../services/binanceService";
import { parseTicker } from "../utils/parseTicker";
import { useMarketStore } from "../store/useMarketStore";

export function useMarketSocket(symbols: string[]) {
  const updateTicker = useMarketStore((s) => s.updateTicker);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let validSymbols: string[] = [];
    let ws: WebSocket;

    const connect = async () => {
      const allSymbols = await fetchAvailableSymbols();
      validSymbols = symbols.filter((s) => allSymbols.includes(s));
      if (validSymbols.length === 0) return;

      const stream = validSymbols.map((s) => `${s}@ticker`).join("/");
      const url = `wss://stream.binance.com:9443/stream?streams=${stream}`;
      ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onmessage = (e) => {
        const message = JSON.parse(e.data);
        const data = message.data;
        updateTicker(data.s.toLowerCase(), parseTicker(data));
      };
    };

    connect();

    return () => ws?.close();
  }, [symbols]);
}
