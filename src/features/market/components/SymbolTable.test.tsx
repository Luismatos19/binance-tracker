import { vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SymbolTable from "./SymbolTable";
import { useMarketStore } from "../store/useMarketStore";

vi.mock("../hooks/useMarketSocket", () => ({
  useMarketSocket: () => {},
}));

describe("SymbolTable", () => {
  beforeEach(() => {
    useMarketStore.setState({
      watchlists: [{ name: "Favorita", symbols: ["btcusdt"] }],
      activeList: "Favorita",
      tickers: {
        btcusdt: {
          symbol: "BTCUSDT",
          lastPrice: "60000",
          priceChangePercent: "2.5",
          bestBid: "59980",
          bestAsk: "60020",
          priceChange: "",
        },
      },
    });
  });

  it("should render the table with ticker data", () => {
    render(<SymbolTable />);
    expect(screen.getByText("BTCUSDT")).toBeInTheDocument();
    expect(screen.getByText("60000")).toBeInTheDocument();
    expect(screen.getByText("2.5%")).toBeInTheDocument();
  });
});
