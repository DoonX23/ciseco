import {
  defer,
  type LoaderFunctionArgs,
  type MetaArgs,
} from '@shopify/remix-oxygen';
import {Await, useLoaderData} from '@remix-run/react';
import type {Filter} from '@shopify/hydrogen/storefront-api-types';
import {Pagination, Analytics, getSeoMeta} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';
import {routeHeaders} from '~/data/cache';
import {seoPayload} from '~/lib/seo.server';
import {SortFilter} from '~/components/SortFilter';
import {COMMON_PRODUCT_CARD_FRAGMENT} from '~/data/commonFragments';
import ButtonPrimary from '~/components/Button/ButtonPrimary';
import {RouteContent} from '~/sections/RouteContent';
import PageHeader from '~/components/PageHeader';
import {getProductTotalByFilter} from '~/utils/getProductTotalByFilter';
import {Empty} from '~/components/Empty';
import {FireIcon} from '@heroicons/react/24/outline';
import {getPaginationAndFiltersFromRequest} from '~/utils/getPaginationAndFiltersFromRequest';
import {getLoaderRouteFromMetaobject} from '~/utils/getLoaderRouteFromMetaobject';
import {ProductsGrid} from '~/components/ProductsGrid';
import clsx from 'clsx';
import {Suspense} from 'react';

export const headers = routeHeaders;

export async function loader({params, request, context}: LoaderFunctionArgs) {
  const {collectionHandle} = params;
  const locale = context.storefront.i18n;

  invariant(collectionHandle, 'Missing collectionHandle param');

  // Query the route metaobject
  const routePromise = getLoaderRouteFromMetaobject({
    params,
    context,
    request,
    handle: 'route-collection',
  });

  const {paginationVariables, filters, sortKey, reverse} =
    getPaginationAndFiltersFromRequest(request);

  // 2. Query the colelction details
  const [{collection}] = await Promise.all([
    context.storefront.query(COLLECTION_QUERY, {
      variables: {
        ...paginationVariables,
        handle: collectionHandle,
        filters,
        sortKey,
        reverse,
        country: context.storefront.i18n.country,
        language: context.storefront.i18n.language,
      },
    }),
  ]);

  if (!collection) {
    throw new Response('collection', {status: 404});
  }

  const seo = seoPayload.collection({collection, url: request.url});

  const defaultPriceFilter = collection.productsWithDefaultFilter.filters.find(
    (filter) => filter.id === 'filter.v.price',
  );

  return defer({
    routePromise,
    collection,
    defaultPriceFilter: {
      value: defaultPriceFilter?.values[0] ?? null,
      locale,
    },
    seo,
  });
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Collection() {
  const {collection, defaultPriceFilter, routePromise} =
    useLoaderData<typeof loader>();

  const noResults = !collection.products.nodes.length;

  const totalProducts = noResults
    ? 0
    : getProductTotalByFilter(collection.products.filters?.[0]?.values as any);

  return (
    <div
      className={clsx(
        `nc-PageCollection pt-16 lg:pt-24 pb-20 lg:pb-28 xl:pb-32`,
        'space-y-20 sm:space-y-24 lg:space-y-28',
      )}
    >
      <div className="container">
        <div className="space-y-14 lg:space-y-24">
          {/* HEADING */}
          <div>
            <div className="flex items-center text-sm font-medium gap-2 text-neutral-500 mb-2">
              <FireIcon className="w-5 h-5" />
              <span className="text-neutral-700 ">
                {totalProducts} products
              </span>
            </div>
            <PageHeader
              // remove the html tags on title
              title={collection.title.replace(/(<([^>]+)>)/gi, '')}
              description={collection.description}
              hasBreadcrumb={false}
              breadcrumbText={collection.title}
            />
          </div>

          <main>
            {/* TABS FILTER */}
            <SortFilter
              filters={collection.products.filters as Filter[]}
              defaultPriceFilter={defaultPriceFilter}
            />

            <hr className="mt-8 mb-8 lg:mb-12" />
            {/* LOOP ITEMS */}
            <>
              {!noResults ? (
                <Pagination connection={collection.products}>
                  {({
                    nodes,
                    isLoading,
                    PreviousLink,
                    previousPageUrl,
                    NextLink,
                    nextPageUrl,
                    hasNextPage,
                    state,
                    hasPreviousPage,
                  }) => (
                    <>
                      {hasPreviousPage && (
                        <div className="flex items-center justify-center my-14">
                          <ButtonPrimary
                            loading={isLoading}
                            href={previousPageUrl.replace(/%3D$/, '=')}
                          >
                            {'Load previous products'}
                          </ButtonPrimary>
                        </div>
                      )}
                      <ProductsGrid nodes={nodes} />
                      {hasNextPage && (
                        <div className="flex items-center justify-center mt-14">
                          <ButtonPrimary
                            loading={isLoading}
                            href={nextPageUrl.replace(/%3D$/, '=')}
                          >
                            {'Load more products'}
                          </ButtonPrimary>
                        </div>
                      )}
                    </>
                  )}
                </Pagination>
              ) : (
                <Empty />
              )}
            </>
          </main>
        </div>
      </div>

      {/* 3. Render the route's content sections */}
      <Suspense fallback={<div className="h-32" />}>
        <Await
          errorElement="There was a problem loading route's content sections"
          resolve={routePromise}
        >
          {({route}) => (
            <>
              <RouteContent
                route={route}
                className="space-y-20 sm:space-y-24 lg:space-y-28"
              />
            </>
          )}
        </Await>
      </Suspense>

      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
          },
        }}
      />
    </div>
  );
}

const COLLECTION_QUERY = `#graphql
  query CollectionDetails(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys!
    $reverse: Boolean
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      seo {
        description
        title
      }
      image {
        id
        url
        width
        height
        altText
      }
      productsWithDefaultFilter:products(
        first: 0,
        filters: {},
      ) {
        filters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
      }
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor,
        filters: $filters,
        sortKey: $sortKey,
        reverse: $reverse
      ) {
        filters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
        nodes {
          ...CommonProductCard
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
   # All common fragments
   ${COMMON_PRODUCT_CARD_FRAGMENT}
` as const;
