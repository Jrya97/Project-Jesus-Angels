'use client';

export function useDeleteCurso() {
    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cursos/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                return true;
            } else {
                alert("Error al eliminar el curso");
                return false;
            }
        } catch (error) {
            console.error('Error al eliminar curso:', error);
            return false;
        }
    };

    return {
        handleDelete,
    };
}
