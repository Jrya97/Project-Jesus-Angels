import { useState, useEffect } from 'react';
import { Nota, curso } from '@/types/types';
import { getCursos } from '@/utils/getFetch';

interface EditarNotaFormProps {
    nota: Nota;
    onSave: (updatedNota: Nota) => void;
    onCancel: () => void;
}

export function EditarNotaForm({ nota, onSave, onCancel }: EditarNotaFormProps) {
    const [formData, setFormData] = useState({
        nota: nota.nota,
        idCurso: nota.curso?.idCurso
    });
    const [cursos, setCursos] = useState<curso[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadCursos = async () => {
            const data = await getCursos();
            if (data) setCursos(data);
        };
        loadCursos();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const currentUserId = localStorage.getItem('userId');
        const alumnoId = (nota.alumno as any)?.idAlumno || (nota.alumno as any)?.id || nota.alumno;

        // Basic validation
        if (!alumnoId) {
            alert("Error: No se pudo identificar el ID del alumno");
            setLoading(false);
            return;
        }

        const updatedNotaData = {
            idNota: nota.idNota,
            // Ensure we are sending the structure backend expects: { idAlumno: number }
            alumno: { idAlumno: Number(alumnoId) },
            curso: { idCurso: Number(formData.idCurso) },
            nota: Number(formData.nota),
            tipoNota: nota.tipoNota,
            fechaRegistro: nota.fechaRegistro,
            // Fallback to current user if original registrar is lost/undefined
            idUsuarioRegistro: nota.idUsuarioRegistro || currentUserId
        };

        console.log("Enviando payload PUT:", updatedNotaData);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notas/${nota.idNota}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedNotaData)
            });

            if (res.ok) {
                const selectedCurso = cursos.find(c => c.idCurso == Number(formData.idCurso));

                const newNota: Nota = {
                    ...nota,
                    nota: Number(formData.nota),
                    curso: {
                        idCurso: Number(formData.idCurso),
                        nombre: selectedCurso?.nombre
                    } as any
                };
                onSave(newNota);
            } else {
                const errorText = await res.text();
                alert(`Error al actualizar nota: ${errorText}`);
            }
        } catch (error) {
            console.error("Error updating note:", error);
            alert("Error al actualizar la nota");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Curso</label>
                <select
                    required
                    value={formData.idCurso}
                    onChange={(e) => setFormData({ ...formData, idCurso: Number(e.target.value) })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    {cursos.map(curso => (
                        <option key={curso.idCurso} value={curso.idCurso}>
                            {curso.nombre}
                        </option>
                    ))}
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
                    value={formData.nota}
                    onChange={(e) => setFormData({ ...formData, nota: typeof e.target.value === 'string' ? Number(e.target.value) : e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div className="mt-4 flex justify-end gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                    disabled={loading}
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
                    disabled={loading}
                >
                    {loading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
            </div>
        </form>
    );
}
