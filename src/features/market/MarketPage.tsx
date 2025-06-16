import WatchlistManager from "./components/WatchlistManager";
import SymbolSelector from "./components/SymbolSelector";
import SymbolTable from "./components/SymbolTable";
import { useMarketStore } from "./store/useMarketStore";

export default function MarketPage() {
  const watchlists = useMarketStore((state) => state.watchlists);
  const activeList = useMarketStore((state) => state.activeList);
  const removeSymbol = useMarketStore((s) => s.removeSymbolFromActiveList);

  const activeWatchlist = watchlists.find((w) => w.name === activeList);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center sm:text-left">
          Binance Watchlist
        </h1>
        <div className="flex justify-between items-center gap-4 flex-wrap mb-4">
          <WatchlistManager />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 space-y-3">
            <h2 className="text-sm font-semibold">Adicionar símbolo</h2>
            <SymbolSelector />

            <div>
              <h2 className="text-sm font-semibold mt-4 mb-2">
                Símbolos adicionados
              </h2>
              <ul className="space-y-1 text-sm">
                {activeWatchlist?.symbols.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked
                      onChange={() => removeSymbol(s)}
                    />
                    <span className="text-gray-700">{s}</span>
                  </li>
                )) || <li className="text-gray-400 text-sm">Nenhum símbolo</li>}
              </ul>
            </div>
          </div>

          <div className="md:col-span-3">
            <SymbolTable />
          </div>
        </div>
      </div>
    </div>
  );
}
