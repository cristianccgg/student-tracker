import React from "react";
import { Trash2, SquarePen } from "lucide-react";

const MisEstudiantes = ({
  estudiantes,
  estudianteSeleccionado,
  abrirEditor,
  notaEditar,
  inputPrecioEditar,
  abrirFormularioClase,
  datosFormularioClase,
  setEstudianteSeleccionado,
  setAbrirEditor,
  setNotaEditar,
  setInputPrecioEditar,
  setAbrirFormularioClase,
  setDatosFormularioClase,
  onEliminarEstudiante,
  onEliminarClase,
  onMarcarPagada,
  onActualizarEstadoTodas,
  onActualizarNota,
  onAgregarClase,
}) => {
  return (
    <div className="space-y-4">
      {estudiantes.map((estudiante) => {
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

        return (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setEstudianteSeleccionado(estudiante.id);
            }}
            key={estudiante.id}
            className="cursor-pointer rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-slate-800">
                {estudiante.nombre}
              </p>
              <div className="flex flex-col items-center">
                <span className="text-sm text-slate-400">
                  {clasesPendientes.length}{" "}
                  {clasesPendientes.length === 1
                    ? "clase pendiente"
                    : "clases pendientes"}
                </span>
                <span className="text-sm text-slate-400">
                  {totalPendientes}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm text-slate-400">
                  {clasesPagadas.length}{" "}
                  {clasesPagadas.length === 1
                    ? "clase pagada"
                    : "clases pagadas"}
                </span>
                <span className="text-sm text-slate-400">{totalPagadas}</span>
              </div>
              <span className="text-sm text-slate-400">
                {estudiante.clases.length}{" "}
                {estudiante.clases.length === 1 ? "clase" : "clases"}
              </span>
              <button onClick={() => onEliminarEstudiante(estudiante.id)}>
                <Trash2 />
              </button>
            </div>
            {estudiante.id === estudianteSeleccionado && (
              <div className="mt-5 border-t border-slate-100 pt-5">
                <p className="mb-4 text-sm text-slate-500">
                  {estudiante.materia}
                </p>
                {/* Clases */}
                <div className="mb-5 space-y-2">
                  {estudiante.clases.map((clase) => (
                    <div
                      key={clase.id}
                      className="rounded-lg bg-slate-50 px-4 py-3"
                    >
                      <div className="flex justify-between">
                        {abrirEditor === clase.id ? (
                          <div>
                            <textarea
                              value={notaEditar}
                              onChange={(e) => {
                                setNotaEditar(e.target.value);
                              }}
                              rows="4"
                              className="mb-4 w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                            />
                            <input
                              value={inputPrecioEditar}
                              onChange={(e) => {
                                setInputPrecioEditar(e.target.value);
                              }}
                              type="number"
                              className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                            />
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm text-slate-700">
                              {clase.nota}
                            </p>
                            <p>${clase.precio}</p>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <p>{clase.pagada ? "Pagada" : "Pendiente"}</p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onMarcarPagada(estudiante.id, clase.id);
                            }}
                            className={`relative h-6 w-11 rounded-full transition-colors ${
                              clase.pagada ? "bg-green-500" : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={`absolute left-0 top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                                clase.pagada ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setInputPrecioEditar(clase.precio);
                              setNotaEditar(clase.nota);
                              setAbrirEditor(clase.id);
                            }}
                          >
                            <SquarePen />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEliminarClase(estudiante.id, clase.id);
                            }}
                          >
                            <Trash2 />
                          </button>
                        </div>
                      </div>
                      {abrirEditor === clase.id && (
                        <div className="flex gap-5 items-center mt-5">
                          <button
                            onClick={() => {
                              onActualizarNota(
                                estudiante.id,
                                clase.id,
                                notaEditar,
                                inputPrecioEditar,
                              );
                              setAbrirEditor(null);
                            }}
                          >
                            Actualizar
                          </button>
                          <button onClick={() => setAbrirEditor(null)}>
                            Cancelar
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => setAbrirFormularioClase(estudiante.id)}
                    className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                  >
                    + Agregar clase
                  </button>
                  {estudiante.clases.length > 0 && (
                    <button
                      onClick={() =>
                        onActualizarEstadoTodas(estudiante.id, !todasPagadas)
                      }
                      className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition ${
                        todasPagadas
                          ? "bg-amber-500 hover:bg-amber-600"
                          : "bg-green-600 hover:bg-green-700"
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onAgregarClase(datosFormularioClase);
                  setAbrirFormularioClase(null);
                }}
                className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-5"
              >
                <label
                  htmlFor="nota"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Nota de la clase
                </label>
                <textarea
                  value={datosFormularioClase.nota}
                  onChange={(e) =>
                    setDatosFormularioClase((prev) => ({
                      ...prev,
                      nota: e.target.value,
                    }))
                  }
                  id="nota"
                  name="nota"
                  rows="4"
                  className="mb-4 w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  placeholder="¿Qué trabajaron en esta clase?"
                />
                <div className="flex gap-5 items-center mb-4">
                  <div className="flex gap-5 items-center">
                    <label htmlFor="precio">Precio</label>
                    <input
                      value={datosFormularioClase.precio}
                      onChange={(e) =>
                        setDatosFormularioClase((prev) => ({
                          ...prev,
                          precio: e.target.value,
                        }))
                      }
                      type="number"
                      className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    />
                  </div>
                  <div className="flex items-center gap-5">
                    <label htmlFor="pago">Pagada</label>
                    <input
                      onChange={(e) =>
                        setDatosFormularioClase((prev) => ({
                          ...prev,
                          pagada: e.target.checked,
                        }))
                      }
                      id="pago"
                      type="checkbox"
                      className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setAbrirFormularioClase(null)}
                    type="button"
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MisEstudiantes;
