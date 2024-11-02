import {json, redirect, type ActionFunction} from '@shopify/remix-oxygen';
import {
  Form,
  useActionData,
  useOutletContext,
  useParams,
  useNavigation,
  useNavigate,
  useFetcher,
} from '@remix-run/react';
import {flattenConnection} from '@shopify/hydrogen';
import type {CustomerAddressInput} from '@shopify/hydrogen/customer-account-api-types';
import invariant from 'tiny-invariant';
import {getInputStyleClasses} from '~/lib/utils';
import {
  UPDATE_ADDRESS_MUTATION,
  DELETE_ADDRESS_MUTATION,
  CREATE_ADDRESS_MUTATION,
} from '~/graphql/customer-account/CustomerAddressMutations';
import {doLogout} from './($locale).account_.logout';
import type {AccountOutletContext} from './($locale).account.edit';
import ButtonClose from '~/components/ButtonClose';
import {Fragment} from 'react/jsx-runtime';
import {
  Dialog,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import ButtonPrimary from '~/components/Button/ButtonPrimary';
import ButtonThird from '~/components/Button/ButtonThird';
import Button from '~/components/Button/Button';
import {ArrowLeftIcon} from '@heroicons/react/24/solid';
import clsx from 'clsx';

interface ActionData {
  formError?: string;
}

export const handle = {
  renderInModal: true,
};

export const action: ActionFunction = async ({request, context, params}) => {
  const {customerAccount} = context;
  const formData = await request.formData();

  // Double-check current user is logged in.
  // Will throw a logout redirect if not.
  if (!(await customerAccount.isLoggedIn())) {
    throw await doLogout(context);
  }

  const addressId = formData.get('addressId');
  invariant(typeof addressId === 'string', 'You must provide an address id.');

  if (request.method === 'DELETE') {
    try {
      const {data, errors} = await customerAccount.mutate(
        DELETE_ADDRESS_MUTATION,
        {variables: {addressId}},
      );

      invariant(!errors?.length, errors?.[0]?.message);

      invariant(
        !data?.customerAddressUpdate?.userErrors?.length,
        data?.customerAddressUpdate?.userErrors?.[0]?.message,
      );
      return redirect(
        params?.locale
          ? `${params?.locale}/account/address`
          : '/account/address',
      );
    } catch (error: any) {
      return json(
        {formError: error.message},
        {
          status: 400,
        },
      );
    }
  }

  const address: CustomerAddressInput = {};

  const keys: (keyof CustomerAddressInput)[] = [
    'lastName',
    'firstName',
    'address1',
    'address2',
    'city',
    'zoneCode',
    'territoryCode',
    'zip',
    'phoneNumber',
    'company',
  ];

  for (const key of keys) {
    const value = formData.get(key);
    if (typeof value === 'string') {
      address[key] = value;
    }
  }

  const defaultAddress = formData.has('defaultAddress')
    ? String(formData.get('defaultAddress')) === 'on'
    : false;

  if (addressId === 'add') {
    try {
      const {data, errors} = await customerAccount.mutate(
        CREATE_ADDRESS_MUTATION,
        {variables: {address, defaultAddress}},
      );

      invariant(!errors?.length, errors?.[0]?.message);

      invariant(
        !data?.customerAddressCreate?.userErrors?.length,
        data?.customerAddressCreate?.userErrors?.[0]?.message,
      );

      invariant(
        data?.customerAddressCreate?.customerAddress?.id,
        'Expected customer address to be created',
      );

      return redirect(
        params?.locale
          ? `${params?.locale}/account/address`
          : '/account/address',
      );
    } catch (error: any) {
      return json(
        {formError: error.message},
        {
          status: 400,
        },
      );
    }
  } else {
    try {
      const {data, errors} = await customerAccount.mutate(
        UPDATE_ADDRESS_MUTATION,
        {
          variables: {
            address,
            addressId,
            // defaultAddress  ->> Invariant failed: Demoting default address is not allowed.
          },
        },
      );

      invariant(!errors?.length, errors?.[0]?.message);

      invariant(
        !data?.customerAddressUpdate?.userErrors?.length,
        data?.customerAddressUpdate?.userErrors?.[0]?.message,
      );

      return redirect(
        params?.locale
          ? `${params?.locale}/account/address`
          : '/account/address',
      );
    } catch (error: any) {
      return json(
        {formError: error.message},
        {
          status: 400,
        },
      );
    }
  }
};

export default function EditAddress() {
  const {id: addressId} = useParams();
  const isNewAddress = addressId === 'add';
  const actionData = useActionData<ActionData>();
  const {state} = useNavigation();
  const {customer} = useOutletContext<AccountOutletContext>();
  const addresses = flattenConnection(customer.addresses);
  const defaultAddress = customer.defaultAddress;
  const fetcher = useFetcher();

  /**
   * When a refresh happens (or a user visits this link directly), the URL
   * is actually stale because it contains a special token. This means the data
   * loaded by the parent and passed to the outlet contains a newer, fresher token,
   * and we don't find a match. We update the `find` logic to just perform a match
   * on the first (permanent) part of the ID.
   */
  const normalizedAddress = decodeURIComponent(addressId ?? '').split('?')[0];
  let address = addresses.find((address) =>
    address.id!.startsWith(normalizedAddress),
  );

  const isDefaultAddress = addressId === defaultAddress?.id;
  if (isDefaultAddress) {
    address = defaultAddress ?? address;
  }

  if (!address && !isNewAddress) {
    return (
      <ModalWrapper title={isNewAddress ? 'Add address' : 'Edit address'}>
        {actionData?.formError && (
          <div className="flex items-center justify-center mb-6 bg-red-100 rounded">
            <p className="m-4 text-sm text-red-900">{actionData.formError}</p>
          </div>
        )}
        {addressId}
        <h3 className="text-xl font-semibold">Address not found.</h3>
        <div className="mt-6">
          <ButtonPrimary href="/account/address" fontSize="text-sm font-medium">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Go back to address book
          </ButtonPrimary>
        </div>
      </ModalWrapper>
    );
  }

  let ErrorText = actionData?.formError;
  if (ErrorText === 'Invariant failed') {
    ErrorText =
      'Invariant failed! One or more fields are incorrect. Please check and try again.';
  }

  return (
    <ModalWrapper title={isNewAddress ? 'Add address' : 'Edit address'}>
      <h3 className="text-xl font-semibold">
        {isNewAddress ? 'Add address' : 'Edit address'}
      </h3>

      <div className="mt-6">
        <Form method="post">
          <input
            type="hidden"
            name="addressId"
            value={address?.id ?? addressId}
          />
          {actionData?.formError && (
            <div className="flex items-center justify-center mb-6 bg-red-100 rounded">
              <p className="m-4 text-sm text-red-900">{actionData.formError}</p>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2.5">
            <div className="">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  className={getInputStyleClasses()}
                  id="firstName"
                  name="firstName"
                  required
                  type="text"
                  autoComplete="given-name"
                  aria-label="First name"
                  defaultValue={address?.firstName ?? ''}
                />
              </div>
            </div>

            <div className="">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  className={getInputStyleClasses()}
                  id="lastName"
                  name="lastName"
                  required
                  type="text"
                  autoComplete="family-name"
                  aria-label="Last name"
                  defaultValue={address?.lastName ?? ''}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="company"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Company
              </label>
              <div className="mt-2">
                <input
                  className={getInputStyleClasses()}
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  aria-label="Company"
                  defaultValue={address?.company ?? ''}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="address1"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Address line 1*
              </label>
              <div className="mt-2">
                <input
                  className={getInputStyleClasses()}
                  id="address1"
                  name="address1"
                  type="text"
                  autoComplete="address-line1"
                  required
                  aria-label="Address line 1"
                  defaultValue={address?.address1 ?? ''}
                />
                <span className="text-xs text-slate-500">
                  The first line of the address. Typically the street address or
                  PO Box number.
                </span>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="address2"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Address line 2*
              </label>
              <div className="mt-2">
                <input
                  className={getInputStyleClasses()}
                  id="address2"
                  name="address2"
                  type="text"
                  autoComplete="address-line2"
                  aria-label="Address line 2"
                  defaultValue={address?.address2 ?? ''}
                />
                <span className="text-xs text-slate-500">
                  The second line of the address. Typically the number of the
                  apartment, suite, or unit.
                </span>
              </div>
            </div>

            <div className="">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  className={getInputStyleClasses()}
                  id="city"
                  name="city"
                  type="text"
                  required
                  autoComplete="address-level2"
                  aria-label="City"
                  defaultValue={address?.city ?? ''}
                />
              </div>
            </div>

            <div className="">
              <label
                htmlFor="zoneCode"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                State / Province (zoneCode)
              </label>
              <div className="mt-2">
                <input
                  className={getInputStyleClasses()}
                  id="zoneCode"
                  name="zoneCode"
                  type="text"
                  autoComplete="address-level1"
                  required
                  aria-label="State / Province (zoneCode)"
                  defaultValue={address?.zoneCode ?? ''}
                />
              </div>
            </div>

            <div className="">
              <label
                htmlFor="zip"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Zip / Postal Code
              </label>
              <div className="mt-2">
                <input
                  className={getInputStyleClasses()}
                  id="zip"
                  name="zip"
                  type="text"
                  autoComplete="postal-code"
                  required
                  aria-label="Zip"
                  defaultValue={address?.zip ?? ''}
                />
              </div>
            </div>

            <div className="">
              <label
                htmlFor="territoryCode"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Country (Territory) Code
              </label>
              <div className="mt-2">
                <input
                  className={getInputStyleClasses()}
                  id="territoryCode"
                  name="territoryCode"
                  type="text"
                  autoComplete="country"
                  required
                  aria-label="Country (Territory) Code"
                  defaultValue={address?.territoryCode ?? ''}
                />
              </div>
              <span>
                <a
                  href="https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-500 text-xs hover:underline has-end-icon"
                >
                  {`ISO 3166 country codes list `}
                </a>
              </span>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone
              </label>
              <div className="mt-2">
                <input
                  className={getInputStyleClasses()}
                  id="phone"
                  name="phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  aria-label="Phone"
                  defaultValue={address?.phoneNumber ?? ''}
                />
                <span className="text-xs text-slate-500">
                  Formatted using E.164 standard. For example, +16135551111.
                </span>
              </div>
            </div>

            <div
              className={clsx(
                'sm:col-span-2 relative flex gap-x-3',
                isDefaultAddress && 'opacity-50',
                !isNewAddress ? 'hidden' : 'flex',
              )}
            >
              <div className="flex h-6 items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  name="defaultAddress"
                  id="defaultAddress"
                  disabled={isDefaultAddress || !isNewAddress}
                  defaultChecked={isDefaultAddress}
                />
              </div>
              <div className="text-sm leading-6">
                <label
                  htmlFor="defaultAddress"
                  className="font-medium text-gray-900"
                >
                  Set as default address
                </label>
                <p className="text-slate-500 text-xs">
                  This address will be used as your default shipping address.
                </p>
              </div>
            </div>
          </div>

          <hr className="my-8" />

          <div className="mt-8 flex justify-between flex-wrap gap-2.5">
            {isDefaultAddress || isNewAddress ? (
              <div />
            ) : (
              <Button
                className={`disabled:bg-opacity-90 bg-red-700 hover:bg-red-800 text-red-50 `}
                sizeClass="px-4 py-3 sm:px-6"
                fontSize="text-sm font-medium"
                type="button"
                loading={state !== 'idle'}
                onClick={() => {
                  if (
                    confirm('Are you sure you want to delete this address?')
                  ) {
                    const formData = new FormData();
                    formData.append(
                      'addressId',
                      address?.id ?? addressId ?? '',
                    );
                    fetcher.submit(formData, {
                      method: 'DELETE',
                    });
                  }
                }}
              >
                Delete
              </Button>
            )}

            <div className="flex justify-end gap-2.5">
              <ButtonThird
                sizeClass="sm:!px-4 !py-3"
                href=".."
                loading={state !== 'idle'}
                fontSize="text-sm font-medium"
                type="button"
              >
                Cancel
              </ButtonThird>
              <ButtonPrimary
                type="submit"
                loading={state !== 'idle'}
                sizeClass="px-4 py-3 sm:px-6"
                fontSize="text-sm font-medium"
              >
                <span className="hidden sm:inline-block">
                  {isNewAddress ? 'Add address' : 'Update address'}
                </span>
                <span className="inline-block sm:hidden">Save</span>
              </ButtonPrimary>
            </div>
          </div>
        </Form>
      </div>
    </ModalWrapper>
  );
}

const ModalWrapper = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  const navigate = useNavigate();
  const closeModal = () => {
    navigate('/account/address');
  };

  return (
    <Transition appear show as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-1 text-center md:px-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-75"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-neutral-900 bg-opacity-50 dark:bg-opacity-80"
              onClick={closeModal}
              aria-hidden
            />
          </TransitionChild>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-75"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={`inline-block w-full my-5 overflow-hidden text-left align-middle transition-all transform bg-white border border-black border-opacity-5 shadow-xl rounded-2xl sm:my-8 dark:bg-neutral-800 dark:border-neutral-700 text-neutral-900 dark:text-neutral-300 max-w-screen-md`}
            >
              <div className="py-4 px-6 text-center relative border-b border-neutral-100 dark:border-neutral-700 md:py-5">
                <ButtonClose
                  onClick={closeModal}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 sm:left-4"
                />
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-neutral-900 lg:text-xl dark:text-neutral-200 mx-10"
                >
                  {title}
                </DialogTitle>
              </div>
              <div className={'py-4 px-6 md:py-5'}>{children}</div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};
