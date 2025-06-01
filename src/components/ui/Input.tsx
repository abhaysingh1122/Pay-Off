import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, fullWidth = true, className = '', ...props }, ref) => {
    const widthClass = fullWidth ? 'w-full' : '';
    const errorClass = error 
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
      : 'border-neutral-200 focus:ring-primary-500 focus:border-primary-500 dark:border-neutral-700';
    
    return (
      <div className={`${widthClass} ${className} animate-fade-in`}>
        {label && (
          <label 
            htmlFor={props.id} 
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-1.5"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500 dark:text-neutral-400">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            className={`
              block rounded-xl shadow-sm 
              ${icon ? 'pl-10' : 'pl-4'} 
              pr-4 py-2.5
              bg-white dark:bg-neutral-900
              text-neutral-900 dark:text-white
              ${errorClass}
              focus:outline-none focus:ring-2
              transition duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              placeholder:text-neutral-400 dark:placeholder:text-neutral-500
              ${widthClass}
            `}
            {...props}
          />
        </div>
        
        {error && (
          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400 animate-slide-up">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;