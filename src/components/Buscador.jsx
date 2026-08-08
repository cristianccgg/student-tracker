import { Search } from "lucide-react";

const Buscador = ({ busquedaText, setBusquedaText }) => {
  return (
    <div className="relative mb-8 w-80">
      <Search
        size={18}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        value={busquedaText}
        onChange={(e) => setBusquedaText(e.target.value)}
        type="text"
        placeholder="Buscar estudiante..."
        className="w-full rounded-xl border border-slate-300 bg-white py-2 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
      />
    </div>
  );
};

export default Buscador;
