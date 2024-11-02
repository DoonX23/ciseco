import {type FC} from 'react';
import {Link} from '../Link';
import {Image} from '@shopify/hydrogen';
import {type TImage} from '~/types/type';

export interface CollectionCard2Props {
  className?: string;
  ratioClass?: string;
  backgroundColor?: string;
  featuredImage?: TImage;
  name: string;
  desc: string;
  handle?: string;
}

const CollectionCard2: FC<CollectionCard2Props> = ({
  className = '',
  ratioClass = 'aspect-w-1 aspect-h-1',
  backgroundColor,
  featuredImage,
  name,
  desc,
  handle,
}) => {
  return (
    <Link
      to={'/collections/' + handle}
      className={`nc-CollectionCard2 ${className}`}
    >
      <div
        className={`flex-1 relative w-full h-0 rounded-2xl overflow-hidden group ${ratioClass}`}
        style={{backgroundColor}}
      >
        <div className="pt-14">
          <div className="w-full h-full flex justify-center">
            {!!featuredImage && (
              <Image
                data={featuredImage}
                className="object-cover rounded-2xl"
                sizes="400px"
              />
            )}
          </div>
        </div>
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity rounded-2xl"></span>
      </div>
      <div className="mt-5 flex-1 text-center">
        {!!name && (
          <h2
            className="text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-semibold"
            dangerouslySetInnerHTML={{__html: name}}
          ></h2>
        )}
        <span className="block mt-0.5 sm:mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
          {desc}
        </span>
      </div>
    </Link>
  );
};

export default CollectionCard2;
