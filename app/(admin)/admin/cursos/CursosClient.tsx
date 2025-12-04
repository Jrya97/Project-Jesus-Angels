'use client';

import { useState, useEffect } from "react";
import { getCursos } from "@/utils/getFetch";
import type { curso } from "@/types/types";
import { InputFormAdmin } from "@/app/components/ui/labelFormularioAdmin";
import { FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Modal } from "@/app/components/ui/modal";
import { EditarCursoForm } from "@/app/components/forms/EditarCursoForm";
import { CrearCursoForm } from "@/app/components/forms/CrearCursoForm";
import { useEditCurso } from "@/hooks/useEditCurso";
import { useDeleteCurso } from "@/hooks/useDeleteCurso";
import { useCreateCurso } from "@/hooks/useCreateCurso";
import { useModal } from "@/hooks/useModal";
import { EstadoVacio } from "@/app/components/ui/estadovacio";
import { SecondButton } from "@/app/components/ui/SecondButton";

export default function CursosClient() {
    const [cursos, setCursos] = useState<curso[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCurso, setSelectedCurso] = useState<curso | undefined>(undefined);

    const editModal = useModal();
    const createModal = useModal();
    const { handleSave: handleSaveCurso } = useEditCurso(selectedCurso);
    const { handleDelete } = useDeleteCurso();
    const { handleCreate } = useCreateCurso();

    useEffect(() => {
        const fetchCursos = async () => {
            setIsLoading(true);
            const data = await getCursos();
            if (data) {
                setCursos(data);
            }
            setIsLoading(false);
        };
        fetchCursos();
    }, []);

    const filteredCursos = cursos.filter(c =>
        c.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (curso: curso) => {
        setSelectedCurso(curso);
        editModal.openModal();
    };

    const onDelete = async (id: number) => {
        if (confirm("¿Estás seguro de que deseas eliminar este curso?")) {
            const success = await handleDelete(id);
            if (success) {
                setCursos(prev => prev.filter(c => c.idCurso !== id));
            }
        }
    };

    const onSave = async (updatedCurso: curso) => {
        const success = await handleSaveCurso(updatedCurso);
        if (success) {
            setCursos(prev => prev.map(c => c.idCurso === updatedCurso.idCurso ? updatedCurso : c));
            editModal.closeModal();
            setSelectedCurso(undefined);
        }
    };

    const onCreate = async (newCurso: Omit<curso, 'idCurso'>) => {
        const createdCurso = await handleCreate(newCurso);
        if (createdCurso) {
            setCursos(prev => [...prev, createdCurso]);
            createModal.closeModal();
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <article className="relative z-10 w-full flex flex-col items-center gap-8 py-10 px-4 md:px-8">
            <section className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-center">
                <div className="w-full max-w-md bg-white/60 rounded-md py-2 px-2 shadow-xl">
                    <InputFormAdmin
                        label="Buscar Curso"
                        name="search"
                        placeholder="Buscar por nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        icon={<FaSearch />}
                        autoComplete="off"
                    />
                </div>
                <SecondButton onClick={createModal.openModal} className="h-full flex items-center gap-2 px-6 py-3">
                    <FaPlus /> Crear Curso
                </SecondButton>
            </section>

            <section className="w-full max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                    Lista de Cursos
                </h1>

                {filteredCursos.length > 0 ? (
                    <ul className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
                        {filteredCursos.map((curso) => (
                            <li key={curso.idCurso} className="flex flex-col items-center justify-between bg-white/85 shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 hover:scale-105">
                                <h2 className="text-lg font-bold text-gray-800 text-center mb-4">
                                    {curso.nombre}
                                </h2>
                                <div className="flex gap-2 w-full">
                                    <button
                                        onClick={() => handleEdit(curso)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black rounded-lg transition-colors text-sm font-medium"
                                    >
                                        <FaEdit /> Editar
                                    </button>
                                    <button
                                        onClick={() => curso.idCurso && onDelete(curso.idCurso)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-black hover:bg-white hover:text-red-600 hover:border hover:border-red-600 rounded-lg transition-colors text-sm font-medium"
                                    >
                                        <FaTrash /> Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <EstadoVacio icon={FaSearch} message="No se encontraron cursos" />
                )}
            </section>

            {selectedCurso && (
                <Modal
                    isOpen={editModal.isOpen}
                    onClose={() => {
                        editModal.closeModal();
                        setSelectedCurso(undefined);
                    }}
                    title="Editar Curso"
                >
                    <EditarCursoForm
                        curso={selectedCurso}
                        onSave={onSave}
                        onCancel={() => {
                            editModal.closeModal();
                            setSelectedCurso(undefined);
                        }}
                    />
                </Modal>
            )}

            <Modal
                isOpen={createModal.isOpen}
                onClose={createModal.closeModal}
                title="Crear Nuevo Curso"
            >
                <CrearCursoForm
                    onSave={onCreate}
                    onCancel={createModal.closeModal}
                />
            </Modal>
        </article>
    );
}
