import React, { FC, ReactNode } from "react";

type DefaultButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonProps = {
  children: ReactNode;
  size?: "sm" | "base";
  fullWidth?: boolean;
  variant?: "primary" | "secondary" | "danger";
} & DefaultButtonProps;

export const Button: FC<ButtonProps> = ({
  fullWidth = false,
  children,
  size = "base",
  className,
  variant = "primary",
  ...buttonProps
}) => {
  const fullWidthStyle = fullWidth ? "w-full" : "";
  const getVariant = () => {
    switch (variant) {
      case "primary": {
        return "bg-gradient-to-r from-brand-300 to-brand-100  hover:from-brand-200 hover:to-brand-50 active:from-brand-300 active:to-brand-100 border-brand-200 hover:border-brand-300 active:border-brand-200 text-black";
      }
      case "secondary": {
        return "bg-grey-500 hover:bg-grey-400  active:bg-grey-500  border-grey-600 hover:border-grey-500 active:border-grey-600 text-white";
      }
      case "danger": {
        return "bg-red-400 hover:bg-red-500  active:bg-red-400  border-red-400 hover:border-red-500 active:border-red-400 text-white";
      }
      default: {
        return "bg-brand-600 hover:bg-brand-500 active:bg-brand-600 ";
      }
    }
  };

  const getSize = () => {
    switch (size) {
      case "sm": {
        return "px-8 py-2";
      }
      default: {
        return "px-16 py-3";
      }
    }
  };

  return (
    <button
      {...buttonProps}
      className={`select-none rounded-md  text-center font-poppins text-sm font-semibold focus:outline-none  ${fullWidthStyle} border  ${getSize()} ${getVariant()} ${className} disabled:bg-zinc-300`}>
      {children}
    </button>
  );
};
