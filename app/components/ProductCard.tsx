import {type FC} from 'react';
import Prices from './Prices';
import {StarIcon} from '@heroicons/react/24/solid';
import ProductStatus from './ProductStatus';
import {Image} from '@shopify/hydrogen';
import {Link} from './Link';
import {type CommonProductCardFragment} from 'storefrontapi.generated';
import {useGetPublicStoreCdnStaticUrlFromRootLoaderData} from '~/hooks/useGetPublicStoreCdnStaticUrlFromRootLoaderData';
import LikeButton from './LikeButton';
import {isNewArrival} from '~/lib/utils';
import {
  type SelectedOption,
  type MoneyV2,
} from '@shopify/hydrogen/storefront-api-types';
import {AddToCartButton} from './AddToCartButton';
import ButtonSecondary from './Button/ButtonSecondary';
import ButtonPrimary from './Button/ButtonPrimary';
import BagIcon from './BagIcon';
import {NoSymbolIcon} from '@heroicons/react/24/outline';
import {getThumbnailSkeletonByIndex} from './ThumbnailSkeletons';
import {getProductFeatureText} from '~/utils/getProductFeatureText';
import {OkendoStarRating} from '@okendo/shopify-hydrogen';
import {useAside} from './Aside';
import {getVariantUrl, useVariantUrl} from '~/lib/variants';
import {useLocation} from '@remix-run/react';

