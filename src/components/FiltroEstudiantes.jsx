const filtros = [
  { id: "todos", label: "Todos" },
  { id: "conPendientes", label: "Con pagos pendientes" },
  { id: "alDia", label: "Con pagos al día" },
];

const FiltroEstudiantes = ({ filtroActivo, setFiltroActivo }) => {
  return (
    <div className="flex gap-5 mb-5">
      {filtros.map((filtro) => (
        <div key={filtro.id}>
          <button
            onClick={() => setFiltroActivo(filtro.id)}
            className={`cursor-pointer rounded-lg px-5 py-2.5 font-medium transition ${
              filtroActivo === filtro.id
                ? "bg-slate-800 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {filtro.label}
          </button>
        </div>
      ))}
    </div>
  );
};

export default FiltroEstudiantes;
