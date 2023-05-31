import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  valid?: null | boolean;
}
export const Input = ({ label, id, valid, ...props }: InputProps) => {
  return (
    <div className="flex flex-col">
      <label className="text-white" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        {...props}
        className={`bg-gray-100 p-2 rounded-md border-4 ${valid === null ? "" : valid === true
          ? "border-green-300"
          : valid === false ? "border-red-500" : ''
          } `}
      />
    </div>
  );
};
