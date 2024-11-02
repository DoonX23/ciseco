import {useEffect, useMemo} from 'react';
import {useFetcher} from '@remix-run/react';
import type {
  Product,
  ProductSortKeys,
} from '@shopify/hydrogen/storefront-api-types';
import {Skeleton} from '~/components/Skeleton';
import {usePrefixPathWithLocale} from '~/lib/utils';
import ProductCard from './ProductCard';

interface FeaturedProductsProps {
  count: number;
  heading: string;
  onClose?: () => void;
  query?: string;
  reverse?: boolean;
  sortKey: ProductSortKeys;
  className?: string;
  headingClassName?: string;
  isCardSmall?: boolean;
}

/**
 * Display a grid of products and a heading based on some options.
 * This components uses the storefront API products query
 * @param count number of products to display
 * @param query a filtering query
 * @param reverse wether to reverse the product results
 * @param sortKey Sort the underlying list by the given key.
 * @see query https://shopify.dev/api/storefront/current/queries/products
 * @see filters https://shopify.dev/api/storefront/current/queries/products#argument-products-query
 */
export function FeaturedProducts({
  count = 4,
  heading = 'Shop Best Sellers',
  className = 'grid sm:grid-cols-2 gap-x-5 gap-y-8',
  onClose,
  query,
  reverse,
  sortKey = 'BEST_SELLING',
  headingClassName = 'text-xl font-semibold',
  isCardSmall,
}: FeaturedProductsProps) {
  const {load, data} = useFetcher<{products: Product[]}>();
  const queryString = useMemo(
    () =>
      Object.entries({count, sortKey, query, reverse})
        .map(([key, val]) => (val ? `${key}=${val}` : null))
        .filter(Boolean)
        .join('&'),
    [count, sortKey, query, reverse],
  );
  const productsApiPath = usePrefixPathWithLocale(
    `/api/products?${queryString}`,
  );

  useEffect(() => {
    load(productsApiPath);
  }, [load, productsApiPath]);

  return (
    <>
      {!!heading && <h2 className={headingClassName}>{heading}</h2>}
      <div className={className}>
        <FeatureProductsContent
          count={count}
          onClick={onClose}
          products={data?.products}
          isCardSmall={isCardSmall}
        />
      </div>
    </>
  );
}

/**
 * Render the FeaturedProducts content based on the fetcher's state. "loading", "empty" or "products"
 */
function FeatureProductsContent({
  count = 4,
  onClick,
  products,
  isCardSmall,
}: {
  count: FeaturedProductsProps['count'];
  products: Product[] | undefined;
  onClick?: () => void;
  isCardSmall?: boolean;
}) {
  if (!products) {
    return (
      <>
        {[...new Array(count)].map((_, i) => (
          <div key={`${i + 1}`} className="grid gap-2">
            <Skeleton className="aspect-[3/4]" />
            <Skeleton className="w-32 h-4" />
          </div>
        ))}
      </>
    );
  }

  if (products?.length === 0) {
    return <p className="my-2.5">No products found.</p>;
  }

  return (
    <>
      {products.map((product) => (
        <ProductCard
          product={product}
          key={product.id}
          quickAddToCart
          isCardSmall={isCardSmall}
        />
      ))}
    </>
  );
}
