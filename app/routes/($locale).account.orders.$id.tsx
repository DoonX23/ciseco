import clsx from 'clsx';
import {json, redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import {Money, Image, flattenConnection} from '@shopify/hydrogen';
import type {FulfillmentStatus} from '@shopify/hydrogen/customer-account-api-types';
import type {OrderFragment} from 'customer-accountapi.generated';
import {statusMessage} from '~/lib/utils';
import {CUSTOMER_ORDER_QUERY} from '~/graphql/customer-account/CustomerOrderQuery';
import Prices from '~/components/Prices';
import {PageAccoutLayout} from '~/components/PageAccountLayout';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Order ${data?.order?.name}`}];
};

export async function loader({request, context, params}: LoaderFunctionArgs) {
  if (!params.id) {
    return redirect(params?.locale ? `${params.locale}/account` : '/account');
  }

  const queryParams = new URL(request.url).searchParams;
  const orderToken = queryParams.get('key');

  try {
    const orderId = orderToken
      ? `gid://shopify/Order/${params.id}?key=${orderToken}`
      : `gid://shopify/Order/${params.id}`;

    const {data, errors} = await context.customerAccount.query(
      CUSTOMER_ORDER_QUERY,
      {variables: {orderId}},
    );

    if (errors?.length || !data?.order || !data?.order?.lineItems) {
      throw new Error('order information');
    }

    const order: OrderFragment = data.order;

    const lineItems = flattenConnection(order.lineItems);

    const discountApplications = flattenConnection(order.discountApplications);

    const firstDiscount = discountApplications[0]?.value;

    const discountValue =
      firstDiscount?.__typename === 'MoneyV2' && firstDiscount;

    const discountPercentage =
      firstDiscount?.__typename === 'PricingPercentageValue' &&
      firstDiscount?.percentage;

    const fulfillments = flattenConnection(order.fulfillments);

    const fulfillmentStatus =
      fulfillments.length > 0
        ? fulfillments[0].status
        : ('OPEN' as FulfillmentStatus);

    return json({
      order,
      lineItems,
      discountValue,
      discountPercentage,
      fulfillmentStatus,
    });
  } catch (error) {
    throw new Response(error instanceof Error ? error.message : undefined, {
      status: 404,
    });
  }
}

export default function OrderRoute() {
  const {
    order,
    lineItems,
    discountValue,
    discountPercentage,
    fulfillmentStatus,
  } = useLoaderData<typeof loader>();

  const renderOrder = () => {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
          <div>
            <p className="text-lg font-semibold">Order No. {order.name}</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
              <span>{new Date(order.processedAt!).toDateString()} </span>
              <span className="mx-2">·</span>

              {fulfillmentStatus && (
                <span
                  className={clsx(
                    fulfillmentStatus === 'SUCCESS'
                      ? 'text-green-500'
                      : 'text-primary-500',
                    'font-medium',
                  )}
                >
                  {statusMessage(fulfillmentStatus!)}
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 p-4 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
          {lineItems.map(
            ({
              id,
              image,
              discountAllocations,
              quantity,
              title,
              totalDiscount,
              price,
              variantTitle,
            }) => {
              return (
                <div
                  key={id}
                  className="flex flex-col sm:flex-row flex-wrap gap-4 py-4 sm:py-7 last:pb-0 first:pt-0"
                >
                  <div className="relative h-24 w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Image
                      sizes="100px"
                      data={image || undefined}
                      width={100}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="flex gap-2 flex-1 flex-col">
                    <div>
                      <div className="flex flex-wrap gap-2 justify-between ">
                        <div>
                          <h3 className="text-base font-medium">{title}</h3>
                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {variantTitle}
                          </p>
                        </div>
                        <Prices price={price!} className="mt-0.5" />
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500 dark:text-slate-400 flex items-center">
                        <span className="hidden sm:inline-block">Qty</span>
                        <span className="inline-block sm:hidden">x</span>
                        <span className="ml-2">{quantity}</span>
                      </p>

                      <div className="flex">
                        <div className="font-medium text-slate-900 flex">
                          <span className="me-2"> Total:</span>
                          <Money data={totalDiscount!} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            },
          )}
        </div>

        <div className="rounded-lg bg-gray-50 px-4 sm:px-8 py-6">
          <dl className="flex-1 space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-5 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:flex-none lg:gap-x-8">
            {((discountValue && discountValue.amount) ||
              discountPercentage) && (
              <div className="flex justify-between sm:block">
                <dt className="font-medium text-gray-900">Discounts</dt>
                <dd className="sm:mt-1">
                  {discountPercentage ? (
                    <span className="text-sm">-{discountPercentage}% OFF</span>
                  ) : (
                    discountValue && <Money data={discountValue!} />
                  )}
                </dd>
              </div>
            )}

            <div className="flex justify-between sm:block">
              <dt className="font-medium text-gray-900">Subtotal</dt>
              <dd className="sm:mt-1">
                <Money data={order.subtotal!} />
              </dd>
            </div>

            <div className="flex justify-between pt-6 sm:block sm:pt-0">
              <dt className="font-medium text-gray-900">Tax</dt>
              <dd className="sm:mt-1">
                <Money data={order.totalTax!} />
              </dd>
            </div>

            <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
              <dt>Total amount</dt>
              <dd className="sm:mt-1">
                <Money data={order.totalPrice!} />
              </dd>
            </div>
          </dl>
        </div>
      </div>
    );
  };

  return (
    <div>
      <PageAccoutLayout breadcrumbText="Order detail">
        {renderOrder()}
      </PageAccoutLayout>
    </div>
  );
}
