import { ReactNode } from 'react';
import { IconType } from 'react-icons';

interface InfoCardProps {
    title: string;
    icon: IconType;
    children: ReactNode;
    actionButton?: ReactNode;
}

export function InformacionCard({ title, icon: Icon, children, actionButton }: InfoCardProps) {
    return (
        <div className="bg-white/85 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-300">
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            </div>
            <div className="space-y-4">
                {children}
            </div>
            {actionButton && (
                <div className="mt-6 pt-4 border-t-2 border-gray-200">
                    {actionButton}
                </div>
            )}
        </div>
    );
}
