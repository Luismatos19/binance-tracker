/// <reference types="vitest" />
import { vi, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MarketPage from "./MarketPage";
import { useMarketStore } from "./store/useMarketStore";

vi.mock("./components/WatchlistManager", () => ({
  default: () => <div data-testid="watchlist-manager">WatchlistManager</div>,
}));
vi.mock("./components/SymbolSelector", () => ({
  default: () => (
    <select data-testid="symbol-selector">
      <option>BTCUSDT</option>
    </select>
  ),
}));
vi.mock("./components/SymbolTable", () => ({
  default: () => <div data-testid="symbol-table">SymbolTable</div>,
}));

describe("MarketPage", () => {
  beforeEach(() => {
    useMarketStore.setState({
      watchlists: [{ name: "Favoritos", symbols: ["btcusdt", "ethusdt"] }],
      activeList: "Favoritos",
      removeSymbolFromActiveList: vi.fn(),
    });
  });

  it("should display title and main components", () => {
    render(<MarketPage />);
    expect(screen.getByText("Binance Watchlist")).toBeInTheDocument();
    expect(screen.getByTestId("watchlist-manager")).toBeInTheDocument();
    expect(screen.getByTestId("symbol-selector")).toBeInTheDocument();
    expect(screen.getByTestId("symbol-table")).toBeInTheDocument();
  });

  it("should display list of added symbols", () => {
    render(<MarketPage />);
    expect(screen.getByText("btcusdt")).toBeInTheDocument();
    expect(screen.getByText("ethusdt")).toBeInTheDocument();
  });

  it("should remove symbol when checkbox is unchecked", () => {
    const remover = vi.fn();
    useMarketStore.setState({
      removeSymbolFromActiveList: remover,
      watchlists: [{ name: "Favoritos", symbols: ["btcusdt"] }],
      activeList: "Favoritos",
    });

    render(<MarketPage />);
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(remover).toHaveBeenCalledWith("btcusdt");
  });
});
