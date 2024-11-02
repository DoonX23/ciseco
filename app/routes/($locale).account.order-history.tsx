import ButtonPrimary from '~/components/Button/ButtonPrimary';
import {
  type CustomerDetailsFragment,
  type OrderCardFragment,
} from 'customer-accountapi.generated';
import {OrderCard} from '~/components/OrderCard';
import {usePrefixPathWithLocale} from '~/lib/utils';
import {flattenConnection} from '@shopify/hydrogen';
import {useAccoutRootLoaderData} from '~/lib/account-data';
import {PageAccoutLayout} from '~/components/PageAccountLayout';

const Page = () => {
  const data = useAccoutRootLoaderData();
  const customer: CustomerDetailsFragment = data.customer;
  const orders = flattenConnection(customer.orders);

  return (
    <PageAccoutLayout breadcrumbText="Order history">
      <div>
        <div className="grid w-full gap-4 md:gap-8">
          {orders?.length ? <Orders orders={orders} /> : <EmptyOrders />}
        </div>
      </div>
    </PageAccoutLayout>
  );
};

type OrderCardsProps = {
  orders: OrderCardFragment[];
};

function EmptyOrders() {
  return (
    <div>
      <p className="">You haven&apos;t placed any orders yet.</p>
      <div className="mt-5">
        <ButtonPrimary href={usePrefixPathWithLocale('/')}>
          Start Shopping
        </ButtonPrimary>
      </div>
    </div>
  );
}

function Orders({orders}: OrderCardsProps) {
  return (
    <div className="grid grid-flow-row grid-cols-1 gap-2 gap-y-6 md:gap-4 lg:gap-6 false sm:grid-cols-2">
      {orders.map((order) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </div>
  );
}

export default Page;
