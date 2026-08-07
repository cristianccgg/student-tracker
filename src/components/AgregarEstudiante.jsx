import React from "react";

const AgregarEstudiante = ({
  onAgregarEstudiante,
  datosFormulario,
  setDatosFormulario,
}) => {
  return (
    <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold text-slate-800">
        Agregar estudiante
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAgregarEstudiante(datosFormulario);
          setDatosFormulario({ nombre: "", materia: "" });
        }}
        className="grid gap-4 sm:grid-cols-2"
      >
        <div>
          <label
            htmlFor="nombre"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Nombre
          </label>
          <input
            value={datosFormulario.nombre}
            onChange={(e) =>
              setDatosFormulario((prev) => ({
                ...prev,
                nombre: e.target.value,
              }))
            }
            id="nombre"
            type="text"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            placeholder="Nombre del estudiante"
          />
        </div>
        <div>
          <label
            htmlFor="materia"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Materia
          </label>
          <input
            value={datosFormulario.materia}
            onChange={(e) =>
              setDatosFormulario((prev) => ({
                ...prev,
                materia: e.target.value,
              }))
            }
            id="materia"
            type="text"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            placeholder="Ej. Piano"
          />
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="rounded-lg bg-slate-800 px-5 py-2.5 font-medium text-white transition hover:bg-slate-700"
          >
            Agregar estudiante
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarEstudiante;
