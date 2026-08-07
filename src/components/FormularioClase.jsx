import React from "react";

const FormularioClase = ({
  onAgregarClase,
  datosFormularioClase,
  setAbrirFormularioClase,
  setDatosFormularioClase,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onAgregarClase(datosFormularioClase);
        setAbrirFormularioClase(null);
      }}
      className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
        <h3 className="font-semibold text-slate-800">Nueva clase</h3>
        <p className="mt-1 text-sm text-slate-500">
          Registra la información de la clase.
        </p>
      </div>

      <div className="space-y-5 p-5">
        <div>
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
            className="w-full resize-none rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 outline-none transition focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200"
            placeholder="¿Qué trabajaron en esta clase?"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="fecha"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Fecha
            </label>
            <input
              id="fecha"
              value={datosFormularioClase.fecha}
              onChange={(e) =>
                setDatosFormularioClase((prev) => ({
                  ...prev,
                  fecha: e.target.value,
                }))
              }
              type="date"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 pl-7 pr-3 outline-none transition focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <div>
            <label
              htmlFor="precio"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Precio
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                $
              </span>

              <input
                value={datosFormularioClase.precio}
                onChange={(e) =>
                  setDatosFormularioClase((prev) => ({
                    ...prev,
                    precio: e.target.value,
                  }))
                }
                id="precio"
                type="number"
                placeholder="35000"
                className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 pl-7 pr-3 outline-none transition focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </div>

          <div>
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Estado del pago
            </span>

            <label className="flex h-[42px] cursor-pointer items-center justify-between rounded-lg border border-slate-300 bg-slate-50 px-3 transition hover:bg-white">
              <span className="text-sm text-slate-600">
                {datosFormularioClase.pagada ? "Clase pagada" : "Pendiente"}
              </span>

              <input
                checked={datosFormularioClase.pagada}
                onChange={(e) =>
                  setDatosFormularioClase((prev) => ({
                    ...prev,
                    pagada: e.target.checked,
                  }))
                }
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4">
        <button
          onClick={() => setAbrirFormularioClase(null)}
          type="button"
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-400 hover:bg-slate-100 hover:text-slate-800"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="rounded-lg bg-slate-800 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-700 active:scale-[0.98]"
        >
          Guardar clase
        </button>
      </div>
    </form>
  );
};

export default FormularioClase;
