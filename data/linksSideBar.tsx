import { FaHome, FaCalendarAlt, FaAddressCard } from "react-icons/fa";
import { MdSchool} from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";

export const links = [
    { href: "/admin", label: "Inicio", icon: <FaHome size={18} /> },
    { href: "/admin/usuarios", label: "Usuarios", icon: <IoMdPersonAdd size ={18}/>},
    { href: "/admin/matricula", label: "Matricula", icon: <FaAddressCard size={18} /> },
    { href: "/admin/notas", label: "Notas", icon: <MdSchool size={18} /> },
    { href: "/admin/asistencia", label: "Asistencia", icon: <FaCalendarAlt size={18} /> },
    { href: "/admin/alumnos", label: "Alumnos", icon: <FaPeopleGroup size={18} /> },
  ];