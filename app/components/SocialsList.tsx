import React, {type FC} from 'react';

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
  data?: {
    name: string;
    icon: string;
    href: string;
  }[];
}

const SocialsList: FC<SocialsListProps> = ({
  className = '',
  itemClass = 'block w-6 h-6',
  data = [],
}) => {
  return (
    <nav
      className={`nc-SocialsList flex flex-wrap gap-2.5 text-2xl text-neutral-600 ${className}`}
    >
      {data.map((item, i) => (
        <a
          key={`${i + item.name}`}
          className={`${itemClass}`}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={item.name}
        >
          <span className="sr-only">{item.name}</span>
          {item.icon ? (
            <img
              width={30}
              className="w-full"
              sizes="32px"
              src={item.icon}
              alt={item.name}
            />
          ) : (
            <div className="w-full h-full bg-slate-200 rounded-full"></div>
          )}
        </a>
      ))}
    </nav>
  );
};

export default SocialsList;
