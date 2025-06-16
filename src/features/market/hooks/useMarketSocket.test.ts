/// <reference types="vitest" />
import { vi, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useMarketSocket } from "./useMarketSocket";

vi.mock("../store/useMarketStore", async () => {
  const actual = await vi.importActual<
    typeof import("../store/useMarketStore")
  >("../store/useMarketStore");
  return {
    ...actual,
    useMarketStore: vi.fn().mockReturnValue({
      updateTicker: vi.fn(),
    }),
  };
});

vi.mock("../services/binanceService", () => ({
  fetchAvailableSymbols: () => Promise.resolve(["btcusdt", "ethusdt"]),
}));

describe("useMarketSocket", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "WebSocket",
      vi.fn(() => ({
        close: vi.fn(),
        addEventListener: vi.fn((_, cb) => cb?.({ data: "{}" })),
        removeEventListener: vi.fn(),
        send: vi.fn(),
      })) as any
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("should connect to WebSocket with valid symbols", async () => {
    const { unmount } = renderHook(() =>
      useMarketSocket(["btcusdt", "invalid", "ethusdt"])
    );

    await new Promise((r) => setTimeout(r, 0));

    expect(global.WebSocket).toHaveBeenCalledWith(
      "wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker"
    );

    unmount();
  });
});
