import { IconType } from "react-icons";
import { FaExclamationTriangle } from "react-icons/fa";

interface MensajeErrorProps {
    titulo: string;
    mensaje: string;
    icon?: IconType;
    iconColor?: string;
    iconBgColor?: string;
}

export const MensajeError = ({
    titulo,
    mensaje,
    icon: Icon = FaExclamationTriangle,
    iconColor = "text-red-500",
    iconBgColor = "bg-red-100"
}: MensajeErrorProps) => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white/85 rounded-2xl shadow-2xl p-8 max-w-md text-center">
                <div className={`w-20 h-20 ${iconBgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-10 h-10 ${iconColor}`} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{titulo}</h2>
                <p className="text-gray-600">{mensaje}</p>
            </div>
        </div>
    );
};
