import React, { FC, ReactNode } from "react";

type InputDefaultProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type InputProps = {
  label?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  subLabel?: string;
  fullWidth?: boolean;
  helperText?: string;
  hideHelperText?: boolean;
} & InputDefaultProps;

const Input: FC<InputProps> = ({
  label,
  startIcon,
  endIcon,
  helperText = "",
  subLabel,
  fullWidth = false,
  className,
  hideHelperText = false,
  ...inputProps
}) => {
  const fullWidthStyle = fullWidth ? "w-full" : "";

  const renderCustomInput = () => (
    <div className="flex w-full flex-col">
      <div className="relative flex items-stretch">
        <div className="absolute h-full">
          <div
            className={`flex h-full items-center justify-center p-4 ${
              helperText ? "text-red-400" : "text-brand-300"
            }`}>
            {startIcon}
          </div>
        </div>
        <input
          {...inputProps}
          className={`flex flex-1 rounded-md border bg-transparent p-4 text-sm text-white placeholder:text-gray-500 focus:border-brand-400 focus:outline-none focus:ring-1 ${
            startIcon && "pl-14"
          } ${endIcon && "pr-14"} ${
            helperText
              ? "border-red-400 focus:border-red-400 focus:ring-red-500"
              : "border-grey-700 focus:border-grey-700 focus:ring-brand-400"
          } ${fullWidthStyle} ${className}`}
        />
        <div className="absolute right-0 h-full">
          <div
            className={`flex h-full items-center justify-center p-4 font-semibold text-grey-600`}>
            {endIcon}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        {!hideHelperText && (
          <span className="flex h-6 select-none items-end text-red-400 ">
            {helperText}
          </span>
        )}
      </div>
    </div>
  );

  const renderLabel = () => (
    <label htmlFor={inputProps.id ?? ""} className="font-medium text-gray-600">
      {label}
      {subLabel && (
        <span className="text-sm text-gray-600">
          &nbsp; &nbsp;
          {subLabel}
        </span>
      )}
    </label>
  );

  return (
    <div className={`gap flex flex-col gap-2 text-sm ${fullWidthStyle}`}>
      {label && renderLabel()}
      {startIcon ? (
        renderCustomInput()
      ) : (
        <>
          <input
            {...inputProps}
            className={`rounded-lg border border-gray-200 p-2 text-sm placeholder:text-gray-400 focus:outline-none  focus:ring-1 focus:ring-brand-600 md:p-3 ${fullWidthStyle} ${className}`}
          />
          <div className="flex">
            {!hideHelperText && (
              <span className="flex h-6 select-none items-end text-red-400 ">
                {helperText}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Input;
