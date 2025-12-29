"use client";

import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, id, className = "", ...props }, ref) => {
    return (
      <div>
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          className={`w-full px-4 py-3 rounded-xl border ${
            error ? "border-red-500" : "border-gray-300"
          } focus:border-[#386b0b] focus:ring-2 focus:ring-[#386b0b]/20 outline-none transition-all ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
