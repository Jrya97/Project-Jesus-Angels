import { IconType } from 'react-icons';

interface InfoItemProps {
    icon: IconType;
    label: string;
    value: string | number;
    breakAll?: boolean;
}

export function InformacionItem({ icon: Icon, label, value, breakAll = false }: InfoItemProps) {
    return (
        <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-gray-800" />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <p className={`text-lg font-semibold text-gray-800 ${breakAll ? 'break-all' : ''}`}>
                    {value}
                </p>
            </div>
        </div>
    );
}
