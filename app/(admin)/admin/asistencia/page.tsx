'use client';
import { useAsistencia } from '@/hooks/useAsistencia';
import { FaCheckCircle, FaTimesCircle, FaSave } from 'react-icons/fa';

export default function AsistenciaPage() {
  const {
    matriculasConAsistencia,
    grados,
    aniosLectivos,
    selectedGrado,
    selectedAnioLectivo,
    setSelectedGrado,
    setSelectedAnioLectivo,
    setEstadoAsistencia,
    submitAsistencias,
    loading,
    submitting
  } = useAsistencia();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-semibold text-gray-600">Cargando...</div>
      </div>
    );
  }

  const matriculasConEstado = matriculasConAsistencia.filter(m => m.estadoAsistencia !== '');
  const todosPresentes = matriculasConAsistencia.length > 0 &&
    matriculasConAsistencia.every(m => m.estadoAsistencia === 'PRESENTE');
  const todosAusentes = matriculasConAsistencia.length > 0 &&
    matriculasConAsistencia.every(m => m.estadoAsistencia === 'AUSENTE');

  const marcarTodos = (estado: 'PRESENTE' | 'AUSENTE') => {
    matriculasConAsistencia.forEach(matricula => {
      if (matricula.alumno?.idAlumno) {
        setEstadoAsistencia(matricula.alumno.idAlumno, estado);
      }
    });
  };

  return (
    <article className="relative z-10 w-full flex flex-col items-center gap-8 py-10 px-4 md:px-8">
      {/* Botón de Historial */}
      <section className="w-full max-w-6xl flex justify-end">
        <button
          onClick={() => window.location.href = '/admin/asistencia/historial'}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-md flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          Historial de Asistencia
        </button>
      </section>

      {/* Sección de Filtros */}
      <section className="w-full max-w-6xl bg-white/60 rounded-md py-4 px-6 shadow-xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Filtros de Búsqueda</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Filtro de Grado */}
          <div className="flex flex-col">
            <label htmlFor="grado" className="text-sm font-semibold text-gray-700 mb-2">
              Grado
            </label>
            <select
              id="grado"
              value={selectedGrado}
              onChange={(e) => setSelectedGrado(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Todos los grados</option>
              {grados.map((grado: any) => (
                <option key={grado.idGrado} value={grado.idGrado}>
                  {grado.nombre} - {grado.nivel}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro de Año Lectivo */}
          <div className="flex flex-col">
            <label htmlFor="anioLectivo" className="text-sm font-semibold text-gray-700 mb-2">
              Año Lectivo
            </label>
            <select
              id="anioLectivo"
              value={selectedAnioLectivo}
              onChange={(e) => setSelectedAnioLectivo(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Todos los años</option>
              {aniosLectivos.map((anio) => (
                <option key={anio} value={anio}>
                  {anio}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Sección de Registro de Asistencia */}
      <section className="w-full max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">
            Registrar Asistencia
          </h1>
          {matriculasConAsistencia.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() => marcarTodos('PRESENTE')}
                disabled={todosPresentes}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
              >
                <FaCheckCircle />
                Marcar Todos Presentes
              </button>
              <button
                onClick={() => marcarTodos('AUSENTE')}
                disabled={todosAusentes}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
              >
                <FaTimesCircle />
                Marcar Todos Ausentes
              </button>
            </div>
          )}
        </div>

        {matriculasConAsistencia.length === 0 ? (
          <div className="text-center text-gray-600 text-lg bg-yellow-50 p-8 rounded-lg border-2 border-yellow-200">
            <p className="text-xl font-semibold mb-2">⚠️ No hay alumnos matriculados</p>
            <p>No se encontraron matrículas en el sistema</p>
          </div>
        ) : (
          <>
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700">
                <strong>Total de alumnos:</strong> {matriculasConAsistencia.length} |
                <strong className="ml-4">Marcados:</strong> {matriculasConEstado.length}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
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
                      Grado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Año Lectivo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Estado de Asistencia
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {matriculasConAsistencia.map((matricula, index) => {
                    const alumno = matricula.alumno;
                    const grado = matricula.grado;

                    return (
                      <tr
                        key={`${matricula.idMatricula}-${alumno?.idAlumno}`}
                        className={`transition-colors ${matricula.estadoAsistencia === 'PRESENTE'
                          ? 'bg-green-50'
                          : matricula.estadoAsistencia === 'AUSENTE'
                            ? 'bg-red-50'
                            : index % 2 === 0
                              ? 'bg-white'
                              : 'bg-gray-50'
                          }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {alumno?.apellido}, {alumno?.nombre}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">{alumno?.dni || '-'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">
                            {grado?.nombre || '-'} - {grado?.nivel || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">
                            {matricula?.anioLectivo || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={matricula.estadoAsistencia}
                            onChange={(e) => setEstadoAsistencia(alumno?.idAlumno!, e.target.value as any)}
                            className={`px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2 transition-colors w-full max-w-xs ${matricula.estadoAsistencia === 'PRESENTE'
                              ? 'border-green-400 focus:ring-green-500 bg-green-50 text-green-700 font-semibold'
                              : matricula.estadoAsistencia === 'AUSENTE'
                                ? 'border-red-400 focus:ring-red-500 bg-red-50 text-red-700 font-semibold'
                                : 'border-gray-300 focus:ring-blue-500'
                              }`}
                          >
                            <option value="">-- Seleccionar --</option>
                            <option value="PRESENTE">✓ Presente</option>
                            <option value="AUSENTE">✗ Ausente</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center">
              <button
                onClick={submitAsistencias}
                disabled={submitting || matriculasConEstado.length === 0}
                className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg hover:shadow-xl transition-all"
              >
                <FaSave />
                {submitting ? 'Guardando...' : `Guardar Asistencia (${matriculasConEstado.length})`}
              </button>
            </div>
          </>
        )}
      </section>
    </article>
  );
}
