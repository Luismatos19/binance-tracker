import { expect } from "vitest";
import { fetchAvailableSymbols } from "./binanceService";

describe("binanceService", () => {
  it("should return a list of available symbols", async () => {
    const symbols = await fetchAvailableSymbols();
    expect(Array.isArray(symbols)).toBe(true);
    expect(symbols).toContain("btcusdt");
  });
});
