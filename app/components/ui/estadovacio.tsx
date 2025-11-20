import { IconType } from 'react-icons';

interface EmptyStateProps {
    icon: IconType;
    message: string;
}

export function EstadoVacio({ icon: Icon, message }: EmptyStateProps) {
    return (
        <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon className="w-8 h-8 text-gray-800" />
            </div>
            <p className="text-gray-500">{message}</p>
        </div>
    );
}
