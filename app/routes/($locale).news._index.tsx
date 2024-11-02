import {
  defer,
  type LoaderFunctionArgs,
  type MetaArgs,
} from '@shopify/remix-oxygen';
import {Await, useLoaderData} from '@remix-run/react';
import {
  getPaginationVariables,
  Pagination,
  getSeoMeta,
} from '@shopify/hydrogen';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import PageHeader from '~/components/PageHeader';
import ButtonPrimary from '~/components/Button/ButtonPrimary';
import {RouteContent} from '~/sections/RouteContent';
import {Empty} from '~/components/Empty';
import {getLoaderRouteFromMetaobject} from '~/utils/getLoaderRouteFromMetaobject';
import clsx from 'clsx';
import {BlogCard} from '~/components/BlogCard';
import {Suspense} from 'react';

const BLOG_HANDLE = 'news';
const PAGE_BY = 9;

export const headers = routeHeaders;

export async function loader({request, context, params}: LoaderFunctionArgs) {
  const {storefront} = context;
  const {language, country} = storefront.i18n;

  // Query the route metaobject
  const routePromise = getLoaderRouteFromMetaobject({
    params,
    context,
    request,
    handle: 'route-news',
  });

  const variables = getPaginationVariables(request, {
    pageBy: PAGE_BY,
  });

  const {blog} = await storefront.query(BLOGS_QUERY, {
    variables: {
      ...variables,
      blogHandle: 'news',
      language,
    },
  });

  if (!blog?.articles) {
    throw new Response('Not found', {status: 404});
  }

  const seo = seoPayload.blog({blog, url: request.url});
  return defer({routePromise, articles: blog.articles, seo});
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function News() {
  const {articles, routePromise} = useLoaderData<typeof loader>();

  return (
    <>
      <div
        className={clsx(
          'page-news',
          'pt-16 lg:pt-24 pb-20 lg:pb-28 xl:pb-32 space-y-20 sm:space-y-24 lg:space-y-28',
        )}
      >
        <div className="container">
          <div className="mx-auto max-w-7xl ">
            <div className="flex justify-center">
              <PageHeader
                className="text-center"
                title={BLOG_HANDLE}
                hasBreadcrumb={true}
                breadcrumbText={BLOG_HANDLE}
              />
            </div>

            <hr className="mt-16 " />
            {articles?.edges?.length ? (
              <Pagination connection={articles}>
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
                      <div className="flex items-center justify-center my-20">
                        <ButtonPrimary loading={isLoading} as={PreviousLink}>
                          {'Load previous posts'}
                        </ButtonPrimary>
                      </div>
                    )}
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                      {nodes.map((post) => (
                        <BlogCard key={post.id} post={post} />
                      ))}
                    </div>
                    {hasNextPage && (
                      <div className="flex items-center justify-center mt-20">
                        <ButtonPrimary loading={isLoading} as={NextLink}>
                          {'Load more posts'}
                        </ButtonPrimary>
                      </div>
                    )}
                  </>
                )}
              </Pagination>
            ) : (
              <Empty className="mt-16" />
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
                  route={route}
                  className="space-y-20 sm:space-y-24 lg:space-y-28"
                />
              </>
            )}
          </Await>
        </Suspense>
      </div>
    </>
  );
}

export const BLOGS_QUERY = `#graphql
query Blog(
  $language: LanguageCode
  $blogHandle: String!
  $first: Int
  $last: Int
  $endCursor: String
  $startCursor: String
  $query: String
) @inContext(language: $language) {
  blog(handle: $blogHandle) {
    title
    seo {
      title
      description
    }
    articles(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor,
      query: $query
      ) {
      edges {
        node {
          ...Article
        }
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

fragment Article on Article {
  author: authorV2 {
    name
  }
  authorV2 {
    name
    bio
  }
  excerpt
  handle
  id
  image {
    id
    altText
    url
    width
    height
  }
  publishedAt
  title
  tags
}
`;
