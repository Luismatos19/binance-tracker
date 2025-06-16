import { vi, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import WatchlistManager from "./WatchlistManager";
import { useMarketStore } from "../store/useMarketStore";

describe("WatchlistManager", () => {
  beforeEach(() => {
    useMarketStore.setState({
      watchlists: [],
      activeList: null,
      createWatchlist: vi.fn(),
      selectWatchlist: vi.fn(),
    });
  });

  it("should create a new watchlist", () => {
    const create = vi.fn();
    useMarketStore.setState({ createWatchlist: create });

    render(<WatchlistManager />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Day Trade" } });
    fireEvent.click(screen.getByRole("button", { name: /criar/i }));

    expect(create).toHaveBeenCalledWith("Day Trade");
  });

  it("should select an existing watchlist", () => {
    const select = vi.fn();
    useMarketStore.setState({
      watchlists: [{ name: "Favorita", symbols: [] }],
      activeList: null,
      selectWatchlist: select,
    });

    render(<WatchlistManager />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Favorita" },
    });

    expect(select).toHaveBeenCalledWith("Favorita");
  });
});
