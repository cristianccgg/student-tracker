import React from "react";
import { Trash2, SquarePen, ChevronDown, ChevronUp } from "lucide-react";
import FormularioClase from "./FormularioClase";
import ModalConfirmacion from "./ModalConfirmacion";

const MisEstudiantes = ({
  estudiantes,
  estudianteSeleccionado,
  estudiantesFiltrados,
  abrirEditor,
  abrirEditorEstudiante,
  abrirModalConfirmacion,
  notaEditar,
  inputPrecioEditar,
  fechaEditar,
  nombreEditar,
  materiaEditar,
  abrirFormularioClase,
  datosFormularioClase,
  claseAEliminar,
  setEstudianteSeleccionado,
  setAbrirEditor,
  setNotaEditar,
  setInputPrecioEditar,
  setNombreEditar,
  setMateriaEditar,
  setAbrirFormularioClase,
  setDatosFormularioClase,
  setAbrirEditorEstudiante,
  setAbrirModalConfirmacion,
  setFechaEditar,
  setClaseAEliminar,
  onEliminarEstudiante,
  onEliminarClase,
  onMarcarPagada,
  onActualizarEstadoTodas,
  onActualizarNota,
  onAgregarClase,
  onActualizarEstudiante,
}) => {
  const estudianteAEliminar = estudiantes.find(
    (estudiante) => estudiante.id === abrirModalConfirmacion,
  );
  return (
    <div className="space-y-4">
      {estudiantesFiltrados.map((estudiante) => {
        const clasesPagadas = estudiante.clases.filter((clase) => clase.pagada);
        const clasesPendientes = estudiante.clases.filter(
          (clase) => !clase.pagada,
        );

        const totalPendientes = clasesPendientes.reduce(
          (acc, clase) => acc + clase.precio,
          0,
        );

        const totalPagadas = clasesPagadas.reduce(
          (acc, clase) => acc + clase.precio,
          0,
        );

        const todasPagadas = estudiante.clases.every((clase) => clase.pagada);
        const isOpen = estudiante.id === estudianteSeleccionado;

        const toggleEstudiante = (e) => {
          e.stopPropagation();
          if (estudiante.id === estudianteSeleccionado) {
            setEstudianteSeleccionado(null);
          } else {
            setEstudianteSeleccionado(estudiante.id);
          }
        };

        const clasesOrdenadas = [...estudiante.clases].sort(
          (a, b) => new Date(b.fecha) - new Date(a.fecha),
        );

        const arrayFechas = ["2025-05-10", "2023-01-01", "2026-03-15"];

        arrayFechas.sort((a, b) => new Date(a) - new Date(b));

        return (
          <div
            key={estudiante.id}
            className="cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div
              onClick={toggleEstudiante}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Cerrar clases" : "Abrir clases"}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleEstudiante(e);
                }
              }}
              className={`flex flex-wrap items-start justify-between gap-4 rounded-xl px-3 py-3 transition duration-200 ${
                isOpen
                  ? "border border-sky-200 bg-sky-50/60"
                  : "border border-transparent bg-slate-50/50 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleEstudiante(e);
                  }}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                  aria-label={isOpen ? "Cerrar clases" : "Abrir clases"}
                >
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-sm font-bold text-white">
                  {estudiante.nombre.charAt(0).toUpperCase()}
                </div>
                <div>
                  {abrirEditorEstudiante !== estudiante.id ? (
                    <div>
                      <p className="text-lg font-semibold text-slate-800">
                        {estudiante.nombre}
                      </p>
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                        {estudiante.materia}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col w-fit gap-2">
                      {" "}
                      <input
                        value={nombreEditar}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setNombreEditar(e.target.value)}
                        type="text"
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                      />
                      <input
                        value={materiaEditar}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setMateriaEditar(e.target.value)}
                        type="text"
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                      />
                      <div className="flex justify-evenly">
                        <button
                          onClick={() => {
                            onActualizarEstudiante(
                              estudiante.id,
                              nombreEditar,
                              materiaEditar,
                            );
                            setAbrirEditorEstudiante(null);
                          }}
                          className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-emerald-700 active:scale-[0.98]"
                        >
                          Actualizar
                        </button>
                        <button
                          onClick={() => setAbrirEditorEstudiante(null)}
                          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-600 transition hover:bg-slate-50 hover:text-slate-800"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-start gap-2">
                <div className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 text-center">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-amber-500">
                    Pendientes
                  </span>
                  <span className="mt-1 block text-sm font-bold text-slate-800">
                    {clasesPendientes.length}
                  </span>
                  <span className="text-xs text-slate-500">
                    ${totalPendientes}
                  </span>
                </div>

                <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-center">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600">
                    Pagadas
                  </span>
                  <span className="mt-1 block text-sm font-bold text-slate-800">
                    {clasesPagadas.length}
                  </span>
                  <span className="text-xs text-slate-500">
                    ${totalPagadas}
                  </span>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-center">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    Total
                  </span>
                  <span className="mt-1 block text-sm font-bold text-slate-800">
                    {estudiante.clases.length}
                  </span>
                  <span className="text-xs text-slate-500">
                    {estudiante.clases.length === 1 ? "clase" : "clases"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAbrirEditorEstudiante(estudiante.id);
                    setNombreEditar(estudiante.nombre);
                    setMateriaEditar(estudiante.materia);
                  }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                >
                  <SquarePen />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAbrirModalConfirmacion(estudiante.id);
                  }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                  aria-label="Eliminar estudiante"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {isOpen && (
              <div className="mt-6 border-t border-slate-100 pt-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      Materia
                    </span>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {estudiante.materia}
                    </p>
                  </div>
                  <button
                    onClick={() => setAbrirFormularioClase(estudiante.id)}
                    className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm transition hover:bg-slate-700 active:scale-[0.98]"
                  >
                    + Agregar clase
                  </button>
                </div>
                {/* Clases */}
                <div className="mb-5 space-y-3">
                  {clasesOrdenadas.map((clase) => (
                    <article
                      key={clase.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 shadow-sm"
                    >
                      {abrirEditor === clase.id ? (
                        <div className="rounded-2xl border border-sky-200 bg-white p-4">
                          <div className="mb-4 flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-600">
                              Editar clase
                            </span>
                            <span className="rounded-full bg-sky-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-sky-700">
                              {clase.pagada ? "Pagada" : "Pendiente"}
                            </span>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                Nota
                              </label>
                              <textarea
                                value={notaEditar}
                                onChange={(e) => {
                                  setNotaEditar(e.target.value);
                                }}
                                rows="4"
                                className="w-full resize-none rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                              />
                            </div>
                            <div>
                              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                Precio
                              </label>
                              <input
                                value={inputPrecioEditar}
                                onChange={(e) => {
                                  setInputPrecioEditar(e.target.value);
                                }}
                                type="number"
                                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                              />
                            </div>
                            <div>
                              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                Fecha
                              </label>
                              <input
                                value={fechaEditar}
                                onChange={(e) => {
                                  setFechaEditar(e.target.value);
                                }}
                                type="date"
                                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                              />
                            </div>
                          </div>
                          <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
                            <button
                              onClick={() => setAbrirEditor(null)}
                              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-600 transition hover:bg-slate-50 hover:text-slate-800"
                            >
                              Cancelar
                            </button>
                            <button
                              onClick={() => {
                                onActualizarNota(
                                  estudiante.id,
                                  clase.id,
                                  notaEditar,
                                  inputPrecioEditar,
                                  fechaEditar,
                                );
                                setAbrirEditor(null);
                              }}
                              className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-emerald-700 active:scale-[0.98]"
                            >
                              Actualizar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                                Nota / {clase.fecha}
                              </span>
                              <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
                                {clase.nota}
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setInputPrecioEditar(clase.precio);
                                  setNotaEditar(clase.nota);
                                  setFechaEditar(clase.fecha);
                                  setAbrirEditor(clase.id);
                                }}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                                aria-label="Editar clase"
                              >
                                <SquarePen className="h-4 w-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setClaseAEliminar({
                                    id: clase.id,
                                    idEstudiante: estudiante.id,
                                    nota: clase.nota,
                                  });
                                }}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
                                aria-label="Eliminar clase"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-4">
                            <div className="min-w-[130px]">
                              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                                Precio
                              </span>
                              <p className="text-sm font-semibold text-slate-800">
                                ${clase.precio}
                              </p>
                            </div>

                            <div className="flex items-center justify-end gap-3 rounded-full bg-white px-3 py-2 shadow-sm">
                              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                                {clase.pagada ? "Pagada" : "Pendiente"}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onMarcarPagada(estudiante.id, clase.id);
                                }}
                                className={`relative h-6 w-11 rounded-full border border-slate-200 transition-colors ${
                                  clase.pagada
                                    ? "bg-emerald-500"
                                    : "bg-slate-300"
                                }`}
                              >
                                <span
                                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                                    clase.pagada ? "left-6" : "left-1"
                                  }`}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {estudiante.clases.length > 0 && (
                    <button
                      onClick={() =>
                        onActualizarEstadoTodas(estudiante.id, !todasPagadas)
                      }
                      className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white transition active:scale-[0.98] ${
                        todasPagadas
                          ? "bg-amber-500 hover:bg-amber-600"
                          : "bg-emerald-600 hover:bg-emerald-700"
                      }`}
                    >
                      {todasPagadas
                        ? "Marcar todas como pendientes"
                        : "Marcar todas como pagadas"}
                    </button>
                  )}
                </div>
              </div>
            )}
            {/* Formulario de clase */}
            {abrirFormularioClase === estudiante.id && (
              <FormularioClase
                onAgregarClase={onAgregarClase}
                datosFormularioClase={datosFormularioClase}
                setAbrirFormularioClase={setAbrirFormularioClase}
                setDatosFormularioClase={setDatosFormularioClase}
              />
            )}
          </div>
        );
      })}

      {claseAEliminar && (
        <ModalConfirmacion
          titulo={"clase"}
          mensaje={claseAEliminar.nota}
          onCancelar={() => setClaseAEliminar(null)}
          onConfirmar={() =>
            onEliminarClase(claseAEliminar.idEstudiante, claseAEliminar.id)
          }
        />
      )}

      {estudianteAEliminar && (
        <ModalConfirmacion
          titulo={"estudiante"}
          mensaje={estudianteAEliminar.nombre}
          onCancelar={() => setAbrirModalConfirmacion(null)}
          onConfirmar={() => onEliminarEstudiante(estudianteAEliminar.id)}
        />
      )}
    </div>
  );
};

export default MisEstudiantes;
