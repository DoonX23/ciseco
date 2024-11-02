import React, {type FC, HtmlHTMLAttributes, InputHTMLAttributes} from 'react';

interface Props extends React.SVGProps<SVGSVGElement> {}

export const MySortIcon: FC<Props> = ({
  className = 'w-4 h-4 flex-shrink-0',
  ...args
}) => {
  return (
    <svg className={className} {...args} viewBox="0 0 20 20" fill="none">
      <path
        d="M11.5166 5.70834L14.0499 8.24168"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5166 14.2917V5.70834"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.48327 14.2917L5.94995 11.7583"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.48315 5.70834V14.2917"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0001 18.3333C14.6025 18.3333 18.3334 14.6024 18.3334 10C18.3334 5.39763 14.6025 1.66667 10.0001 1.66667C5.39771 1.66667 1.66675 5.39763 1.66675 10C1.66675 14.6024 5.39771 18.3333 10.0001 18.3333Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
