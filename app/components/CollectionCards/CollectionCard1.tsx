import {Image} from '@shopify/hydrogen';
import React, {type FC} from 'react';
import {Link} from '../Link';
import {_getImgRd, _getTagNameRd} from '@/contains/fakeData';
import {type CommonCollectionItemFragment} from 'storefrontapi.generated';

export interface CollectionCard1Props {
  className?: string;
  size?: 'large' | 'normal';
  collection: CommonCollectionItemFragment;
}

const CollectionCard1: FC<CollectionCard1Props> = ({
  className = '',
  size = 'normal',
  collection,
}) => {
  const {
    image: featuredImage,
    title,
    description,
    horizontal_image,
    handle,
  } = collection;

  return (
    <Link
      to={'/collections/' + handle}
      className={`nc-CollectionCard1 flex items-center ${className}`}
    >
      <div
        className={`flex-shrink-0 relative ${
          size === 'large' ? 'w-20 h-20' : 'w-12 h-12'
        } rounded-lg mr-4 overflow-hidden`}
      >
        <Image
          className="absolute inset-0 w-full h-full object-cover"
          data={featuredImage || {}}
          sizes="(max-width: 640px) 100vw, 40vw"
        />
      </div>

      <div>
        {!!title && (
          <h2
            className={`${
              size === 'large' ? 'text-lg' : 'text-base'
            } nc-card-title text-neutral-900 dark:text-neutral-100 font-semibold`}
            dangerouslySetInnerHTML={{__html: title}}
          ></h2>
        )}
        {!!description && (
          <span
            className={`${
              size === 'large' ? 'text-sm' : 'text-xs'
            } block mt-[2px] text-neutral-500 dark:text-neutral-400`}
          >
            {description}
          </span>
        )}
      </div>
    </Link>
  );
};

export default CollectionCard1;
