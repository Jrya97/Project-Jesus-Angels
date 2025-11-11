import { FaHome, FaCalendarAlt  } from "react-icons/fa";
import { MdFactCheck, MdSchool} from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";

export const links = [
    { href: "/admin", label: "Inicio", icon: <FaHome size={18} /> },
    { href: "/admin/matricula", label: "Matricula", icon: <MdFactCheck size={18} /> },
    { href: "/admin/notas", label: "Notas", icon: <MdSchool size={18} /> },
    { href: "/admin/asistencia", label: "Asistencia", icon: <FaCalendarAlt size={18} /> },
    { href: "/admin/alumnos", label: "Alumnos", icon: <FaPeopleGroup size={18} /> },
  ];