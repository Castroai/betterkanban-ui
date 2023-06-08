import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;

}
export const Input = ({ label, id, ...props }: InputProps) => {
  return (
    <div className="flex flex-col">
      <label className="" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="p-2 rounded-md"
      />
    </div>
  );
};
