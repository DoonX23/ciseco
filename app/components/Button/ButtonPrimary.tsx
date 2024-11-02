import React from 'react';
import Button, {type ButtonProps} from './Button';

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = '',
  sizeClass = 'py-3 px-4 lg:py-3.5 lg:px-8',
  ...args
}) => {
  return (
    <Button
      className={`bg-slate-900 text-slate-50 shadow-xl hover:bg-slate-800 disabled:bg-opacity-90 ${className}`}
      sizeClass={sizeClass}
      {...args}
    />
  );
};

export default ButtonPrimary;
