import React from "react";
import { DeepMap, FieldError, UseFormRegister } from "react-hook-form";

export interface SelectFieldProps {
  label: string;
  name: string;
  description?: string;
  info?: string;
  required?: boolean;
  register: UseFormRegister<any>;
  errors: DeepMap<any, FieldError>;
  children: React.ReactNode;
}

/**
 * A `<select>` laid out like InputField2, so dropdowns and text inputs line up
 * in the same form. Options are passed as children.
 */
export default function SelectField2({
  label,
  name,
  description,
  info,
  required = false,
  register,
  errors,
  children,
}: SelectFieldProps) {
  return (
    <>
      <label htmlFor={name} className="pt-2 block text-sm font-medium text-gray-700">
        {label}
        &nbsp;
        {required && <span className="text-red-500">*</span>}
        &nbsp;
        {info && <span data-balloon-length="large" aria-label={info} data-balloon-pos="up" className="bg-gray-200 rounded text-gray-700"> ?&nbsp;</span>}
      </label>
      <div className="relative">
        <select
          {...register(name)}
          id={name}
          aria-invalid={errors[name] ? true : undefined}
          className={`w-full mt-1 appearance-none bg-white border h-10 rounded-md px-2 py-1 pr-8 text-sm ${errors[name] ? "border-red-500" : ""}`}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 mt-1 flex items-center px-2">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>
      {errors[name] && <p className="pt-1 text-sm text-gray-600 italic">{errors[name].message}</p>}
      <p className="mb-1 text-xs text-gray-500">{description}</p>
    </>
  );
}
