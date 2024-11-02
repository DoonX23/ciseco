import React from 'react';

export const Empty = ({
  description = 'We couldn’t find any results. Try for something else.',
  className = '',
}: {
  description?: string;
  className?: string;
}) => {
  return (
    <div className={'text-center ' + className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
        className="inline-block h-12 w-12 text-slate-400 "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
        ></path>
      </svg>
      <h3 className="mt-2 text-sm font-semibold text-gray-900">
        No results found.
      </h3>
      <div
        className="mt-1 text-sm text-gray-500"
        dangerouslySetInnerHTML={{__html: description}}
      ></div>
    </div>
  );
};
