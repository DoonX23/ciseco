import {Popover, Transition} from '@headlessui/react';
import {Fragment, Suspense, useEffect, useState} from 'react';
import Avatar from '@/components/Avatar';
import {Link} from '../Link';
import {
  MyDocIcon,
  MyHearthIcon,
  MyHelpIcon,
  MyLogoutIcon,
  MyUser2Icon,
  MyUserIcon,
} from '../Icons/MyIcons';
import {
  Await,
  Form,
  useFetcher,
  useNavigation,
  useRouteLoaderData,
} from '@remix-run/react';
import {type CustomerShortDetailsQuery} from 'customer-accountapi.generated';
import {usePrefixPathWithLocale} from '~/lib/utils';
import type {RootLoader} from '~/root';

export default function AvatarDropdown() {
  const rootData = useRouteLoaderData<RootLoader>('root');
  const isLoggedInPromise = rootData?.isLoggedInPromise;
  const {state} = useNavigation();

  const [isClicked, setIsClicked] = useState(false);

  // Fetch customer short details
  const {load, data: customerShort} = useFetcher<{
    customer: CustomerShortDetailsQuery['customer'] | null;
  }>();
  const customerShortDetailApiPath = usePrefixPathWithLocale(
    `/api/customer-short-detail`,
  );
  useEffect(() => {
    if (!isLoggedInPromise || customerShort?.customer || !isClicked) {
      return;
    }
    const getCustomerShortDetai = async () => {
      const isLoggedIn = await isLoggedInPromise;
      if (isLoggedIn === true) {
        load(customerShortDetailApiPath);
      }
    };
    getCustomerShortDetai();
  }, [
    load,
    customerShortDetailApiPath,
    customerShort,
    isLoggedInPromise,
    isClicked,
  ]);
  //

  const className =
    'w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none flex items-center justify-center';
  return (
    <Suspense
      fallback={
        <Link to={'/account'} className={className}>
          <MyUserIcon />
        </Link>
      }
    >
      <Await
        resolve={isLoggedInPromise}
        errorElement={
          <Link to={'/account'} className={className}>
            <MyUserIcon />
          </Link>
        }
      >
        {(isLoggedIn) => {
          return (
            <div className="AvatarDropdown ">
              <Popover className="relative">
                {({open, close}) => (
                  <>
                    <Popover.Button
                      className={className}
                      onClick={() => setIsClicked(true)}
                    >
                      <MyUserIcon />
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 w-screen max-w-[260px] px-4 mt-3.5 -end-2 sm:end-0 sm:px-0">
                        <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative grid grid-cols-1 gap-6 bg-white dark:bg-neutral-800 py-7 px-6">
                            {isLoggedIn && (
                              <CustomerInfo
                                customerShort={
                                  customerShort as CustomerShortDetailsQuery
                                }
                              />
                            )}

                            {/* ------------------ 2 --------------------- */}
                            {!isLoggedIn && (
                              <Link
                                to={'/account'}
                                className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                onClick={() => close()}
                              >
                                <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                                  <MyUser2Icon />
                                </div>
                                <div className="ms-4">
                                  <p className="text-sm font-medium ">
                                    Sign in
                                  </p>
                                </div>
                              </Link>
                            )}

                            {/* ------------------ Account --------------------- */}
                            {isLoggedIn && (
                              <Link
                                to={'/account'}
                                className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                onClick={() => close()}
                              >
                                <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                                  <MyUser2Icon />
                                </div>
                                <div className="ms-4">
                                  <p className="text-sm font-medium ">
                                    {'My Account'}
                                  </p>
                                </div>
                              </Link>
                            )}

                            {/* ------------------ 2 --------------------- */}
                            {isLoggedIn && (
                              <Link
                                to={'/account/order-history'}
                                className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                onClick={() => close()}
                              >
                                <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                                  <MyDocIcon />
                                </div>
                                <div className="ms-4">
                                  <p className="text-sm font-medium ">
                                    {'Order history'}
                                  </p>
                                </div>
                              </Link>
                            )}

                            {/* ------------------ 2 --------------------- */}
                            <Link
                              to={'/wishlists'}
                              className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                              onClick={() => close()}
                            >
                              <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                                <MyHearthIcon />
                              </div>
                              <div className="ms-4">
                                <p className="text-sm font-medium ">
                                  {'Wishlists'}
                                </p>
                              </div>
                            </Link>

                            <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />

                            {/* ------------------ 2 --------------------- */}
                            <Link
                              to={'/policies'}
                              className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                              onClick={() => close()}
                            >
                              <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                                <MyHelpIcon />
                              </div>
                              <div className="ms-4">
                                <p className="text-sm font-medium ">
                                  {'Policies'}
                                </p>
                              </div>
                            </Link>

                            {/* ------------------ 2 --------------------- */}
                            {isLoggedIn && (
                              <Form
                                className="w-full grid"
                                method="post"
                                action={'/account/logout'}
                              >
                                <button
                                  type="submit"
                                  className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                  disabled={state !== 'idle'}
                                >
                                  <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                                    <MyLogoutIcon />
                                  </div>
                                  <div className="ms-4">
                                    <p className="text-sm font-medium ">
                                      {state !== 'idle'
                                        ? 'Loading ... '
                                        : 'Log out'}
                                    </p>
                                  </div>
                                </button>
                              </Form>
                            )}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}

function CustomerInfo({
  customerShort,
}: {
  customerShort?: CustomerShortDetailsQuery | null;
}) {
  const customer = customerShort?.customer;
  if (!customer) return null;

  const firstName = customer?.firstName || '';
  const lastName = customer.lastName || '';
  const city = customer?.defaultAddress?.city || '';
  const country = customer?.defaultAddress?.country || '';
  let address = city + ', ' + country;
  if (!city && !country) {
    address = customer.emailAddress?.emailAddress || '';
  }

  return (
    <>
      <Link to={'/account'} className="flex items-center">
        <Avatar sizeClass="w-12 h-12" userName={firstName || 'Guest'} />

        <div className="flex-grow ms-3">
          <h4 className="font-semibold capitalize">
            {lastName || firstName ? firstName + ' ' + lastName : 'No name'}
          </h4>
          <p className="text-xs mt-0.5">{address}</p>
        </div>
      </Link>
      <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />
    </>
  );
}
