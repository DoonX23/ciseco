import {flattenConnection, Image} from '@shopify/hydrogen';
import clsx from 'clsx';
import type {OrderCardFragment} from 'customer-accountapi.generated';
import {statusMessage} from '~/lib/utils';
import {Link} from './Link';

export function OrderCard({order}: {order: OrderCardFragment}) {
  if (!order?.id) return null;

  const [legacyOrderId, key] = order!.id!.split('/').pop()!.split('?');
  const lineItems = flattenConnection(order?.lineItems);
  const fulfillmentStatus = flattenConnection(order?.fulfillments)[0]?.status;
  const url = key
    ? `/account/orders/${legacyOrderId}?${key}`
    : `/account/orders/${legacyOrderId}`;

  return (
    <div className="w-full h-full">
      {/*  */}
      <div
        className={clsx(
          'w-full h-full flex flex-col gap-8 group relative bg-white p-6 border rounded-2xl focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500',
        )}
      >
        {!!lineItems?.[0]?.image?.url && (
          <div className="h-20 w-20 rounded-full overflow-hidden z-0">
            <Image
              width={168}
              height={168}
              className="w-full fadeIn cover rounded-full"
              alt={lineItems[0].image?.altText ?? 'Order image'}
              src={lineItems?.[0]?.image?.url}
            />
          </div>
        )}

        <div className="">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            <Link to={url} prefetch="intent" className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              {lineItems.length > 1
                ? `${lineItems[0].title} +${lineItems.length - 1} more`
                : lineItems[0].title}
            </Link>
          </h3>
          <div className="mt-2 text-sm text-gray-500">
            <div className="">
              <span>Order No. {order.number}</span>
              {` / `}
              <span>{new Date(order.processedAt).toDateString()}</span>
            </div>
            {fulfillmentStatus && (
              <>
                <div className="sr-only">Fulfillment Status</div>
                <div className="mt-5">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      fulfillmentStatus === 'SUCCESS'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-primary/5 text-primary/50'
                    }`}
                  >
                    <span>{statusMessage(fulfillmentStatus)}</span>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
        <span
          className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
          aria-hidden="true"
        >
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
          </svg>
        </span>
      </div>
      {/*  */}
    </div>
  );
}

export const ORDER_CARD_FRAGMENT = `#graphql
  fragment OrderCard on Order {
    id
    orderNumber
    processedAt
    financialStatus
    fulfillmentStatus
    currentTotalPrice {
      amount
      currencyCode
    }
    lineItems(first: 2) {
      edges {
        node {
          variant {
            image {
              url
              altText
              height
              width
            }
          }
          title
        }
      }
    }
  }
`;
