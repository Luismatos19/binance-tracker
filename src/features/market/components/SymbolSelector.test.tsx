/// <reference types="vitest" />
import { vi, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import SymbolSelector from "./SymbolSelector";
import { useMarketStore } from "../store/useMarketStore";

vi.mock("../services/binanceService", () => ({
  fetchAvailableSymbols: () => Promise.resolve(["btcusdt", "ethusdt"]),
}));

describe("SymbolSelector", () => {
  beforeEach(() => {
    useMarketStore.setState({
      activeList: "Minha Lista",
      addSymbolToActiveList: vi.fn(),
    });
  });

  it("should load and show symblos options", async () => {
    render(<SymbolSelector />);
    expect(await screen.findByText("btcusdt")).toBeInTheDocument();
    expect(screen.getByText("ethusdt")).toBeInTheDocument();
  });

  it("should add symblos when selected", async () => {
    const add = vi.fn();
    useMarketStore.setState({
      activeList: "Minha Lista",
      addSymbolToActiveList: add,
    });

    render(<SymbolSelector />);
    fireEvent.change(await screen.findByRole("combobox"), {
      target: { value: "ethusdt" },
    });

    expect(add).toHaveBeenCalledWith("ethusdt");
  });
});
