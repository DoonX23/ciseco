import {ChevronDownIcon} from '@heroicons/react/24/solid';
import {GlobeAltIcon} from '@heroicons/react/24/outline';
import {type FC, useEffect} from 'react';
import {
  useFetcher,
  useLocation,
  useNavigation,
  useRouteLoaderData,
} from '@remix-run/react';
import {type Locale, type Localizations} from '~/lib/type';
import {DEFAULT_LOCALE} from '~/lib/utils';
import NcModal from '../NcModal';
import {CartForm} from '@shopify/hydrogen';
import {type CartBuyerIdentityInput} from '@shopify/hydrogen/storefront-api-types';
import type {RootLoader} from '~/root';

interface LangDropdownProps {
  panelClassName?: string;
  className?: string;
}

const LangDropdown: FC<LangDropdownProps> = ({
  panelClassName = '',
  className = '',
}) => {
  const fetcher = useFetcher();
  const rootData = useRouteLoaderData<RootLoader>('root');
  const selectedLocale = rootData?.selectedLocale ?? DEFAULT_LOCALE;
  const {pathname, search} = useLocation();
  const pathWithoutLocale = `${pathname.replace(
    selectedLocale.pathPrefix,
    '',
  )}${search}`;

  const countries = (fetcher.data ?? {}) as Localizations;
  const defaultLocale = countries?.['default'];
  const defaultLocalePrefix = defaultLocale
    ? `${defaultLocale?.language}-${defaultLocale?.country}`
    : '';

  // Get available countries list when in view
  useEffect(() => {
    if (fetcher.data || fetcher.state === 'loading') {
      return;
    }
    fetcher.load('/api/countries');
  }, [fetcher]);

  const renderLang = (close: () => void) => {
    return (
      <>
        <div className="grid gap-x-1 md:gap-x-4 gap-y-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {countries &&
            Object.keys(countries).map((countryPath) => {
              const countryLocale = countries[countryPath];
              const isSelected =
                countryLocale.language === selectedLocale.language &&
                countryLocale.country === selectedLocale.country;

              const countryUrlPath = getCountryUrlPath({
                countryLocale,
                defaultLocalePrefix,
                pathWithoutLocale,
              });

              return (
                <Country
                  key={countryPath}
                  countryUrlPath={countryUrlPath}
                  isSelected={isSelected}
                  countryLocale={countryLocale}
                />
              );
            })}
        </div>
      </>
    );
  };

  return (
    <div className={'LangDropdown ' + className}>
      <NcModal
        renderTrigger={(openModal) => {
          return (
            <button
              className={`text-opacity-80 group h-10 sm:h-12 px-3 py-1.5 inline-flex items-center text-sm text-gray-800 dark:text-neutral-200 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
              onClick={openModal}
            >
              <GlobeAltIcon className="w-[18px] h-[18px] opacity-80" />
              <span className="ms-2 ">Language</span>
              <ChevronDownIcon
                className={
                  'text-opacity-70 ms-1 h-4 w-4  group-hover:text-opacity-80 transition ease-in-out duration-150'
                }
                aria-hidden="true"
              />
            </button>
          );
        }}
        renderContent={(closeModal) => renderLang(closeModal)}
        modalTitle="Select your country"
      />
    </div>
  );
};

function Country({
  countryLocale,
  countryUrlPath,
  isSelected,
}: {
  countryLocale: Locale;
  countryUrlPath: string;
  isSelected: boolean;
}) {
  // CountryLocale.label: Belgium (EUR €), Canada (CAD $), United States (USD $)
  // use regex to Get text outside the brackets
  const label = countryLocale.label.replace(/ *\([^)]*\) */g, '');
  // use regex to Get text inside the brackets and remove the brackets
  const currency =
    countryLocale.label.match(/\(([^)]+)\)/)?.[1] ||
    `${countryLocale.country}-${countryLocale.language}`;

  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <ChangeLocaleForm
      key={countryLocale.country}
      redirectTo={countryUrlPath}
      buyerIdentity={{
        countryCode: countryLocale.country,
      }}
    >
      <button
        className={`flex flex-shrink-0 flex-1 w-full items-center p-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 ${
          isSelected ? 'bg-gray-100 dark:bg-gray-700' : 'opacity-80'
        }`}
        type="submit"
        disabled={isLoading}
      >
        <div className="grid text-left">
          <span className="text-sm font-medium ">{label}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">
            {currency.replace(' ', ' - ')}
          </span>
        </div>
      </button>
    </ChangeLocaleForm>
  );
}

export function ChangeLocaleForm({
  children,
  buyerIdentity,
  redirectTo,
}: {
  children: React.ReactNode;
  buyerIdentity: CartBuyerIdentityInput;
  redirectTo: string;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.BuyerIdentityUpdate}
      inputs={{
        buyerIdentity,
      }}
    >
      <>
        <input type="hidden" name="redirectTo" value={redirectTo} />
        {children}
      </>
    </CartForm>
  );
}

export function getCountryUrlPath({
  countryLocale,
  defaultLocalePrefix,
  pathWithoutLocale,
}: {
  countryLocale: Locale;
  pathWithoutLocale: string;
  defaultLocalePrefix: string;
}) {
  let countryPrefixPath = '';
  const countryLocalePrefix = `${countryLocale.language}-${countryLocale.country}`;

  if (countryLocalePrefix !== defaultLocalePrefix) {
    countryPrefixPath = `/${countryLocalePrefix.toLowerCase()}`;
  }
  return `${countryPrefixPath}${pathWithoutLocale}`;
}

export default LangDropdown;
