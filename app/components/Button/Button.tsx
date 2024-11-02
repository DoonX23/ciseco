import React, {type ButtonHTMLAttributes, type FC} from 'react';
import {Link} from '../Link';
import twFocusClass from '@/utils/twFocusClass';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  translateClass?: string;
  sizeClass?: string;
  fontSize?: string;
  //
  loading?: boolean;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  href?: string;
  targetBlank?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  as?: React.ElementType;
}

const Button: FC<ButtonProps> = ({
  className = 'text-neutral-700 disabled:cursor-not-allowed',
  translateClass = '',
  sizeClass = 'py-3 px-4 lg:py-3.5 lg:px-7',
  fontSize = 'text-sm sm:text-base font-medium',
  disabled = false,
  href,
  children,
  targetBlank,
  type = 'button',
  loading,
  onClick = () => {},
  as,
  ...args
}) => {
  const CLASSES =
    `relative h-auto inline-flex items-center justify-center rounded-full transition-colors ${fontSize} ${sizeClass} ${translateClass} ${className} ` +
    twFocusClass(true);

  const _renderLoading = () => {
    return (
      <svg
        className="-ml-1 mr-3 h-5 w-5 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );
  };

  let Component = as || 'button';
  if (!as) {
    if (href) {
      Component = href.startsWith('http') ? 'a' : Link;
    } else {
      Component = 'button';
    }
  }

  const isButton = Component === 'button';

  return (
    <Component
      className={`${CLASSES}`}
      onClick={onClick}
      type={isButton ? type : undefined}
      target={isButton ? (targetBlank ? '_blank' : '_self') : undefined}
      disabled={isButton ? disabled || loading : undefined}
      to={href}
      {...args}
    >
      {loading && _renderLoading()}
      {children || `This is a button`}
    </Component>
  );
};

export default Button;
