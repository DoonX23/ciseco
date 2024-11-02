import React, {type FC} from 'react';

export interface SocialsList1Props {
  className?: string;
  data: {
    name: string;
    icon: string;
    href: string;
  }[];
}

const SocialsList1: FC<SocialsList1Props> = ({
  className = 'space-y-3',
  data = [],
}) => {
  return (
    <div className={`nc-SocialsList1 ${className}`}>
      {data.map((item, index) => {
        return (
          <a
            href={item.href}
            className="flex items-center text-2xl text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white leading-none space-x-2 group"
            key={`${index + 1}`}
          >
            <div className="flex-shrink-0 w-5 ">
              {item.icon ? (
                <img width={30} sizes="30px" src={item.icon} alt={item.name} />
              ) : (
                <div className="w-5 h-5 rounded-full bg-slate-100" />
              )}
            </div>
            <span className="hidden lg:block text-sm">{item.name}</span>
          </a>
        );
      })}
    </div>
  );
};

export default SocialsList1;
