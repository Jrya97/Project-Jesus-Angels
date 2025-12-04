
"use client";

import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { SecondLink } from "../ui/SecondButton";
import { usePerfiles } from "@/hooks/usePerfiles";
import { Modal } from "../ui/modal";
import { EditarUsuarioForm } from "../forms/EditarUsuarioForm";
import { useDeleteUsuario } from "@/hooks/useDeleteUsuario";
import { useModal } from "@/hooks/useModal";
import { Perfil } from "@/types/types";

export default function ListaUsuarios() {
  const { dataPerfiles } = usePerfiles();
  const { isOpen, openModal, closeModal } = useModal();
  const { deleteUsuario } = useDeleteUsuario();
  const [selectedUsuario, setSelectedUsuario] = useState<Perfil | null>(null);

  const handleEdit = (usuario: Perfil) => {
    setSelectedUsuario(usuario);
    openModal();
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
      await deleteUsuario(id);
      window.location.reload();
    }
  };

  const handleSuccess = () => {
    window.location.reload();
  };

  return (
    <article className="p-6 w-full max-w-6xl mx-auto">
      <div className="mt-2">
        <SecondLink href="/admin/usuarios/crearusuario">
          Crear Nuevo Usuario
        </SecondLink>
        <h1 className="text-4xl font-bold text-gray-800 my-8 text-center">
          Lista de Usuarios
        </h1>
      </div>

      <ul className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4">
        {dataPerfiles.map((perfil) => (
          <li
            key={perfil.id}
            className="flex flex-col justify-between bg-white/85 shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            <div className="flex-1 mb-3">
              <h2 className="text-lg font-semibold text-gray-800">
                {perfil.nombre}
              </h2>
              <p className="text-sm text-gray-500 overflow-hidden">
                {perfil.correoElectronico || ""}
              </p>
              <span
                className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${perfil.rol === "ADMIN"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
                  }`}
              >
                {perfil.rol}
              </span>
            </div>

            <div className="flex justify-center md:justify-end space-x-3">
              <button
                onClick={() => handleEdit(perfil)}
                className="p-2 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition-all duration-150 active:scale-95"
                title="Editar"
              >
                <FaEdit size={18} />
              </button>
              <button
                onClick={() => perfil.id && handleDelete(perfil.id)}
                className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-150 active:scale-95"
                title="Eliminar"
              >
                <MdDeleteForever size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal isOpen={isOpen} onClose={closeModal} title="Editar Usuario">
        {selectedUsuario && (
          <EditarUsuarioForm
            usuario={selectedUsuario}
            onClose={closeModal}
            onSuccess={handleSuccess}
          />
        )}
      </Modal>
    </article>
  );
}

