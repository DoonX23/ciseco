import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {flattenConnection} from '@shopify/hydrogen';
import {BLOGS_QUERY} from './($locale).news._index';

export const loader = async ({
  request,
  context: {storefront},
}: LoaderFunctionArgs) => {
  const {language, country} = storefront.i18n;

  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const pageBy = Number(searchParams.get('pageBy')) || 4;
  const blogHandle = searchParams.get('blogHandle') ?? 'news';
  const query = searchParams.get('query') ?? '';

  const {blog} = await storefront.query(BLOGS_QUERY, {
    variables: {
      blogHandle,
      first: pageBy,
      language,
      query,
    },
  });

  if (!blog?.articles) {
    return json({articles: []});
  }

  const articles = flattenConnection(blog.articles).map((article) => {
    const {publishedAt} = article!;
    return {
      ...article,
      publishedAt: new Intl.DateTimeFormat(`${language}-${country}`, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(publishedAt!)),
    };
  });

  return json({articles});
};

// no-op
export default function Index() {
  return null;
}
