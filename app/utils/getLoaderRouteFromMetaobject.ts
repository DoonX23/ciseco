import type {LoaderFunctionArgs} from '@remix-run/server-runtime';
import {ROUTE_CONTENT_QUERY} from '~/sections/RouteContent';
import {getPaginationAndFiltersFromRequest} from '~/utils/getPaginationAndFiltersFromRequest';

export const getLoaderRouteFromMetaobject = async ({
  params,
  context,
  request,
  handle = '',
  pageBy = 8,
}: LoaderFunctionArgs & {
  handle: string;
  pageBy?: number;
}) => {
  const {storefront} = context;

  if (!handle) {
    throw new Error('Route handle is required');
  }

  const {filters, paginationVariables, sortKey, reverse} =
    getPaginationAndFiltersFromRequest(request, pageBy);

  // 2. Query the home route metaobject
  const {route} = await storefront.query(ROUTE_CONTENT_QUERY, {
    variables: {
      ...paginationVariables,
      handle,
      filters,
      sortKey,
      reverse,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
    cache: storefront.CacheNone(),
  });

  return {route};
};
