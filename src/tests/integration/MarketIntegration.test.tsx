/// <reference types="vitest" />
import { vi, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

vi.mock("../features/market/services/binanceService", () => ({
  fetchAvailableSymbols: () => Promise.resolve(["btcusdt", "ethusdt"]),
}));
vi.stubGlobal(
  "WebSocket",
  vi.fn(() => {
    const mockSocket = {
      send: vi.fn(),
      close: vi.fn(),
      onmessage: undefined as ((e: MessageEvent) => void) | undefined,
      readyState: 1,
      binaryType: "blob",
    };

    // simula uma mensagem após delay
    setTimeout(() => {
      mockSocket.onmessage?.({
        data: JSON.stringify({
          data: {
            s: "BTCUSDT",
            c: "62000",
            P: "3.5",
            b: "61980",
            a: "62020",
          },
        }),
      } as MessageEvent);
    }, 30);

    return mockSocket;
  }) as unknown as typeof WebSocket
);

import "../../features/market/utils/parseTicker";
import { useMarketStore } from "../../features/market/store/useMarketStore";
import MarketPage from "../../features/market/MarketPage";

describe("Integration MarketPage end-to-end", () => {
  beforeEach(() => {
    useMarketStore.setState({
      watchlists: [],
      activeList: null,
    });
  });

  it("should create a new watchlist, add a symbol, and render it in the table", async () => {
    render(<MarketPage />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Minhas Ações" },
    });
    fireEvent.click(screen.getByRole("button", { name: /criar/i }));

    await waitFor(() => {
      expect(screen.getByText("btcusdt")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByRole("combobox", { name: /selecionar símbolo/i })
      ).toBeInTheDocument();
    });

    fireEvent.change(
      screen.getByRole("combobox", { name: /selecionar símbolo/i }),
      {
        target: { value: "btcusdt" },
      }
    );

    await waitFor(() => {
      expect(screen.getByText("BTCUSDT")).toBeInTheDocument();
      expect(screen.getByText("62000")).toBeInTheDocument();
      expect(screen.getByText("3.5%")).toBeInTheDocument();
    });

    // desmarca símbolo
    fireEvent.click(screen.getByRole("checkbox"));

    // símbolo some da tela
    await waitFor(() => {
      expect(screen.queryByText("BTCUSDT")).not.toBeInTheDocument();
    });
  });
});
