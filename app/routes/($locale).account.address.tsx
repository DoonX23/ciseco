import {type CustomerDetailsFragment} from 'customer-accountapi.generated';
import {AccountAddressBook} from '~/components/AccountAddressBook';
import {flattenConnection} from '@shopify/hydrogen';
import {Outlet, useOutlet, useOutletContext} from '@remix-run/react';
import {useAccoutRootLoaderData} from '~/lib/account-data';
import {PageAccoutLayout} from '~/components/PageAccountLayout';

const Page = () => {
  const data = useAccoutRootLoaderData();
  const customer: CustomerDetailsFragment = data.customer;
  const addresses = flattenConnection(customer.addresses);
  const outlet = useOutlet();
  const outletContext = useOutletContext();

  return (
    <PageAccoutLayout breadcrumbText="Address book">
      {outlet && <Outlet context={outletContext} />}
      <div>
        <AccountAddressBook addresses={addresses} customer={customer} />
      </div>
    </PageAccoutLayout>
  );
};

export default Page;
