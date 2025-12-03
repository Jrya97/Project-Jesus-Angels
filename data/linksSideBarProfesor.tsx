import { FaHome, FaCalendarAlt } from "react-icons/fa";
import { MdSchool } from "react-icons/md";

export const links = [
    { href: "/profesor", label: "Inicio", icon: <FaHome size={18} /> },
    { href: "/profesor/notas", label: "Notas", icon: <MdSchool size={18} /> },
    { href: "/profesor/asistencia", label: "Asistencia", icon: <FaCalendarAlt size={18} /> },
];