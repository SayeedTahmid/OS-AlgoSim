import * as React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helper, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            px-3 py-2 rounded-lg
            bg-gray-800 border border-gray-700
            text-gray-100 placeholder-gray-500
            focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
            transition-colors duration-200
            ${error ? 'border-red-500 focus:border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && <span className="text-xs text-red-400">{error}</span>}
        {helper && <span className="text-xs text-gray-500">{helper}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
