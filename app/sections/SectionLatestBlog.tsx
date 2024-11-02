import {type ParsedMetafields} from '@shopify/hydrogen';
import {parseSection} from '~/utils/parseSection';
import {useFetcher} from '@remix-run/react';
import type {SectionLatestBlogFragment} from 'storefrontapi.generated';
import BackgroundSection from '~/components/BackgroundSection';
import Heading from '~/components/Heading/Heading';
import ButtonSecondary from '~/components/Button/ButtonSecondary';
import {useEffect, useMemo} from 'react';
import BlogCard12 from '~/components/BlogCard12';
import BlogCard13 from '~/components/BlogCard13';
import {usePrefixPathWithLocale} from '~/lib/utils';
import {type Article} from '@shopify/hydrogen/storefront-api-types';
import {Empty} from '~/components/Empty';

export function SectionLatestBlog(props: SectionLatestBlogFragment) {
  const section = parseSection<
    SectionLatestBlogFragment,
    {
      heading_bold?: ParsedMetafields['single_line_text_field'];
    }
  >(props);

  const {
    heading_bold,
    heading_light,
    button_view_all,
    background_color,
    number_of_items,
    blog_slug,
  } = section;

  const {load, data} = useFetcher<{articles: Article[]}>();

  const queryString = useMemo(
    () =>
      Object.entries({
        pageBy: Number(number_of_items?.value) || 4,
        blogHandle: blog_slug?.value || 'news',
      })
        .map(([key, val]) => (val ? `${key}=${val}` : null))
        .filter(Boolean)
        .join('&'),
    [blog_slug?.value, number_of_items?.value],
  );
  const blogPostsApiPath = usePrefixPathWithLocale(
    `/api/latest-blog-posts?${queryString}`,
  );

  useEffect(() => {
    load(blogPostsApiPath);
  }, [load, blogPostsApiPath]);

  if (!data) return null;

  const {articles} = data;
  const hasBgColor =
    background_color?.value &&
    background_color?.value !== 'transparent' &&
    background_color?.value !== '#ffffff' &&
    background_color?.value !== '#fff';

  return (
    <section className="section-SectionLatestBlog container">
      <div className={hasBgColor ? 'relative py-24 lg:py-32' : ''}>
        {hasBgColor && (
          <BackgroundSection
            style={{backgroundColor: background_color?.value}}
          />
        )}
        <div>
          <Heading rightDescText={heading_light?.value}>
            {heading_bold && heading_bold.value}
          </Heading>

          {articles.length ? (
            <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
              <BlogCard12 post={articles[0]} />
              {articles[1] && (
                <div className="grid gap-6 md:gap-8 lg:grid-rows-3">
                  {[articles[1], articles[2], articles[3]]
                    .filter(Boolean)
                    .map((p) => (
                      <BlogCard13 key={p.id} post={p} />
                    ))}
                </div>
              )}
            </div>
          ) : (
            <div className="pt-10 border-t border-white">
              <Empty description="No blog posts found in the latest blog section." />
            </div>
          )}

          {!!button_view_all?.href && !!articles.length && (
            <div className="flex mt-16 justify-center">
              <ButtonSecondary
                href={button_view_all?.href?.value}
                targetBlank={button_view_all.target?.value === 'true'}
              >
                {button_view_all?.text?.value || 'View all'}
              </ButtonSecondary>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export const SECTION_LATEST_BLOG_FRAGMENT = `#graphql
  fragment SectionLatestBlog on Metaobject {
    type
    heading: field(key: "heading") {
      key
      value
    }
    heading_bold: field(key: "heading_bold") {
      key
      value
    }
    heading_light: field(key: "heading_light") {
      key
      value
    }
    background_color: field(key: "background_color") {
      key
      value
    }
    button_view_all: field(key: "button_view_all") {
      ...Link
    }

    number_of_items: field(key: "number_of_items") {
      key
      value
    }
    blog_slug: field(key: "blog_slug") {
      key
      value
    }
  }
`;
