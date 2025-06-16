import { useState } from "react";
import { useMarketStore } from "../store/useMarketStore";

export default function WatchlistManager() {
  const { watchlists, activeList, createWatchlist, selectWatchlist } =
    useMarketStore();
  const [name, setName] = useState("");

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Criar nova lista
        </label>
        <div className="flex gap-2">
          <input
            className="border px-2 py-1 text-sm rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white text-sm px-3 py-1 rounded"
            onClick={() => {
              if (name.trim()) {
                createWatchlist(name.trim());
                setName("");
              }
            }}
          >
            Criar
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Selecionar lista
        </label>
        <select
          className="border rounded text-sm px-2 py-1"
          value={activeList ?? ""}
          onChange={(e) => selectWatchlist(e.target.value)}
        >
          <option value="">Selecione...</option>
          {watchlists.map((w) => (
            <option key={w.name} value={w.name}>
              {w.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
