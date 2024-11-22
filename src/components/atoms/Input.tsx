import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-sm font-medium text-gray-600">
            {label}
          </label>
        )}
        <div className="relative">
          <input
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
              placeholder-gray-400
              focus:outline-none 
              focus:border-emerald-500
              focus:ring-1
              focus:ring-emerald-500
              ${error ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'}
              ${className}
            `}
            {...props}
          />
          {error && (
            <div className="absolute -bottom-5 left-0">
              <span className="text-xs text-red-500 flex items-center gap-1">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor" 
                  className="w-3 h-3"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" 
                    clipRule="evenodd" 
                  />
                </svg>
                {error}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';