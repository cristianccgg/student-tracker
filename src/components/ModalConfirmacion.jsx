import React from "react";

const ModalConfirmacion = ({ titulo, mensaje, onCancelar, onConfirmar }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-slate-800">
            Eliminar {titulo}
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            ¿Estás seguro de que quieres eliminar a
            <span className="font-semibold text-slate-800">{mensaje}</span>?
          </p>

          <p className="mt-2 text-sm text-red-500">
            Esta acción no se puede deshacer.
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
          <button
            onClick={() => onCancelar()}
            className="cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-800"
          >
            Cancelar
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onConfirmar();
              onCancelar();
            }}
            className="cursor-pointer rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 active:scale-[0.98]"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;
