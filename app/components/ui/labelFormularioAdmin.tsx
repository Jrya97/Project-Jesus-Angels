import { ReactNode } from 'react';

interface InputFormAdminProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  icon: ReactNode;
  autoComplete?: string;
  maxLength?: number;
  pattern?: string;
}

export function InputFormAdmin({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  icon,
  autoComplete,
  maxLength,
  pattern,
}: InputFormAdminProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5">
          {icon}
        </div>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          maxLength={maxLength}
          pattern={pattern}
          className="w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/90 focus:border-transparent transition-all outline-none"
        />
      </div>
    </div>
  );
}
