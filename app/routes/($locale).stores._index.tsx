import {
  json,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {RouteContent} from '~/sections/RouteContent';
import {getLoaderRouteFromMetaobject} from '~/utils/getLoaderRouteFromMetaobject';
import clsx from 'clsx';
import {seoPayload} from '~/lib/seo.server';
import {getSeoMeta} from '@shopify/hydrogen';
import PageHeader from '~/components/PageHeader';

export async function loader({context, params, request}: LoaderFunctionArgs) {
  // 2. Query for the route's content metaobject
  const {route} = await getLoaderRouteFromMetaobject({
    params,
    context,
    request,
    handle: 'route-stores',
  });

  const seo = seoPayload.stores();

  return json({route, seo});
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Stores() {
  const {route} = useLoaderData<typeof loader>();

  return (
    <div
      className={clsx(
        'page-stores space-y-20 sm:space-y-24 lg:space-y-28',
        'pt-16 lg:pt-24 pb-20 lg:pb-28 xl:pb-32',
      )}
    >
      <div className="container">
        {/* HEADING */}
        <PageHeader
          title={'All Stores'}
          hasBreadcrumb={true}
          breadcrumbText={'All Stores'}
        />
      </div>

      {/* 3. Render the route's content sections */}
      <RouteContent route={route} />
    </div>
  );
}
