import {type FC} from 'react';
import Prices from './Prices';
import {StarIcon} from '@heroicons/react/24/solid';
import {Image} from '@shopify/hydrogen';
import {Link} from './Link';
import {type ProductCardProps} from './ProductCard';
import {
  ThumbnailSkeletons1,
  ThumbnailSkeletons2,
  ThumbnailSkeletons3,
  ThumbnailSkeletons4,
} from './ThumbnailSkeletons';
import {getProductFeatureText} from '~/utils/getProductFeatureText';
import {OkendoStarRating} from '@okendo/shopify-hydrogen';

const ProductCardLarge: FC<ProductCardProps> = ({
  className = '',
  product,
  loading,
}) => {
  const {id, handle, title, images, okendoStarRatingSnippet} = product;

  const isSale =
    Number(product.compareAtPriceRange.minVariantPrice.amount) >
    Number(product.priceRange.minVariantPrice.amount);
  //

  const hasReviews = !!okendoStarRatingSnippet;

  const image0 = images?.edges[0]?.node;
  const image1 = images?.edges[1]?.node || image0;
  const image2 = images?.edges[2]?.node || image1;
  const image3 = images?.edges[3]?.node || image2;
  const featureText = getProductFeatureText({
    outstanding_features: product.outstanding_features,
    variants: product.variants,
  });

  return (
    <div className={`ProductCardLarge group relative ${className}`}>
      <div className="relative flex flex-col">
        <div className="aspect-w-8 aspect-h-6 bg-neutral-100 rounded-2xl overflow-hidden">
          {image0 && (
            <Image
              className="object-cover w-full h-full rounded-2xl"
              data={image0}
              sizes="400px"
              loading={loading}
            />
          )}
        </div>
        <div className="grid grid-cols-3 gap-2.5 mt-2.5">
          <div className="w-full h-24 sm:h-28 bg-neutral-100 rounded-2xl">
            {image1 && (
              <Image
                className="object-cover w-full h-full rounded-2xl"
                data={image1}
                sizes="150px"
                loading={loading}
              />
            )}
          </div>
          <div className="w-full h-24 sm:h-28 bg-neutral-100 rounded-2xl">
            {image2 && (
              <Image
                className="object-cover w-full h-full rounded-2xl"
                data={image2}
                sizes="150px"
                loading={loading}
              />
            )}
          </div>
          <div className="w-full h-24 sm:h-28 bg-neutral-100 rounded-2xl">
            {image3 && (
              <Image
                className="object-cover w-full h-full rounded-2xl"
                data={image3}
                sizes="150px"
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>

      <div className="relative mt-5 flex justify-between gap-4">
        {/* TITLE */}
        <div className="flex-1">
          <h2 className="font-semibold text-lg sm:text-xl ">{title}</h2>
          {/* AUTHOR */}
          <div className="mt-3 flex items-center text-slate-500 dark:text-slate-400">
            <span className="text-sm ">
              <span className="line-clamp-1 capitalize">{featureText}</span>
            </span>
            {featureText && hasReviews && (
              <span className="h-5 mx-1 sm:mx-2 border-l border-slate-200 dark:border-slate-700" />
            )}

            <OkendoStarRating
              productId={product.id}
              okendoStarRatingSnippet={product.okendoStarRatingSnippet}
            />
          </div>
        </div>
        <Prices
          price={product.priceRange.minVariantPrice}
          compareAtPrice={
            isSale ? product.compareAtPriceRange.minVariantPrice : undefined
          }
          withoutTrailingZeros={
            Number(product.priceRange.minVariantPrice.amount || 1) > 99
          }
        />
      </div>
      <Link
        to={'/products/' + handle}
        className="absolute inset-0"
        prefetch="viewport"
      >
        <span className="sr-only">{title}</span>
      </Link>
    </div>
  );
};

export const ProductCardLargeSkeleton = ({
  className = '',
}: {
  className?: string;
}) => {
  return (
    <div className={`ProductCardLarge group relative ` + className}>
      <div className="relative flex flex-col">
        <div className="aspect-w-8 aspect-h-6 bg-neutral-100 rounded-2xl overflow-hidden">
          <ThumbnailSkeletons1 className="w-full h-full object-cover rounded-2xl" />
        </div>
        <div className="grid grid-cols-3 gap-2.5 mt-2.5">
          <div className="w-full h-24 sm:h-28 bg-neutral-100 rounded-2xl">
            <ThumbnailSkeletons2 className="w-full h-full object-cover rounded-2xl" />
          </div>
          <div className="w-full h-24 sm:h-28 bg-neutral-100 rounded-2xl">
            <ThumbnailSkeletons3 className="w-full h-full object-cover rounded-2xl" />
          </div>
          <div className="w-full h-24 sm:h-28 bg-neutral-100 rounded-2xl">
            <ThumbnailSkeletons4 className="w-full h-full object-cover rounded-2xl" />
          </div>
        </div>
      </div>

      <div className="relative mt-5 flex justify-between gap-4">
        {/* TITLE */}
        <div className="flex-1">
          <h2 className="font-semibold text-lg sm:text-xl ">Product Title</h2>
          {/* AUTHOR */}
          <div className="mt-3 flex items-center text-slate-500 dark:text-slate-400">
            <span className="text-sm ">
              <span className="line-clamp-1 capitalize">The best feature</span>
            </span>
            <span className="h-5 mx-1 sm:mx-2 border-l border-slate-200 dark:border-slate-700" />

            <>
              <div className="flex">
                <StarIcon className="w-4 h-4 text-amber-400" />
                <span className="text-sm ml-1">
                  <span className="line-clamp-1">5.0 (78 reviews)</span>
                </span>
              </div>
            </>
          </div>
        </div>
        <Prices
          price={{
            amount: '100.00',
            currencyCode: 'USD',
          }}
        />
      </div>
    </div>
  );
};

export default ProductCardLarge;
