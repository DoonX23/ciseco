import React, {type FC} from 'react';
import explore1Svg from '@/assets/images/collections/explore1.svg?url';
import {ArrowRightIcon} from '@heroicons/react/24/outline';
import {Image} from '@shopify/hydrogen';
import {Link} from '../Link';
import {type TImage} from '~/types/type';
import {type CommonCollectionItemFragment} from 'storefrontapi.generated';

export interface CollectionCard6Props {
  className?: string;
  featuredImage?: TImage;
  bgSVG?: string;
  collection: CommonCollectionItemFragment;
}

const CollectionCard6: FC<CollectionCard6Props> = ({
  className = '',
  bgSVG = explore1Svg,
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
    <div
      className={`nc-CollectionCard6 relative w-full aspect-w-1 aspect-h-1 h-0 rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 group hover:nc-shadow-lg transition-shadow ${className}`}
    >
      <div>
        <div className="absolute bottom-0 right-0 top-0 opacity-10">
          <img src={bgSVG} alt="" />
        </div>

        <div className="absolute inset-5 flex flex-col justify-between items-center">
          <div className="flex justify-center items-center">
            <div
              className={`w-20 h-20 rounded-full overflow-hidden bg-slate-100 z-0`}
            >
              {!!featuredImage && <Image data={featuredImage} />}
            </div>
          </div>

          <div className="text-center">
            <span
              className={`block mb-1 text-sm text-slate-500 dark:text-slate-400`}
            >
              {description}
            </span>
            {!!title && (
              <h2
                className={`text-lg sm:text-xl font-semibold`}
                dangerouslySetInnerHTML={{__html: title}}
              ></h2>
            )}
          </div>

          <Link
            to={'/collections/' + handle}
            className="flex items-center text-sm font-medium group-hover:text-primary-500 transition-colors"
          >
            <span>See Collection</span>
            <ArrowRightIcon className="w-4 h-4 ml-2.5" />
          </Link>
        </div>
      </div>

      <Link to={'/collections/' + handle}>
        <span className="sr-only">{title}</span>
      </Link>
    </div>
  );
};

export default CollectionCard6;
