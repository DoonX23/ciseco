import {useFetcher} from '@remix-run/react';
import {routeHeaders} from '~/data/cache';
import {COMMON_PRODUCT_CARD_FRAGMENT} from '~/data/commonFragments';
import {type Product} from '@shopify/hydrogen/storefront-api-types';
import {useEffect, useMemo, useState} from 'react';
import {usePrefixPathWithLocale} from '~/lib/utils';
import {Skeleton} from '~/components/Skeleton';
import ProductCard from '~/components/ProductCard';
import {Empty} from '~/components/Empty';
import PageHeader from '~/components/PageHeader';
import {FireIcon} from '@heroicons/react/24/outline';

export const headers = routeHeaders;

export default function Wishlists() {
  const {load, data} = useFetcher<{products: Product[]}>();
  const [queryIds, setQueryIds] = useState<string[]>();

  const queryString = useMemo(() => {
    if (!queryIds) return '';
    const count =
      queryIds.length > 100 || queryIds.length < 0 ? 100 : queryIds.length;
    return Object.entries({
      count,
      query: `id:${queryIds.join(' OR ')}`,
      reverse: false,
    })
      .map(([key, val]) => (val ? `${key}=${val}` : null))
      .filter(Boolean)
      .join('&');
  }, [queryIds]);

  const productsApiPath = usePrefixPathWithLocale(
    `/api/products?${queryString}`,
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const likedProducts = JSON.parse(
      localStorage.getItem('likedProducts') || '[]',
    ) as string[];

    // gid://shopify/Product/8403208012031
    // regex to get the id
    const parsedLikedProducts = likedProducts
      .map((product) => {
        const id = product.match(/Product\/(\d+)/);
        return id ? id[1] : null;
      })
      .filter(Boolean) as string[];

    setQueryIds(parsedLikedProducts);
  }, []);

  useEffect(() => {
    if (!queryIds) return;

    load(productsApiPath);
  }, [load, productsApiPath, queryIds]);

  const products = data?.products;

  const renderMain = () => {
    if (!products) {
      return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-x-8 lg:gap-y-10">
          {[...new Array(12)].map((_, i) => (
            <div key={`${i + 1}`} className="flex flex-col gap-2.5">
              <Skeleton className="aspect-[1/1]" />
              <Skeleton className="w-32 h-4" />
            </div>
          ))}
        </div>
      );
    }

    if (!products?.length) {
      return (
        <Empty description="You have not added any products to your wishlist yet." />
      );
    }

    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-x-8 lg:gap-y-10">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} quickAddToCart />
        ))}
      </div>
    );
  };

  return (
    <div className={`nc-wishlists py-12 sm:py-16 lg:pb-28 lg:pt-20`}>
      <div className="container space-y-24 lg:space-y-32">
        <div className="space-y-10 lg:space-y-14">
          {/* HEADING */}

          <div>
            <div className="flex items-center text-sm font-medium gap-2 text-neutral-500 mb-2">
              <FireIcon className="w-5 h-5" />
              <span className="text-neutral-700 ">
                {queryIds?.length || 0} Saved
              </span>
            </div>
            <PageHeader
              title={'Wishlists'}
              hasBreadcrumb={true}
              breadcrumbText={'Wishlists'}
            />
          </div>

          <hr />

          {renderMain()}
        </div>
      </div>
    </div>
  );
}

const PRODUCTS_BY_HANDLES_QUERY = `#graphql
  query ProductsByHandles(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    $query: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor, query: $query) {
      nodes {
        ...CommonProductCard
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${COMMON_PRODUCT_CARD_FRAGMENT}
` as const;
