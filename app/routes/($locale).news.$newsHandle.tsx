import {
  defer,
  type LinksFunction,
  type LoaderFunctionArgs,
  type MetaArgs,
} from '@shopify/remix-oxygen';
import {Await, useLoaderData} from '@remix-run/react';
import {Image, getSeoMeta} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import Avatar from '~/components/Avatar';
import {Badge} from '~/components/badge';
import {ArrowLeftIcon} from '@heroicons/react/24/outline';
import ButtonSecondary from '~/components/Button/ButtonSecondary';
import {BLOGS_QUERY} from './($locale).news._index';
import {Suspense} from 'react';
import {BlogCard} from '~/components/BlogCard';
import Heading from '~/components/Heading/Heading';

const BLOG_HANDLE = 'news';

export const headers = routeHeaders;

export const links: LinksFunction = () => {
  return [];
};

export async function loader({request, params, context}: LoaderFunctionArgs) {
  const {language, country} = context.storefront.i18n;

  invariant(params.newsHandle, 'Missing news handle');

  const {blog} = await context.storefront.query(ARTICLE_QUERY, {
    variables: {
      blogHandle: BLOG_HANDLE,
      articleHandle: params.newsHandle,
      language,
    },
  });

  if (!blog?.articleByHandle) {
    throw new Response(null, {status: 404});
  }

  const article = blog.articleByHandle;

  //
  const relatedPromise = context.storefront.query(BLOGS_QUERY, {
    variables: {
      first: 4,
      // quyery by tags or author
      query: `${article.tags.map((tag) => `tag:\"${tag}\"`).join(' OR ')}`,

      blogHandle: BLOG_HANDLE,
      language,
    },
  });
  //

  const formattedDate = new Intl.DateTimeFormat(`${language}-${country}`, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article?.publishedAt!));

  // calculate the reading time from content length
  const readingTime = article?.content?.length
    ? Math.ceil(article?.content?.length / 3000) || 1
    : 1;

  const seo = seoPayload.article({article, url: request.url});

  return defer({article, formattedDate, seo, readingTime, relatedPromise});
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Article() {
  const {article, formattedDate, readingTime, relatedPromise} =
    useLoaderData<typeof loader>();

  const {title, image, contentHtml, author, tags, excerpt, publishedAt} =
    article;

  const renderHeader = () => {
    return (
      <header className="container rounded-xl">
        <div className="max-w-screen-md mx-auto space-y-5">
          {!!tags.length && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge
                  key={`${index + 1}`}
                  color={!index ? 'sky' : index === 1 ? 'orange' : 'zinc'}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <h1 className=" text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl ">
            {title}
          </h1>
          {!!excerpt && (
            <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
              {excerpt}
            </span>
          )}

          <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
          <>
            <div className="nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 text-sm leading-none flex-shrink-0">
              <Avatar
                containerClassName="flex-shrink-0"
                sizeClass="w-8 h-8 sm:h-11 sm:w-11 "
                userName={author?.name || 'Guest'}
              />
              <div className="ml-3">
                <div className="flex items-center">
                  <div className="block font-semibold">
                    {author?.name || 'Guest'}
                  </div>
                </div>
                <div className="text-xs mt-[6px]">
                  <span className="text-neutral-700 dark:text-neutral-300">
                    {/* {formattedDate} */}
                    {new Date(publishedAt).toDateString()}
                  </span>
                  <span className="mx-2 font-semibold">·</span>
                  <span className="text-neutral-700 dark:text-neutral-300">
                    {readingTime} min read
                  </span>
                </div>
              </div>
            </div>
          </>
        </div>
      </header>
    );
  };

  return (
    <>
      <div className="nc-PageSingle pt-8 lg:pt-16 pb-16 lg:pb-20 space-y-20 sm:space-y-24">
        <div>
          {renderHeader()}

          {image && (
            <div className="container my-10 sm:my-12">
              <Image
                data={image}
                className="w-full rounded-xl"
                sizes="90vw"
                loading="eager"
              />
            </div>
          )}

          <div className="nc-SingleContent container">
            <div
              className="prose prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-invert"
              dangerouslySetInnerHTML={{__html: contentHtml}}
            />

            <div className="flex justify-center mt-10 sm:mt-20">
              <ButtonSecondary href="/news">
                <ArrowLeftIcon className="w-5 h-5 inline-block mr-4" />
                Back to News
              </ButtonSecondary>
            </div>
          </div>
        </div>

        {/* RELATED */}
        <Suspense fallback={<div />}>
          <Await resolve={relatedPromise}>
            {(relatedData) => {
              const articles = relatedData.blog?.articles.edges
                .filter((item) => item.node.id !== article.id)
                .filter(Boolean);

              if (!articles?.length) {
                return null;
              }
              return (
                <>
                  <div className="container">
                    <hr />
                  </div>

                  <div className="container ">
                    <Heading
                      className="mb-10 lg:mb-12"
                      fontClass="text-2xl md:text-3xl font-semibold"
                    >
                      Related Articles
                    </Heading>
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                      {articles.map(({node: post}) => (
                        <BlogCard key={post.id} post={post} />
                      ))}
                    </div>
                  </div>
                </>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </>
  );
}

const ARTICLE_QUERY = `#graphql
  query ArticleDetails(
    $language: LanguageCode
    $blogHandle: String!
    $articleHandle: String!
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        id
        title
        contentHtml
        publishedAt
        tags
        excerpt
        content
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
    }
  }
`;
