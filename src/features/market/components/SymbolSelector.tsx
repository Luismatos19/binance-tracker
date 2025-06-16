import { useEffect, useState } from "react";
import { fetchAvailableSymbols } from "../services/binanceService";
import { useMarketStore } from "../store/useMarketStore";

export default function SymbolSelector() {
  const activeList = useMarketStore((state) => state.activeList);
  const addSymbolToActiveList = useMarketStore(
    (state) => state.addSymbolToActiveList
  );
  const [symbols, setSymbols] = useState<string[]>([]);

  useEffect(() => {
    fetchAvailableSymbols().then(setSymbols);
  }, []);

  return (
    <div>
      <select
        id="symbol-select"
        onChange={(e) => {
          if (activeList && e.target.value)
            addSymbolToActiveList(e.target.value);
        }}
        className="border p-2 rounded"
      >
        <option value="">Selecionar símbolo </option>
        {symbols.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}
