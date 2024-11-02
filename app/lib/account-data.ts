import {useMatches} from '@remix-run/react';
import type {SerializeFrom} from '@shopify/remix-oxygen';
import type {loader} from '~/routes/($locale).account';

export function useAccoutRootLoaderData() {
  const root = useMatches().find((match) => match.pathname === '/account');
  return root?.data as SerializeFrom<typeof loader>;
}
