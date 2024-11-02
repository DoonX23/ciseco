import {Link} from '@remix-run/react';
import {
  ClipboardDocumentCheckIcon,
  IdentificationIcon,
  MapIcon,
} from '@heroicons/react/24/outline';
import type {CustomerDetailsFragment} from 'customer-accountapi.generated';
import clsx from 'clsx';
import {type LoaderFunctionArgs} from '@remix-run/server-runtime';
import {useAccoutRootLoaderData} from '~/lib/account-data';

const actions = [
  {
    title: 'Personal info',
    description: 'Provide and update your personal information ',
    href: '/account/personal-info',
    icon: IdentificationIcon,
  },
  {
    title: 'Order History',
    description: 'View your order history and track your orders ',
    href: '/account/order-history',
    icon: ClipboardDocumentCheckIcon,
  },
  {
    title: 'Address Book',
    description: 'Manage your addresses and default shipping address',
    href: '/account/address',
    icon: MapIcon,
  },
];

export async function loader({context: {storefront}}: LoaderFunctionArgs) {
  return {};
}

export default function Index() {
  const data = useAccoutRootLoaderData();

  return <Account {...data} />;
}

interface AccountType {
  customer?: CustomerDetailsFragment;
  // featuredDataPromise: Promise<FeaturedData>;
  heading?: string;
}

function Account({customer, heading}: AccountType) {
  if (!customer) {
    return null;
  }

  const defaultAddress = customer.defaultAddress;
  const {emailAddress, firstName, lastName} = customer;

  return (
    <div className="container py-10 sm:py-20">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <h1 className="text-3xl xl:text-4xl font-semibold">{heading}</h1>
          <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-base sm:text-lg">
            {!!firstName && (
              <span className="text-slate-900 dark:text-slate-200 font-semibold">
                {`${firstName} ${lastName}`},
              </span>
            )}{' '}
            {emailAddress?.emailAddress || ''}
            {defaultAddress ? ` · ` : ''}
            {defaultAddress?.city ? `${defaultAddress?.city}, ` : ''}
            {/* get last index of formatted */}
            {defaultAddress?.country || ''}
          </span>
        </div>

        {/*  */}
        <div className="my-10 sm:my-16 grid sm:grid-cols-3 gap-4">
          {actions.map((action, actionIdx) => (
            <div
              key={action.title}
              className={clsx(
                'group rounded-xl relative bg-white p-6 airShadown',
              )}
            >
              <div>
                <action.icon className="h-8 w-8" aria-hidden="true" />
              </div>
              <div className="mt-8">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  <Link to={action.href} className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {action.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {action.description}
                </p>
              </div>
              <span
                className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
