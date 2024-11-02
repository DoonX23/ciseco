import {avatarColors} from '@/contains/contants';
import {type FC} from 'react';
import {Image} from '@shopify/hydrogen';

export interface AvatarProps {
  containerClassName?: string;
  sizeClass?: string;
  radius?: string;
  imgUrl?: string;
  userName?: string;
}

const Avatar: FC<AvatarProps> = ({
  containerClassName = 'ring-1 ring-white dark:ring-neutral-900',
  sizeClass = 'h-6 w-6 text-sm',
  radius = 'rounded-full',
  imgUrl,
  userName,
  ...args
}) => {
  const url = imgUrl || '';
  const name = userName || 'John Doe';
  const _setBgColor = (name: string) => {
    const backgroundIndex = Math.floor(
      name.charCodeAt(0) % avatarColors.length,
    );
    return avatarColors[backgroundIndex];
  };

  return (
    <div
      className={`wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner ${radius} ${sizeClass} ${containerClassName}`}
      style={{backgroundColor: url ? undefined : _setBgColor(name)}}
    >
      {url && (
        <Image
          sizes="100px"
          className={`absolute inset-0 w-full h-full object-cover ${radius}`}
          data={{
            url,
            altText: name,
            width: 100,
            height: 100,
          }}
          {...args}
        />
      )}
      <span className="wil-avatar__name">{name[0]}</span>
    </div>
  );
};

export default Avatar;
