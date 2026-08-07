import React from "react";

const Estadisticas = ({ estudiantes }) => {
  const totalClases = estudiantes.flatMap((estudiante) => estudiante.clases);
  const totalClasesPagadas = totalClases.filter((clase) => clase.pagada);
  const totalClasesPendientes = totalClases.filter((clase) => !clase.pagada);

  const valorTotalClases = totalClases.reduce(
    (acc, clases) => acc + clases.precio,
    0,
  );
  const valorTotalPagadas = totalClasesPagadas.reduce(
    (acc, clases) => acc + clases.precio,
    0,
  );

  const valorTotalPendientes = totalClasesPendientes.reduce(
    (acc, clases) => acc + clases.precio,
    0,
  );
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {/* Total clases */}
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Total de clases</p>

        <div className="mt-2 flex items-end justify-between">
          <p className="text-3xl font-semibold text-slate-800">
            {totalClases.length}
          </p>

          <p className="text-sm font-medium text-slate-500">
            ${valorTotalClases.toLocaleString("es-CO")}
          </p>
        </div>
      </div>

      {/* Clases pagadas */}
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Clases pagadas</p>

        <div className="mt-2 flex items-end justify-between">
          <p className="text-3xl font-semibold text-slate-800">
            {totalClasesPagadas.length}
          </p>

          <p className="text-sm font-medium text-slate-500">
            ${valorTotalPagadas.toLocaleString("es-CO")}
          </p>
        </div>
      </div>

      {/* Clases pendientes */}
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Clases pendientes</p>

        <div className="mt-2 flex items-end justify-between">
          <p className="text-3xl font-semibold text-slate-800">
            {totalClasesPendientes.length}
          </p>

          <p className="text-sm font-medium text-slate-500">
            ${valorTotalPendientes.toLocaleString("es-CO")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Estadisticas;
