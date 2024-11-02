import {
  json,
  type LoaderFunctionArgs,
  type MetaArgs,
} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {
  Pagination,
  getPaginationVariables,
  getSeoMeta,
} from '@shopify/hydrogen';
import {getImageLoadingPriority} from '~/lib/const';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import CollectionCard4 from '@/components/CollectionCards/CollectionCard4';
import ButtonPrimary from '~/components/Button/ButtonPrimary';
import {COMMON_COLLECTION_ITEM_FRAGMENT} from '~/data/commonFragments';
import {getProductTotalByFilter} from '~/utils/getProductTotalByFilter';
import {aCollectionSvgs} from '~/contains/fakeData';
import {FireIcon} from '@heroicons/react/24/outline';
import PageHeader from '~/components/PageHeader';
import {Empty} from '~/components/Empty';

const PAGINATION_SIZE = 9;

export const headers = routeHeaders;

export const loader = async ({
  request,
  context: {storefront},
}: LoaderFunctionArgs) => {
  const variables = getPaginationVariables(request, {pageBy: PAGINATION_SIZE});
  const {collections} = await storefront.query(COLLECTIONS_QUERY, {
    variables: {
      ...variables,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  const seo = seoPayload.listCollections({
    collections,
    url: request.url,
  });

  return json({collections, seo});
};

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Collections() {
  const {collections} = useLoaderData<typeof loader>();
  if (!collections) return null;

  return (
    <div className="container pt-16 lg:pt-24 pb-20 lg:pb-28 xl:pb-32">
      <div className="space-y-14 lg:space-y-24">
        {/* HEADING */}
        <div>
          <div className="flex items-center text-sm font-medium gap-2 text-neutral-500 mb-2">
            <FireIcon className="w-5 h-5" />
            <span className="text-neutral-700 ">All collections</span>
          </div>
          <PageHeader
            title={'All collections'}
            hasBreadcrumb={true}
            breadcrumbText={'All collections'}
          />
        </div>

        {!collections.nodes.length ? (
          <div className="space-y-14">
            <hr />
            <Empty description="No colelctions found!" />
            <hr />
          </div>
        ) : (
          <Pagination connection={collections}>
            {({
              nodes,
              isLoading,
              PreviousLink,
              NextLink,
              hasNextPage,
              hasPreviousPage,
            }) => (
              <div className="">
                {hasPreviousPage && (
                  <div className="flex items-center justify-center mb-12">
                    <ButtonPrimary as={PreviousLink} loading={isLoading}>
                      {isLoading ? 'Loading...' : 'Previous collections'}
                    </ButtonPrimary>
                  </div>
                )}
                <div className="grid gap-4 md:gap-7 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                  {nodes.filter(Boolean).map((collection, i) => (
                    <CollectionCard4
                      count={getProductTotalByFilter(
                        collection.products.filters?.[0]?.values as any,
                      )}
                      key={collection.id}
                      loading={getImageLoadingPriority(i, 2)}
                      collection={collection}
                      bgSVG={aCollectionSvgs[i % 9]}
                      bgColor="bg-neutral-50"
                    />
                  ))}
                </div>
                {hasNextPage && (
                  <div className="flex items-center justify-center mt-12">
                    <ButtonPrimary as={NextLink} loading={isLoading}>
                      {isLoading ? 'Loading...' : 'Show me more'}
                    </ButtonPrimary>
                  </div>
                )}
              </div>
            )}
          </Pagination>
        )}
      </div>
    </div>
  );
}

const COLLECTIONS_QUERY = `#graphql
  query Collections(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...CommonCollectionItem
        products(first: 0) {
          filters {
            values {
              input
              count
              label
            }
          }
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${COMMON_COLLECTION_ITEM_FRAGMENT}
`;
