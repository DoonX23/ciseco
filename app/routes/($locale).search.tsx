import {
  defer,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {Await, Form, useLoaderData} from '@remix-run/react';
import {Pagination, Analytics, getSeoMeta} from '@shopify/hydrogen';
import {seoPayload} from '~/lib/seo.server';
import {COMMON_PRODUCT_CARD_FRAGMENT} from '~/data/commonFragments';
import ButtonPrimary from '~/components/Button/ButtonPrimary';
import {
  type SearchSortKeys,
  type Filter,
} from '@shopify/hydrogen/storefront-api-types';
import ButtonCircle from '~/components/Button/ButtonCircle';
import Input from '~/components/MyInput';
import {ArrowRightIcon} from '@heroicons/react/24/outline';
import {MagnifyingGlassIcon} from '~/components/Icons/MyIcons';
import {Empty} from '~/components/Empty';
import {SortFilter} from '~/components/SortFilter';
import {RouteContent} from '~/sections/RouteContent';
import {getPaginationAndFiltersFromRequest} from '~/utils/getPaginationAndFiltersFromRequest';
import {getLoaderRouteFromMetaobject} from '~/utils/getLoaderRouteFromMetaobject';
import {ProductsGrid} from '~/components/ProductsGrid';
import {Suspense} from 'react';

export async function loader({request, context, params}: LoaderFunctionArgs) {
  const {storefront} = context;

  // Query the route metaobject
  const routePromise = getLoaderRouteFromMetaobject({
    params,
    context,
    request,
    handle: 'route-search',
  });

  const searchParams = new URL(request.url).searchParams;
  const searchTerm = searchParams.get('q')! || '';

  const {paginationVariables, filters, sortKey, reverse} =
    getPaginationAndFiltersFromRequest(request, 12);

  const [data, dataGetDefaultPriceFilter] = await Promise.all([
    storefront.query(SEARCH_QUERY, {
      variables: {
        searchTerm,
        ...paginationVariables,
        filters,
        sortKey: sortKey as SearchSortKeys,
        reverse,
        country: storefront.i18n.country,
        language: storefront.i18n.language,
      },
    }),
    storefront.query(SEARCH_QUERY_2, {
      variables: {
        searchTerm,
        country: storefront.i18n.country,
        language: storefront.i18n.language,
      },
    }),
  ]);

  const products = data.search;

  const defaultPriceFilter =
    dataGetDefaultPriceFilter.search.productFilters?.find(
      (filter) => filter.id === 'filter.v.price',
    );

  const seo = seoPayload.collection({
    url: request.url,
    collection: {
      id: 'search',
      title: 'Search',
      handle: 'search',
      descriptionHtml: 'Search results',
      description: 'Search results',
      seo: {
        title: 'Search',
        description: `Showing ${products.nodes.length} search results for "${searchTerm}"`,
      },
      metafields: [],
      products,
      updatedAt: new Date().toISOString(),
    },
  });

  return defer({
    routePromise,
    defaultPriceFilter: {
      value: defaultPriceFilter?.values[0] ?? null,
      locale: storefront.i18n,
    },
    data,
    seo,
    searchTerm,
    products,
    // noResultRecommendations: shouldGetRecommendations
    //   ? getFeaturedData(storefront, {pageBy: PAGINATION_SIZE})
    //   : Promise.resolve(null),
  });
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Search() {
  const {searchTerm, data, defaultPriceFilter, routePromise} =
    useLoaderData<typeof loader>();
  const noResults = !data.search.nodes.length;
  // const totalProducts = noResults
  //   ? 0
  //   : getProductTotalByFilter(data?.search?.productFilters?.[0]?.values as any);

  const products = {
    nodes: data.search.nodes.filter((item) => item?.id),
    pageInfo: data.search.pageInfo,
  };

  return (
    <div className={'page-search pb-20 lg:pb-28 xl:pb-32'}>
      <div className="nc-HeadBackgroundCommon h-24 2xl:h-28 top-0 left-0 right-0 w-full bg-primary-50 dark:bg-neutral-800/20" />

      <div className={'space-y-20 sm:space-y-24 lg:space-y-28'}>
        <div>
          <div className="container">
            <header className="max-w-2xl mx-auto -mt-10 flex flex-col lg:-mt-7">
              <Form method="get" className="relative w-full">
                <label htmlFor="search-input" className="text-slate-500">
                  <span className="sr-only">Search all icons</span>
                  <Input
                    className="shadow-lg border-0 dark:border"
                    id="search-input"
                    type="search"
                    placeholder="Type your keywords"
                    sizeClass="pl-14 py-5 pr-5 md:pl-16"
                    rounded="rounded-full"
                    defaultValue={searchTerm}
                    name="q"
                  />
                  <ButtonCircle
                    className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
                    size=" w-11 h-11"
                    type="submit"
                  >
                    <ArrowRightIcon className="w-5 h-5" />
                  </ButtonCircle>
                  <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                    <MagnifyingGlassIcon className="w-5 h-5" />
                  </span>
                </label>
              </Form>
            </header>
          </div>

          <div className="container pt-20 lg:pt-28">
            {noResults ? (
              <Empty />
            ) : (
              <div>
                {/* TABS FILTER */}
                <SortFilter
                  filters={data.search.productFilters as Filter[]}
                  defaultPriceFilter={defaultPriceFilter}
                  sorts={[
                    {label: 'Relevance', key: 'relevance'},
                    {label: 'Price: Low to High', key: 'price-low-high'},
                    {
                      label: 'Price: High to Low',
                      key: 'price-high-low',
                    },
                  ]}
                />

                {/* LOOP ITEMS */}
                <hr className="mt-8 mb-8 lg:mb-12" />
                <>
                  <Pagination connection={products}>
                    {({
                      nodes,
                      isLoading,
                      PreviousLink,
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
                              as={PreviousLink}
                            >
                              {'Load previous products'}
                            </ButtonPrimary>
                          </div>
                        )}
                        <ProductsGrid nodes={nodes} className="mt-0" />
                        {hasNextPage && (
                          <div className="flex items-center justify-center mt-14">
                            <ButtonPrimary loading={isLoading} as={NextLink}>
                              {'Load more products'}
                            </ButtonPrimary>
                          </div>
                        )}
                      </>
                    )}
                  </Pagination>
                </>
              </div>
            )}
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
                  className="space-y-20 sm:space-y-24 lg:space-y-28"
                  route={route}
                />
              </>
            )}
          </Await>
        </Suspense>
      </div>

      <Analytics.SearchView data={{searchTerm, searchResults: products}} />
    </div>
  );
}

const SEARCH_QUERY = `#graphql
  query PaginatedProductsSearch(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $searchTerm: String!
    $filters: [ProductFilter!]
    $reverse: Boolean
    $startCursor: String
    $sortKey: SearchSortKeys!
  ) @inContext(country: $country, language: $language) {
    search(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor,
      # sortKey: RELEVANCE,
      types: PRODUCT,
      query: $searchTerm,
      productFilters: $filters,
      sortKey: $sortKey,  
      reverse: $reverse  
    ) {
      productFilters {
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
        ... on Product {
          ...CommonProductCard
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }

  ${COMMON_PRODUCT_CARD_FRAGMENT}

` as const;

const SEARCH_QUERY_2 = `#graphql
  query PaginatedProductsSearchForGetDefaultPriceFilter(
    $country: CountryCode
    $language: LanguageCode
    $searchTerm: String!
  ) @inContext(country: $country, language: $language) {
    search(
      first: 0,
      types: PRODUCT,
      query: $searchTerm,
      productFilters: {},
    ) {
      productFilters {
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
  }
` as const;
