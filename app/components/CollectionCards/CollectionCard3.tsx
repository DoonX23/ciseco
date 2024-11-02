import {type FC} from 'react';
import {Link} from '../Link';
import {Image} from '@shopify/hydrogen';
import ButtonSecondary from '../Button/ButtonSecondary';
import {type TImage} from '~/types/type';

export interface CollectionCard3Props {
  className?: string;
  featuredImage?: TImage;
  name?: string;
  desc?: string;
  backgroundColor?: string;
  handle?: string;
}

const CollectionCard3: FC<CollectionCard3Props> = ({
  className = '',
  featuredImage,
  name,
  desc,
  backgroundColor,
  handle,
}) => {
  return (
    <Link
      to={'/collections/' + handle}
      className={`nc-CollectionCard3 block ${className}`}
    >
      <div
        className={`relative w-full aspect-w-16 aspect-h-11 sm:aspect-h-9 h-0 rounded-2xl overflow-hidden group`}
        style={{backgroundColor}}
      >
        <div>
          <div className="absolute inset-5 sm:inset-8">
            {!!featuredImage && (
              <Image
                data={featuredImage}
                className="absolute end-0 w-1/2 max-w-[260px] h-full object-contain drop-shadow-xl"
              />
            )}
          </div>
        </div>
        <span className="opacity-0 group-hover:opacity-40 absolute inset-0 bg-black/10 transition-opacity"></span>

        <div>
          <div className="absolute inset-5 sm:inset-8 flex flex-col">
            <div className="max-w-xs">
              {!!name && (
                <span
                  className={`block mb-2 text-sm text-slate-700`}
                  dangerouslySetInnerHTML={{__html: name}}
                ></span>
              )}
              {desc && (
                <h2
                  className={`text-xl md:text-2xl text-slate-900 font-semibold`}
                  dangerouslySetInnerHTML={{__html: desc || ''}}
                ></h2>
              )}
            </div>
            <div className="mt-auto">
              <ButtonSecondary
                sizeClass="py-3 px-4 sm:py-3.5 sm:px-6"
                fontSize="text-sm font-medium"
                className="nc-shadow-lg"
              >
                Show me all
              </ButtonSecondary>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard3;
