import { ButtonHTMLAttributes } from "react";

interface InputProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
export const Button = ({ ...props }: InputProps) => {
  return (
    <div className="flex flex-col">
      <button
        {...props}
        className="bg-blue-600 p-2 rounded-md disabled:bg-gray-400 disabled:text-gray-800 text-white"
      />
    </div>
  );
};
