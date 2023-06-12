import { ButtonHTMLAttributes } from "react";

interface InputProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "PRIMARY" | "SECONDARY";
}

export const Button = ({ variant, ...props }: InputProps) => {
  return (
    <button
      {...props}
      className={`py-3 px-8 ${
        variant === "PRIMARY" ? "bg-light-primary" : "bg-blue-500 text-white"
      } rounded-full shadow-lg text-light-text disabled:bg-gray-400 disabled:text-gray-800 dark:text-dark-primary`}
    />
  );
};
