import { useMarketSocket } from "../hooks/useMarketSocket";
import { useMarketStore } from "../store/useMarketStore";

export default function SymbolTable() {
  const watchlists = useMarketStore((state) => state.watchlists);
  const activeList = useMarketStore((state) => state.activeList);
  const tickers = useMarketStore((state) => state.tickers);

  const activeSymbols =
    watchlists.find((w) => w.name === activeList)?.symbols || [];

  useMarketSocket(activeSymbols);

  return (
    <div className="overflow-auto max-h-[400px] shadow-md rounded border border-gray-200">
      <table className="min-w-full text-sm border rounded shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-2">Símbolo</th>
            <th className="px-4 py-2">Último Preço</th>
            <th className="px-4 py-2">Variação %</th>
            <th className="px-4 py-2">Bid</th>
            <th className="px-4 py-2">Ask</th>
          </tr>
        </thead>
        <tbody>
          {activeSymbols.map((s) => {
            const data = tickers[s];
            if (!data) return null;

            return (
              <tr key={s} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{data.symbol}</td>
                <td className="px-4 py-2">{data.lastPrice}</td>
                <td
                  className={`px-4 py-2 ${
                    parseFloat(data.priceChangePercent) >= 0
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {data.priceChangePercent}%
                </td>
                <td className="px-4 py-2">{data.bestBid}</td>
                <td className="px-4 py-2">{data.bestAsk}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
