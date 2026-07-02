'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-sans font-medium text-brand-dark">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "w-full px-4 py-3 bg-white border rounded-lg text-brand-dark transition-all placeholder:text-gray-400 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red",
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-200",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-sans font-medium text-brand-dark">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            "w-full px-4 py-3 bg-white border rounded-lg text-brand-dark transition-all placeholder:text-gray-400 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red min-h-[120px]",
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-200",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { label: string; value: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-sans font-medium text-brand-dark">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            className={cn(
              "w-full px-4 py-3 bg-white border rounded-lg text-brand-dark transition-all focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red appearance-none cursor-pointer",
              error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-200",
              className
            )}
            ref={ref}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-gray">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
        {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
      </div>
    );
  }
);
Select.displayName = 'Select';
