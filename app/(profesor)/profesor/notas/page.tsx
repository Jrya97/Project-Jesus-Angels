'use client';
import { useState, useEffect } from 'react';
import type { Grado, Matricula, curso, Nota, Perfil } from '@/types/types';
import { getGrados, getMatriculas, getCursos, getNotasByAlumno, getPerfiles } from '@/utils/getFetch';
import { Modal } from '@/app/components/ui/modal';
import { EditarNotaForm } from '@/app/components/forms/EditarNotaForm';

export default function NotasPage() {
  const [grados, setGrados] = useState<Grado[]>([]);
  const [cursos, setCursos] = useState<curso[]>([]);
  const [selectedGrado, setSelectedGrado] = useState<Grado | null>(null);
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados para modales y notas
  const [showNotasModal, setShowNotasModal] = useState(false);
  const [showIngresarModal, setShowIngresarModal] = useState(false);
  const [selectedAlumno, setSelectedAlumno] = useState<Matricula['alumno'] | null>(null);
  const [notasAlumno, setNotasAlumno] = useState<Nota[]>([]);
  const [perfilesMap, setPerfilesMap] = useState<Record<string, string>>({});

  // Estado para editar nota
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [selectedNota, setSelectedNota] = useState<Nota | null>(null);

  // Estado para el formulario de nueva nota
  const [newNota, setNewNota] = useState({
    nota: '',
    idCurso: '',
    tipoNota: 'EXAMEN'
  });

  // Obtener el año actual
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [dataGrados, dataMatriculas, dataCursos, dataPerfiles] = await Promise.all([
          getGrados(),
          getMatriculas(),
          getCursos(),
          getPerfiles()
        ]);

        if (dataGrados && Array.isArray(dataGrados)) {
          const gradosOrdenados = dataGrados.sort((a, b) => a.idGrado - b.idGrado);
          setGrados(gradosOrdenados);
        }

        if (dataMatriculas && Array.isArray(dataMatriculas)) {
          setMatriculas(dataMatriculas);
        }

        if (dataCursos && Array.isArray(dataCursos)) {
          setCursos(dataCursos);
        }

        if (dataPerfiles && Array.isArray(dataPerfiles)) {
          const map: Record<string, string> = {};
          dataPerfiles.forEach((p: Perfil) => {
            if (p.id) {
              map[p.id] = p.nombre;
            }
          });
          setPerfilesMap(map);
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrar alumnos por grado seleccionado, estado ACTIVO y año actual
  const alumnosFiltrados = selectedGrado
    ? matriculas.filter(m => {
      const isActivo = m.estado === 'ACTIVO';
      const isCurrentYear = m.anioLectivo === currentYear || m.anioLectivo === currentYear.toString();
      const isSelectedGrado = m.grado?.idGrado === selectedGrado.idGrado;
      return isActivo && isCurrentYear && isSelectedGrado;
    })
    : [];

  // Manejador para ver notas
  const handleVerNotas = async (alumno: Matricula['alumno']) => {
    setSelectedAlumno(alumno);
    setShowNotasModal(true);
    setNotasAlumno([]); // Limpiar notas anteriores
    try {
      const notas = await getNotasByAlumno(alumno.idAlumno);
      if (notas && Array.isArray(notas)) {
        setNotasAlumno(notas);
      }
    } catch (error) {
      console.error("Error al obtener notas", error);
    }
  };

  // Manejador para abrir modal de ingresar nota
  const handleAbrirIngresarNota = (alumno: Matricula['alumno']) => {
    setSelectedAlumno(alumno);
    setNewNota({
      nota: '',
      idCurso: '',
      tipoNota: 'EXAMEN'
    });
    setShowIngresarModal(true);
  };

  // Manejador para enviar nota
  const handleSubmitNota = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAlumno) return;

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert("Error: No se encontró la sesión del usuario. Por favor inicie sesión nuevamente.");
      return;
    }


    const now = new Date();
    const fechaRegistro = now.toISOString().split('.')[0];

    const notaData = {
      alumno: { idAlumno: selectedAlumno.idAlumno },
      curso: { idCurso: parseInt(newNota.idCurso) },
      nota: parseFloat(newNota.nota),
      tipoNota: newNota.tipoNota,
      fechaRegistro: fechaRegistro,
      idUsuarioRegistro: userId
      // Nota: en el backend UUID puede esperarse como string
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(notaData)
      });

      if (res.ok) {
        alert('Nota registrada exitosamente');
        setShowIngresarModal(false);
        // Si el modal de ver notas está abierto (caso raro pero posible), actualizamos
        if (showNotasModal) {
          handleVerNotas(selectedAlumno);
        }
      } else {
        const errorText = await res.text();
        alert(`Error al registrar nota: ${errorText}`);
      }
    } catch (error) {
      console.error("Error al enviar nota:", error);
      alert("Error al enviar nota");
    }
  };

  const handleEditarNota = (nota: Nota) => {
    setSelectedNota(nota);
    setShowEditarModal(true);
  };

  const handleSaveEdit = (updatedNota: Nota) => {
    setNotasAlumno(prev => prev.map(n => n.idNota === updatedNota.idNota ? updatedNota : n));
    setShowEditarModal(false);
    setSelectedNota(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-semibold text-gray-600">Cargando...</div>
      </div>
    );
  }

  return (
    <article className="relative z-10 w-full flex flex-col items-center gap-8 py-10 px-4 md:px-8">
      {/* Header */}
      <section className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Gestión de Notas</h1>
        <p className="text-gray-600">Año Lectivo: {currentYear}</p>
      </section>

      {!selectedGrado ? (
        /* Vista de Cards de Grados */
        <section className="w-full max-w-6xl">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Selecciona un Grado</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grados.map((grado) => {
              const cantidadAlumnos = matriculas.filter(m =>
                m.grado?.idGrado === grado.idGrado &&
                m.estado === 'ACTIVO' &&
                (m.anioLectivo === currentYear || m.anioLectivo === currentYear.toString())
              ).length;

              return (
                <div
                  key={grado.idGrado}
                  onClick={() => setSelectedGrado(grado)}
                  className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-xl transition-shadow border-2 border-transparent hover:border-indigo-500"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {grado.nombre}
                  </h3>
                  <p className="text-gray-600 mb-3">{grado.nivel}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {cantidadAlumnos} {cantidadAlumnos === 1 ? 'alumno' : 'alumnos'}
                    </span>
                    <div className="text-indigo-600 font-semibold">
                      Ver Alumnos →
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        /* Vista de Lista de Alumnos */
        <section className="w-full max-w-6xl">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">
                {selectedGrado.nombre} - {selectedGrado.nivel}
              </h2>
              <p className="text-gray-600 mt-1">
                Total de alumnos: {alumnosFiltrados.length}
              </p>
            </div>
            <button
              onClick={() => setSelectedGrado(null)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cambiar Grado
            </button>
          </div>

          {alumnosFiltrados.length === 0 ? (
            <div className="text-center text-gray-600 text-lg bg-yellow-50 p-8 rounded-lg border-2 border-yellow-200">
              <p className="text-xl font-semibold mb-2">⚠️ No hay alumnos</p>
              <p>No se encontraron alumnos activos para este grado en el año {currentYear}</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Nombre Completo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      DNI
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Año Lectivo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {alumnosFiltrados.map((matricula, index) => (
                    <tr
                      key={matricula.idMatricula || index}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {matricula.alumno?.apellido}, {matricula.alumno?.nombre}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {matricula.alumno?.dni || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {matricula.anioLectivo}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                        <button
                          onClick={() => handleVerNotas(matricula.alumno)}
                          className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                        >
                          Ver Notas
                        </button>
                        <button
                          onClick={() => handleAbrirIngresarNota(matricula.alumno)}
                          className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                          Ingresar Nota
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* Modal Ver Notas */}
      {showNotasModal && selectedAlumno && (
        <Modal
          isOpen={showNotasModal}
          onClose={() => setShowNotasModal(false)}
          title={`Notas de ${selectedAlumno.nombre} ${selectedAlumno.apellido}`}
        >
          <div className="p-4">
            {notasAlumno.length === 0 ? (
              <p className="text-gray-500 italic">No hay notas registradas.</p>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Curso</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nota</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Registrado Por</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {notasAlumno.map((nota, idx) => {
                      const registradoPor = perfilesMap[nota.idUsuarioRegistro as any] || 'Desconocido';
                      return (
                        <tr key={nota.idNota || idx}>
                          <td className="px-4 py-2 text-sm">{nota.curso?.nombre}</td>
                          <td className="px-4 py-2 text-sm font-bold">{nota.nota}</td>
                          <td className="px-4 py-2 text-sm">{nota.tipoNota}</td>
                          <td className="px-4 py-2 text-sm">
                            {nota.fechaRegistro?.split('T')[0].split('-').reverse().join('/')}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-600">
                            {registradoPor}
                          </td>
                          <td className="px-4 py-2 text-sm text-center">
                            <button
                              onClick={() => handleEditarNota(nota)}
                              className="text-blue-600 hover:text-blue-800 font-semibold text-xs uppercase"
                            >
                              Editar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowNotasModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cerrar
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal Ingresar Nota */}
      {showIngresarModal && selectedAlumno && (
        <Modal
          isOpen={showIngresarModal}
          onClose={() => setShowIngresarModal(false)}
          title={`Ingresar Nota - ${selectedAlumno.nombre} ${selectedAlumno.apellido}`}
        >
          <form onSubmit={handleSubmitNota} className="p-4 flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Curso</label>
              <select
                required
                value={newNota.idCurso}
                onChange={(e) => setNewNota({ ...newNota, idCurso: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">-- Seleccionar Curso --</option>
                {cursos.map(curso => (
                  <option key={curso.idCurso} value={curso.idCurso}>
                    {curso.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo de Nota</label>
              <select
                required
                value={newNota.tipoNota}
                onChange={(e) => setNewNota({ ...newNota, tipoNota: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="EXAMEN">Examen</option>
                <option value="TRABAJO">Trabajo</option>
                <option value="TAREA">Tarea</option>
                <option value="BIMESTRAL1">Bimestral 1</option>
                <option value="BIMESTRAL2">Bimestral 2</option>
                <option value="BIMESTRAL3">Bimestral 3</option>
                <option value="BIMESTRAL4">Bimestral 4</option>
                <option value="FINAL">Final</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Nota (0-20)</label>
              <input
                type="number"
                min="0"
                max="20"
                step="0.01"
                required
                value={newNota.nota}
                onChange={(e) => setNewNota({ ...newNota, nota: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowIngresarModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Guardar Nota
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal Editar Nota */}
      {showEditarModal && selectedNota && (
        <Modal
          isOpen={showEditarModal}
          onClose={() => setShowEditarModal(false)}
          title="Editar Nota"
        >
          <EditarNotaForm
            nota={selectedNota}
            onSave={handleSaveEdit}
            onCancel={() => setShowEditarModal(false)}
          />
        </Modal>
      )}

    </article>
  );
}
