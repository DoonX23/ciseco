import clsx from 'clsx';
import ProductCard, {ProductCardSkeleton} from './ProductCard';
import {getImageLoadingPriority} from '~/lib/const';
import {Product} from '@shopify/hydrogen/storefront-api-types';
import {CommonProductCardFragment} from 'storefrontapi.generated';

export function ProductsGrid({
  nodes,
  className = 'mt-8 lg:mt-10',
  isSkeleton,
}: {
  nodes?: CommonProductCardFragment[];
  className?: string;
  isSkeleton?: boolean;
}) {
  return (
    <div
      className={clsx(
        'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10',
        className,
      )}
    >
      {isSkeleton &&
        [1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => (
          <ProductCardSkeleton key={index} index={index} />
        ))}

      {!isSkeleton &&
        nodes?.map((product, i) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              loading={getImageLoadingPriority(i)}
            />
          );
        })}
    </div>
  );
}
