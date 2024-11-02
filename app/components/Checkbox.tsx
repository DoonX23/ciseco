import React, {type FC} from 'react';

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
  subLabel?: string;
  className?: string;
  sizeClassName?: string;
  labelClassName?: string;
}

const Checkbox: FC<CheckboxProps> = ({
  subLabel = '',
  label = '',
  name,
  className = '',
  sizeClassName = 'w-6 h-6',
  labelClassName = '',
  id,
  ...props
}) => {
  return (
    <div className={`flex text-sm xl:text-base ${className}`}>
      <input
        id={id || name}
        name={name}
        type="checkbox"
        className={`focus:ring-action-primary text-primary-500 rounded border-slate-400/80 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 ${sizeClassName}`}
        {...props}
      />
      {label && (
        <label
          htmlFor={id || name}
          className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none text-sm xl:text-base"
        >
          <span
            className={`text-slate-900 dark:text-slate-100 text-sm xl:text-base ${labelClassName} ${
              subLabel ? '-mt-0.5' : ''
            }`}
          >
            {label}
          </span>
          {subLabel && (
            <p className="mt-0.5 text-slate-500 dark:text-slate-400 text-sm font-light">
              {subLabel}
            </p>
          )}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
