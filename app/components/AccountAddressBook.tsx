import type {CustomerAddress} from '@shopify/hydrogen/customer-account-api-types';
import type {CustomerDetailsFragment} from 'customer-accountapi.generated';
import {Badge} from './badge';
import ButtonPrimary from './Button/ButtonPrimary';
import {PlusIcon} from '@heroicons/react/24/outline';
import {Link} from './Link';

export function AccountAddressBook({
  customer,
  addresses,
}: {
  customer: CustomerDetailsFragment;
  addresses: CustomerAddress[];
}) {
  return (
    <>
      <div className="space-y-8">
        {!addresses?.length && (
          <p className="mb-1">You haven&apos;t saved any addresses yet.</p>
        )}
        <div className="flex justify -center sm:pb-2.5">
          <ButtonPrimary href="/account/address/add">
            <PlusIcon className="h-5 w-5 mr-2" />
            <span>Add an Address</span>
          </ButtonPrimary>
        </div>

        {Boolean(addresses?.length) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {customer.defaultAddress && (
              <Address
                address={customer.defaultAddress}
                defaultAddress
                index={-1}
              />
            )}
            {addresses
              .filter((address) => address.id !== customer.defaultAddress?.id)
              .map((address, index) => (
                <Address key={address.id} address={address} index={index} />
              ))}
          </div>
        )}
      </div>
    </>
  );
}

function Address({
  address,
  defaultAddress,
  index: nIndex = 0,
}: {
  address: CustomerAddress;
  defaultAddress?: boolean;
  index?: number;
}) {
  const index = nIndex + 2 < 10 ? `0${nIndex + 2}` : nIndex + 2;

  return (
    <div className="lg:p-8 p-6 airShadown rounded-2xl flex flex-col gap-5">
      <div className="flex gap-2">
        <Badge color="blue">{index}</Badge>
        {defaultAddress && <Badge color="red">Default</Badge>}
      </div>
      <ul className="flex-1 text-sm text-slate-700 prose prose-slate">
        {(address.firstName || address.lastName) && (
          <li>
            {'' +
              (address.firstName && address.firstName + ' ') +
              address?.lastName}
          </li>
        )}
        {address.formatted &&
          address.formatted.map((line: string) => <li key={line}>{line}</li>)}
      </ul>
      <hr />
      <div className="flex flex-row font-medium items-baseline">
        <Link
          to={`/account/address/${encodeURIComponent(address.id)}`}
          className="text-left underline text-sm px-1"
          prefetch="intent"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}
