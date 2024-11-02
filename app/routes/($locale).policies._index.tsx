import {
  json,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import invariant from 'tiny-invariant';
import {Link} from '~/components/Link';
import {routeHeaders} from '~/data/cache';
import {seoPayload} from '~/lib/seo.server';
import type {NonNullableFields} from '~/lib/type';
import PageHeader from '~/components/PageHeader';
import {ArrowTopRightOnSquareIcon} from '@heroicons/react/24/outline';
import {getSeoMeta} from '@shopify/hydrogen';

export const headers = routeHeaders;

export async function loader({
  request,
  context: {storefront},
}: LoaderFunctionArgs) {
  const data = await storefront.query(POLICIES_QUERY);

  invariant(data, 'No data returned from Shopify API');
  const policies = Object.values(
    data.shop as NonNullableFields<typeof data.shop>,
  ).filter(Boolean);

  if (policies.length === 0) {
    throw new Response('Not found', {status: 404});
  }

  const seo = seoPayload.policies({policies, url: request.url});

  return json({
    policies,
    seo,
  });
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Policies() {
  const {policies} = useLoaderData<typeof loader>();

  return (
    <div className="container py-16 lg:pb-28 lg:pt-20">
      <PageHeader
        title={'Policies'}
        hasBreadcrumb={true}
        breadcrumbText={'Policies'}
      />

      <div className="grid gap-7 mt-12 lg:mt-16">
        {policies.map((policy) => {
          return (
            policy && (
              <h3 className="font-normal text-2xl" key={policy.id}>
                <Link
                  className="hover:underline"
                  to={`/policies/${policy.handle}`}
                >
                  {policy.title}
                  <ArrowTopRightOnSquareIcon className="inline-block w-5 h-5 ml-2.5" />
                </Link>
              </h3>
            )
          );
        })}
      </div>
    </div>
  );
}

const POLICIES_QUERY = `#graphql
  fragment PolicyIndex on ShopPolicy {
    id
    title
    handle
  }

  query PoliciesIndex {
    shop {
      privacyPolicy {
        ...PolicyIndex
      }
      shippingPolicy {
        ...PolicyIndex
      }
      termsOfService {
        ...PolicyIndex
      }
      refundPolicy {
        ...PolicyIndex
      }
      subscriptionPolicy {
        id
        title
        handle
      }
    }
  }
`;
