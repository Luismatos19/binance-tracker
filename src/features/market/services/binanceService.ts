export async function fetchAvailableSymbols(): Promise<string[]> {
  const res = await fetch("https://api.binance.com/api/v3/exchangeInfo");
  const data = await res.json();
  return data.symbols.map((s: any) => s.symbol.toLowerCase());
}
