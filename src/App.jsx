import { useEffect, useState } from "react";
import AgregarEstudiante from "./components/AgregarEstudiante";
import MisEstudiantes from "./components/MisEstudiantes";
import Estadisticas from "./components/Estadisticas";
import "./App.css";

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
  const actualizarEstadoTodas = (idEstudiante, estado) => {
    setEstudiantes((prevEstudiantes) =>
      prevEstudiantes.map((estudiante) =>
        estudiante.id === idEstudiante
          ? {
              ...estudiante,
              clases: estudiante.clases.map((clase) => ({
                ...clase,
                pagada: estado,
              })),
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
        <AgregarEstudiante
          onAgregarEstudiante={agregarEstudiante}
          datosFormulario={datosFormulario}
          setDatosFormulario={setDatosFormulario}
        />
        {/* Lista de estudiantes */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-slate-800">
            Mis estudiantes
          </h2>
          <MisEstudiantes
            estudiantes={estudiantes}
            estudianteSeleccionado={estudianteSeleccionado}
            abrirEditor={abrirEditor}
            notaEditar={notaEditar}
            inputPrecioEditar={inputPrecioEditar}
            abrirFormularioClase={abrirFormularioClase}
            datosFormularioClase={datosFormularioClase}
            setEstudianteSeleccionado={setEstudianteSeleccionado}
            setAbrirEditor={setAbrirEditor}
            setNotaEditar={setNotaEditar}
            setInputPrecioEditar={setInputPrecioEditar}
            setAbrirFormularioClase={setAbrirFormularioClase}
            setDatosFormularioClase={setDatosFormularioClase}
            onEliminarEstudiante={eliminarEstudiante}
            onEliminarClase={eliminarClase}
            onMarcarPagada={marcarPagada}
            onActualizarEstadoTodas={actualizarEstadoTodas}
            onActualizarNota={actualizarNota}
            onAgregarClase={agregarClase}
          />
        </div>
        {/* Estadísticas */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-slate-800">
            Mis estadísticas
          </h2>
          <Estadisticas estudiantes={estudiantes} />
        </div>
      </div>
    </div>
  );
}

export default App;
