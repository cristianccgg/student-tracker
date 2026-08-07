import { useEffect, useState } from "react";
import "./App.css";
import { Trash2, SquarePen } from "lucide-react";

function App() {
  const [estudiantes, setEstudiantes] = useState(() => {
    const guardados = localStorage.getItem("estudiantes");

    if (guardados) {
      return JSON.parse(guardados);
    } else {
      return [];
    }
  });
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    materia: "",
  });
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState("");
  const [abrirFormularioClase, setAbrirFormularioClase] = useState(null);
  const [datosFormularioClase, setDatosFormularioClase] = useState({
    nota: "",
    precio: "",
    pagada: false,
  });
  const [abrirEditor, setAbrirEditor] = useState(null);
  const [inputPrecioEditar, setInputPrecioEditar] = useState("");
  const [notaEditar, setNotaEditar] = useState("");

  useEffect(() => {
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
  }, [estudiantes]);

  const agregarEstudiante = (datosFormulario) => {
    if (
      datosFormulario.nombre.trim() !== "" &&
      datosFormulario.materia.trim() !== ""
    ) {
      const estudianteNuevo = {
        id: crypto.randomUUID(),
        nombre: datosFormulario.nombre,
        materia: datosFormulario.materia,
        clases: [],
      };
      setEstudiantes((prevEstudiantes) => [
        ...prevEstudiantes,
        estudianteNuevo,
      ]);
      setDatosFormulario({
        nombre: "",
        materia: "",
      });
    }
  };

  const eliminarEstudiante = (idEstudiante) => {
    setEstudiantes((prevEstudiantes) =>
      prevEstudiantes.filter((estudiante) => estudiante.id !== idEstudiante),
    );
    if (estudianteSeleccionado === idEstudiante) {
      setEstudianteSeleccionado("");
    }
  };

  const agregarClase = (datosFormularioClase) => {
    if (datosFormularioClase.nota.trim() !== "") {
      const claseNueva = {
        id: crypto.randomUUID(),
        nota: datosFormularioClase.nota,
        precio: Number(datosFormularioClase.precio),
        pagada: datosFormularioClase.pagada,
      };
      setEstudiantes((prevEstudiantes) =>
        prevEstudiantes.map((estudiante) =>
          estudiante.id === estudianteSeleccionado
            ? { ...estudiante, clases: [...estudiante.clases, claseNueva] }
            : estudiante,
        ),
      );
      setDatosFormularioClase({
        nota: "",
        precio: "",
        pagada: false,
      });
    }
  };

  const eliminarClase = (idEstudiante, idClase) => {
    setEstudiantes((prevEstudiantes) =>
      prevEstudiantes.map((estudiante) =>
        estudiante.id === idEstudiante
          ? {
              ...estudiante,
              clases: estudiante.clases.filter((clase) => clase.id !== idClase),
            }
          : estudiante,
      ),
    );
  };

  const marcarPagada = (idEstudiante, idClase) => {
    setEstudiantes((prevEstudiantes) =>
      prevEstudiantes.map((estudiante) =>
        estudiante.id === idEstudiante
          ? {
              ...estudiante,
              clases: estudiante.clases.map((clase) =>
                clase.id === idClase
                  ? { ...clase, pagada: !clase.pagada }
                  : clase,
              ),
            }
          : estudiante,
      ),
    );
  };

  const actualizarNota = (idEstudiante, idClase, notaNueva, precioNuevo) => {
    setEstudiantes((prevEstudiantes) =>
      prevEstudiantes.map((estudiante) =>
        estudiante.id === idEstudiante
          ? {
              ...estudiante,
              clases: estudiante.clases.map((clase) =>
                clase.id === idClase
                  ? { ...clase, nota: notaNueva, precio: Number(precioNuevo) }
                  : clase,
              ),
            }
          : estudiante,
      ),
    );
  };

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
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Tracking de estudiantes
          </h1>
          <p className="mt-1 text-slate-500">
            Administra tus estudiantes y registra sus clases.
          </p>
        </div>
        {/* Formulario nuevo estudiante */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold text-slate-800">
            Agregar estudiante
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              agregarEstudiante(datosFormulario);
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
        {/* Lista de estudiantes */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-slate-800">
            Mis estudiantes
          </h2>
          <div className="space-y-4">
            {estudiantes.map((estudiante) => {
              const clasesPagadas = estudiante.clases.filter(
                (clase) => clase.pagada,
              );
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
                      <span className="text-sm text-slate-400">
                        {totalPagadas}
                      </span>
                    </div>
                    <span className="text-sm text-slate-400">
                      {estudiante.clases.length}{" "}
                      {estudiante.clases.length === 1 ? "clase" : "clases"}
                    </span>
                    <button onClick={() => eliminarEstudiante(estudiante.id)}>
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
                                    marcarPagada(estudiante.id, clase.id);
                                  }}
                                  className={`relative h-6 w-11 rounded-full transition-colors ${
                                    clase.pagada
                                      ? "bg-green-500"
                                      : "bg-gray-300"
                                  }`}
                                >
                                  <span
                                    className={`absolute left-0 top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                                      clase.pagada
                                        ? "translate-x-6"
                                        : "translate-x-1"
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
                                    eliminarClase(estudiante.id, clase.id);
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
                                    actualizarNota(
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
                      <button
                        onClick={() => setAbrirFormularioClase(estudiante.id)}
                        className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                      >
                        + Agregar clase
                      </button>
                    </div>
                  )}
                  {/* Formulario de clase */}
                  {abrirFormularioClase === estudiante.id && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        agregarClase(datosFormularioClase);
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
        </div>
        {/* Estadísticas */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-slate-800">
            Mis estadísticas
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            {/* Total clases */}
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Total de clases
              </p>

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
              <p className="text-sm font-medium text-slate-500">
                Clases pagadas
              </p>

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
              <p className="text-sm font-medium text-slate-500">
                Clases pendientes
              </p>

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
        </div>
      </div>
    </div>
  );
}

export default App;
