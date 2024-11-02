import React, {type FC} from 'react';

export interface BackgroundSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const BackgroundSection: FC<BackgroundSectionProps> = ({
  className = 'bg-neutral-100/70 dark:bg-black/20',
  ...arg
}) => {
  return (
    <div
      className={`nc-BackgroundSection absolute inset-y-0 w-screen xl:max-w-[1340px] 2xl:max-w-screen-2xl left-1/2 transform -translate-x-1/2 xl:rounded-[40px] -z-10 ${className}`}
      {...arg}
    />
  );
};

export default BackgroundSection;
