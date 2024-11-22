import { forwardRef, SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: readonly string[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-sm font-medium text-gray-600">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`
            w-full
            px-4 
            py-3 
            bg-white
            border
            rounded-lg
            transition-all
            duration-200
            text-gray-800
            focus:outline-none 
            focus:border-emerald-500
            focus:ring-1
            focus:ring-emerald-500
            ${error ? 'border-red-300 bg-red-50' : 'border-gray-200'}
            ${className}
          `}
          {...props}
        >
          <option value="">Proje Seçiniz</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error && (
          <span className="text-xs text-red-500">{error}</span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select'; 