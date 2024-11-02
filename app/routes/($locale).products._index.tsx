import {
  json,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import invariant from 'tiny-invariant';
import {
  Pagination,
  getPaginationVariables,
  getSeoMeta,
} from '@shopify/hydrogen';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import ButtonPrimary from '~/components/Button/ButtonPrimary';
import {COMMON_PRODUCT_CARD_FRAGMENT} from '~/data/commonFragments';
import PageHeader from '~/components/PageHeader';
import {Empty} from '~/components/Empty';
import {ProductsGrid} from '~/components/ProductsGrid';
import {FireIcon} from '@heroicons/react/24/outline';

const PAGE_BY = 12;

export const headers = routeHeaders;

export async function loader({
  request,
  context: {storefront},
}: LoaderFunctionArgs) {
  const variables = getPaginationVariables(request, {pageBy: PAGE_BY});

  const data = await storefront.query(ALL_PRODUCTS_QUERY, {
    variables: {
      ...variables,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  invariant(data, 'No data returned from Shopify API');

  const seo = seoPayload.collection({
    url: request.url,
    collection: {
      id: 'all-products',
      title: 'All Products',
      handle: 'products',
      descriptionHtml: 'All the store products',
      description: 'All the store products',
      seo: {
        title: 'All Products',
        description: 'All the store products',
      },
      metafields: [],
      products: data.products,
      updatedAt: '',
    },
  });

  return json({
    products: data.products,
    seo,
  });
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function AllProducts() {
  const {products} = useLoaderData<typeof loader>();
  if (!products) return null;

  return (
    <div className={`page-all-products pt-16 lg:pt-24 pb-20 lg:pb-28 xl:pb-32`}>
      <div className="container">
        <div className="space-y-10 lg:space-y-16">
          {/* HEADING */}
          <div>
            <div className="flex items-center text-sm font-medium gap-2 text-neutral-500 mb-2">
              <FireIcon className="w-5 h-5" />
              <span className="text-neutral-700 ">All Products</span>
            </div>
            <PageHeader
              title={'All Products'}
              hasBreadcrumb={true}
              breadcrumbText={'All Products'}
            />
          </div>

          <hr />

          {!products?.nodes?.length ? (
            <Empty description="No products found!" />
          ) : (
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
                      <ButtonPrimary loading={isLoading} as={PreviousLink}>
                        {'Load previous products'}
                      </ButtonPrimary>
                    </div>
                  )}
                  <ProductsGrid nodes={nodes} />
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
          )}
        </div>
      </div>
    </div>
  );
}

const ALL_PRODUCTS_QUERY = `#graphql
  query AllProducts(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
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
