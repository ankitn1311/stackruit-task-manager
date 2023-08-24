import React, { FC, ReactNode } from "react";

type TextAreaDefaultProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export type TextAreaProps = {
  label: string;
  startIcon?: ReactNode;
  endIcon?: string;
  subLabel?: string;
  fullWidth?: boolean;
  helperText?: string;
  rows?: number;
} & TextAreaDefaultProps;

const TextArea: FC<TextAreaProps> = ({
  label,
  startIcon,
  subLabel,
  endIcon,
  fullWidth = false,
  helperText = "",
  className,
  children,
  rows = 4,
  ...inputProps
}) => {
  const fullWidthStyle = fullWidth ? "w-full" : "";

  const renderCustomInput = () => (
    <div className="flex flex-col items-stretch w-full">
      <div className="relative flex flex-1">
        <div className="absolute h-full">
          <div
            className={`flex h-full items-start justify-center  p-4 ${
              helperText ? "text-red-400" : "text-brand-300"
            }`}>
            {startIcon}
          </div>
        </div>
        <textarea
          rows={rows}
          {...inputProps}
          className={`flex flex-1 rounded-md border bg-transparent  p-4 text-sm text-white placeholder:text-gray-400 focus:border-brand-400 focus:outline-none focus:ring-1 ${
            startIcon && "pl-14"
          } ${endIcon && "pr-14"} ${
            helperText
              ? "border-red-400 focus:border-red-400 focus:ring-red-500"
              : " border-grey-700 focus:border-grey-700 focus:ring-brand-400"
          } ${fullWidthStyle} ${className}`}>
          {children}
        </textarea>
        <div className="absolute right-0 h-full">{endIcon}</div>
      </div>
      <div className="flex items-end h-6 text-red-400">{helperText}</div>
    </div>
  );

  const renderLabel = () => (
    <label htmlFor={inputProps.id ?? ""} className="font-medium text-gray-600 ">
      {label}{" "}
      {subLabel && (
        <span className="text-sm text-gray-400 dark:text-gray-600">
          ({subLabel})
        </span>
      )}
    </label>
  );

  return (
    <div className={`gap flex flex-col gap-2 text-sm ${fullWidthStyle}`}>
      {renderLabel()}
      {startIcon ? (
        renderCustomInput()
      ) : (
        <>
          <textarea
            rows={rows}
            {...inputProps}
            className={`text-smplaceholder:text-gray-400 rounded-lg border border-gray-200 p-2 focus:outline-none focus:ring-0  md:p-3 ${fullWidthStyle} ${className}`}></textarea>
          <div className="flex items-end h-6 text-red-400">{helperText}</div>
        </>
      )}
    </div>
  );
};

export default TextArea;
