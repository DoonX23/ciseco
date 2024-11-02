import React, {useEffect, useState, type FC} from 'react';
import {ArrowUpRightIcon, FireIcon} from '@heroicons/react/24/outline';
import {Image} from '@shopify/hydrogen';
import {Link} from '../Link';
import {aCollectionSvgs} from '~/contains/fakeData';
import {type CommonCollectionItemFragment} from 'storefrontapi.generated';
import {ThumbnailSkeletons1} from '../ThumbnailSkeletons';

export interface CollectionCard4Props {
  className?: string;
  bgSVG?: string;
  count?: number;
  loading?: HTMLImageElement['loading'];
  collection: CommonCollectionItemFragment;
  bgColor?: string;
}

const CollectionCard4: FC<CollectionCard4Props> = ({
  className = '',
  count,
  loading,
  collection,
  bgSVG: bgSVGProp,
  bgColor = 'bg-white',
}) => {
  const {image: featuredImage, title, description, handle} = collection;

  const [bgSVG, setBgSVG] = useState<string | undefined>(bgSVGProp);

  useEffect(() => {
    if (bgSVGProp) return;
    setBgSVG(aCollectionSvgs[Math.floor(Math.random() * 9)]);
  }, [bgSVGProp]);

  return (
    <div
      className={`nc-CollectionCard4 relative w-full aspect-w-12 aspect-h-11 h-0 rounded-3xl overflow-hidden group ${className} ${bgColor}`}
    >
      <div>
        <div className="absolute bottom-0 right-0 max-w-[280px] opacity-80 w-full">
          {!!bgSVG && (
            <img
              src={bgSVG}
              alt="bgSVG"
              sizes="(max-width: 640px) 100vw, 280px"
            />
          )}
        </div>

        <div className="absolute inset-5 sm:inset-8 flex flex-col justify-between gap-5 sm:pe-5">
          <div className="flex justify-between items-center">
            <div className="w-20 h-20 relative rounded-full overflow-hidden bg-slate-100 z-0">
              {featuredImage && (
                <Image
                  data={featuredImage}
                  className="absolute inset-0 w-full h-full object-cover z-0 rounded-full"
                  width={80}
                  height={80}
                  loading={loading}
                  sizes="80px"
                />
              )}
            </div>
          </div>

          <div className="">
            <span className="flex items-center mb-2 text-sm text-slate-700">
              <FireIcon className="w-4 h-4 me-1.5" />
              {count} products
            </span>
            {!!title && (
              <h2
                className={`text-2xl sm:text-3xl font-semibold`}
                dangerouslySetInnerHTML={{__html: title || ''}}
              />
            )}
          </div>

          <Link
            to={'/collections/' + handle}
            className="flex items-center text-sm font-medium group-hover:text-primary-500 transition-colors"
          >
            <span>See Collection</span>
            <ArrowUpRightIcon className="w-4 h-4 ms-2.5" />
          </Link>
        </div>
      </div>

      <Link to={'/collections/' + handle}>
        <span className="sr-only">{title}</span>
      </Link>
    </div>
  );
};

export const CollectionCard4Skeleton: FC<
  Pick<CollectionCard4Props, 'className' | 'bgColor' | 'bgSVG'>
> = ({className = '', bgSVG: bgSVGProp, bgColor = 'bg-white'}) => {
  const [bgSVG, setBgSVG] = useState<string | undefined>(bgSVGProp);

  useEffect(() => {
    if (bgSVGProp) return;
    setBgSVG(aCollectionSvgs[Math.floor(Math.random() * 9)]);
  }, [bgSVGProp]);

  return (
    <div
      className={`nc-CollectionCard4 relative w-full aspect-w-12 aspect-h-11 h-0 rounded-3xl overflow-hidden group ${className} ${bgColor}`}
    >
      <div>
        <div className="absolute bottom-0 right-0 max-w-[280px] opacity-80 w-full">
          {!!bgSVG && (
            <img
              src={bgSVG}
              alt="bgSVG"
              sizes="(max-width: 640px) 100vw, 280px"
            />
          )}
        </div>

        <div className="absolute inset-5 sm:inset-8 flex flex-col justify-between gap-5 sm:pe-5">
          <div className="flex justify-between items-center">
            <div className="w-20 h-20 relative rounded-full overflow-hidden bg-slate-100 z-0">
              <ThumbnailSkeletons1 className="w-full h-full rounded-full" />
            </div>
          </div>

          <div className="">
            <span className="flex items-center mb-2 text-sm text-slate-700">
              <FireIcon className="w-4 h-4 me-1.5" />
              99 products
            </span>
            <h2 className={`text-2xl sm:text-3xl font-semibold`}>
              Collection title
            </h2>
          </div>

          <div className="flex items-center text-sm font-medium group-hover:text-primary-500 transition-colors">
            <span>See Collection</span>
            <ArrowUpRightIcon className="w-4 h-4 ms-2.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard4;