export interface ProductCardProps {
  className?: string;
  product: CommonProductCardFragment;
  loading?: HTMLImageElement['loading'];
  quickAddToCart?: boolean;
  isCardSmall?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  className = '',
  product,
  loading,
  quickAddToCart = true,
  isCardSmall = false,
}) => {
  const {
    id,
    handle,
    title,
    options,
    featuredImage,
    variants,
    outstanding_features,
    okendoStarRatingSnippet,
  } = product;

  const firstVariant = variants?.nodes?.[0];

  const optColor = options.find((option) => option.name === 'Color');
  const optSizes = options.find((option) => option.name === 'Size');
  // const isSale =
  //   Number(product.compareAtPriceRange.minVariantPrice.amount) >
  //   Number(product.priceRange.minVariantPrice.amount);
  //
  const {open} = useAside();
  const variantUrl = useVariantUrl(
    product.handle,
    firstVariant.selectedOptions,
  );
  const {pathname} = useLocation();
  const {getImageWithCdnUrlByName} =
    useGetPublicStoreCdnStaticUrlFromRootLoaderData();

  const renderColorOptions = () => {
    if (!optColor || optColor.values.length < 2) {
      return null;
    }

    return (
      <div className="flex items-center flex-wrap gap-3">
        {optColor?.values.map((color, index) => {
          if (index >= 5) {
            return null;
          }
          return (
            <Link
              key={color}
              className={`relative w-4 h-4 rounded-full overflow-hidden cursor-pointer`}
              title={color}
              aria-hidden
              to={getProductUrlWithSelectedOption({
                pathname,
                productHandle: product.handle,
                selectedOptions: [
                  {
                    name: 'Color',
                    value: color,
                  },
                ],
              })}
            >
              <div className="absolute inset-0 rounded-full overflow-hidden z-0 object-cover flex">
                <Image
                  data={{
                    url: getImageWithCdnUrlByName(color.replaceAll(/ /g, '_')),
                    altText: color,
                  }}
                  width={20}
                  height={20}
                  aspectRatio="1/1"
                  className="rounded-full"
                  sizes="(max-width: 640px) 16px, 20px"
                />
              </div>
            </Link>
          );
        })}
        {optColor.values.length > 5 && (
          <div className="block ps-1 text-sm">
            <span>+</span>
          </div>
        )}
      </div>
    );
  };

  const renderWishlistButton = () => {
    return (
      <>
        <LikeButton id={id} className="absolute top-3 end-3 z-10" />
      </>
    );
  };

  const renderSizeList = () => {
    const sizes = optSizes?.values;

    if (!sizes || !sizes.length || quickAddToCart) {
      return null;
    }

    return (
      <div className="absolute bottom-0 inset-x-3 gap-1.5 flex justify-center opacity-0 invisible group-hover:bottom-4 group-hover:opacity-100 group-hover:visible transition-all">
        <div className="flex justify-center flex-wrap gap-1.5">
          {sizes.map((size, index) => {
            if (index >= 4) {
              return null;
            }
            return (
              <Link
                key={`${index + size}`}
                className="nc-shadow-lg min-w-10 h-10 flex-shrink-0 px-2 rounded-xl bg-white transition-colors cursor-pointer flex items-center justify-center font-semibold tracking-tight text-sm text-slate-900 hover:bg-slate-50"
                to={getProductUrlWithSelectedOption({
                  pathname,
                  productHandle: product.handle,
                  selectedOptions: [
                    {
                      name: 'Size',
                      value: size,
                    },
                  ],
                })}
              >
                <span className="line-clamp-1">{size}</span>
              </Link>
            );
          })}
          {sizes.length > 4 && (
            <Link
              prefetch="intent"
              to={variantUrl}
              className="nc-shadow-lg min-w-10 h-10 flex-shrink-0 px-2 rounded-xl bg-white transition-colors cursor-pointer flex items-center justify-center font-semibold tracking-tight text-sm text-slate-900 hover:bg-slate-50"
            >
              <span className="-ml-0.5">+{sizes.length - 4}</span>
            </Link>
          )}
        </div>
      </div>
    );
  };

  const renderGroupButtons = () => {
    if (!quickAddToCart) {
      return null;
    }
    return (
      <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        {firstVariant.availableForSale && (
          <AddToCartButton
            lines={[
              {
                quantity: 1,
                merchandiseId: firstVariant.id,
                selectedVariant: firstVariant,
              },
            ]}
            onClick={() => open('cart')}
          >
            <ButtonPrimary
              className="shadow-lg"
              fontSize="text-xs"
              sizeClass="py-2 px-4"
              as="span"
            >
              <BagIcon className="w-3.5 h-3.5 mb-0.5" />
              <span className="ms-1">Add to bag</span>
            </ButtonPrimary>
          </AddToCartButton>
        )}
        {!firstVariant.availableForSale && (
          <ButtonSecondary
            className="ms-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
            fontSize="text-xs"
            sizeClass="py-2 px-4"
            disabled
          >
            <NoSymbolIcon className="w-3.5 h-3.5" />
            <span className="ms-1">Soul out</span>
          </ButtonSecondary>
        )}
      </div>
    );
  };

  const image = firstVariant?.image || featuredImage;
  return (
    <>
      <div
        className={`ProductCard relative flex flex-col bg-transparent ${className}`}
      >
        <Link to={variantUrl} className="absolute inset-0" prefetch="viewport">
          <span className="sr-only">{title}</span>
        </Link>

        <div className="relative flex-shrink-0 bg-slate-50 border border-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group ">
          <Link to={variantUrl} className="block">
            <div className="flex aspect-w-15 aspect-h-16 w-full group-hover:opacity-80 transition-opacity">
              {image && (
                <Image
                  data={{...image, width: undefined, height: undefined}}
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  loading={loading}
                />
              )}
            </div>
          </Link>
          <ProductBadge
            status={getProductStatus({
              availableForSale: product.availableForSale,
              compareAtPriceRangeMinVariantPrice:
                product.compareAtPriceRange.minVariantPrice,
              priceRangeMinVariantPrice: product.priceRange.minVariantPrice,
              publishedAt: product.publishedAt,
            })}
          />
          {renderWishlistButton()}
          {renderSizeList()}
          {renderGroupButtons()}
        </div>

        <div className="space-y-4 px-2.5 pt-5 pb-2.5">
          {renderColorOptions()}
          <div>
            <h2
              className="nc-ProductCard__title text-base font-semibold transition-colors"
              title={title}
            >
              {title}
            </h2>
            <p
              className={`text-sm text-slate-500 dark:text-slate-400 mt-1 capitalize`}
            >
              {getProductFeatureText({
                outstanding_features,
                variants,
              })}
            </p>
          </div>

          <div className="flex justify-between items-end gap-2">
            <Prices
              price={product.priceRange.minVariantPrice}
              // compareAtPrice={
              //   isSale ? product.compareAtPriceRange.minVariantPrice : undefined
              // }
              withoutTrailingZeros={
                Number(product.priceRange.minVariantPrice.amount || 1) > 99
              }
            />
            {!isCardSmall && (
              <OkendoStarRating
                productId={id}
                okendoStarRatingSnippet={okendoStarRatingSnippet}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const ProductBadge = ({
  status,
  className,
}: {
  status: 'Sold out' | 'Sale' | 'New' | null;
  className?: string;
}) => {
  if (!status) {
    return null;
  }

  if (status === 'Sold out') {
    return (
      <ProductStatus
        className={className}
        color="zinc"
        status={status}
        icon="NoSymbolIcon"
      />
    );
  }

  if (status === 'Sale') {
    return (
      <ProductStatus
        className={className}
        color="rose"
        status={status}
        icon="IconDiscount"
      />
    );
  }

  if (status === 'New') {
    return (
      <ProductStatus
        className={className}
        color="green"
        status={status}
        icon="SparklesIcon"
      />
    );
  }

  return null;
};

export const getProductStatus = ({
  availableForSale,
  compareAtPriceRangeMinVariantPrice,
  priceRangeMinVariantPrice,
  publishedAt,
}: {
  availableForSale: boolean;
  compareAtPriceRangeMinVariantPrice?: Pick<MoneyV2, 'amount' | 'currencyCode'>;
  priceRangeMinVariantPrice?: Pick<MoneyV2, 'amount' | 'currencyCode'>;
  publishedAt: string;
}) => {
  const isSale =
    compareAtPriceRangeMinVariantPrice?.amount &&
    priceRangeMinVariantPrice?.amount &&
    Number(compareAtPriceRangeMinVariantPrice?.amount) >
      Number(priceRangeMinVariantPrice.amount);

  if (!availableForSale) {
    return 'Sold out';
  }

  if (isSale && availableForSale) {
    return 'Sale';
  }

  if (isNewArrival(publishedAt)) {
    return 'New';
  }

  return null;
};

export function getProductUrlWithSelectedOption({
  productHandle,
  selectedOptions,
  pathname,
}: {
  productHandle: string;
  pathname: string;
  selectedOptions: SelectedOption[];
}) {
  return getVariantUrl({
    handle: productHandle,
    pathname,
    searchParams: new URLSearchParams(),
    selectedOptions,
  });
}

export const ProductCardSkeleton = ({
  className = '',
  index = 0,
}: {
  className?: string;
  index?: number;
}) => {
  const ThumbnailSkeleton = getThumbnailSkeletonByIndex(index);

  return (
    <div
      className={
        `ProductCard relative flex flex-col bg-transparent ` + className
      }
    >
      <div className="relative flex-shrink-0 bg-slate-50 border border-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group ">
        <div className="flex aspect-w-15 aspect-h-16 w-full group-hover:opacity-80 transition-opacity">
          <ThumbnailSkeleton />
        </div>
      </div>

      <div className="space-y-4 px-2.5 pt-5 pb-2.5">
        <div className="flex items-center flex-wrap gap-3">
          {[1, 1, 1, 1].map((_, index) => {
            if (index >= 5) {
              return null;
            }
            return (
              <div
                key={'_' + index.toString()}
                className={`relative w-4 h-4 rounded-full bg-slate-100 overflow-hidden cursor-pointer`}
              ></div>
            );
          })}
        </div>
        <div>
          <h2 className="nc-ProductCard__title text-base font-semibold transition-colors">
            Product title
          </h2>
          <p
            className={`text-sm text-slate-500 dark:text-slate-400 mt-1 capitalize`}
          >
            Outstanding feature
          </p>
        </div>

        <div className="flex justify-between items-end gap-2">
          <Prices
            price={{
              amount: '100.00',
              currencyCode: 'USD',
            }}
          />
          <>
            <div className="flex">
              <StarIcon className="w-4 h-4 text-amber-400" />
              <span className="text-sm ml-1">
                <span className="line-clamp-1">5.0 (28 reviews)</span>
              </span>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
