import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {type MetaArgs, useLoaderData} from '@remix-run/react';
import {getSeoMeta} from '@shopify/hydrogen';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import {getLoaderRouteFromMetaobject} from '~/utils/getLoaderRouteFromMetaobject';
import {RouteContent} from '~/sections/RouteContent';
import clsx from 'clsx';
import {HOMEPAGE_SEO_QUERY} from './($locale)._index';

export const headers = routeHeaders;

export async function loader({params, context, request}: LoaderFunctionArgs) {
  const {language, country} = context.storefront.i18n;
  if (
    params.locale &&
    params.locale.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    // If the locale URL param is defined, yet we still are on `EN-US`
    // the the locale param must be invalid, send to the 404 page
    throw new Response(null, {status: 404});
  }

  const [{shop}, {route}] = await Promise.all([
    context.storefront.query(HOMEPAGE_SEO_QUERY, {
      variables: {country, language},
    }),
    getLoaderRouteFromMetaobject({
      params,
      context,
      request,
      handle: 'route-home-2',
    }),
  ]);

  const seo = seoPayload.home();

  //

  return defer({
    shop,
    route,
    seo,
  });
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match?.data as any)?.seo));
};

export default function Homepage() {
  const {route} = useLoaderData<typeof loader>();

  return (
    <div className={clsx('page-home', 'pb-20 lg:pb-28 xl:pb-32')}>
      {/* 3. Render the route's content sections */}
      <RouteContent route={route} />
    </div>
  );
}
