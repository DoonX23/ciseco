import {Fragment, lazy, Suspense, useEffect, useMemo, useState} from 'react';
import {
  Dialog,
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import {
  useLocation,
  useSearchParams,
  useNavigate,
  useNavigation,
  useRouteLoaderData,
} from '@remix-run/react';
import type {
  Filter,
  FilterValue,
  ProductFilter,
  ProductPriceRange,
} from '@shopify/hydrogen/storefront-api-types';

import Checkbox from './Checkbox';
import clsx from 'clsx';
import Input from './MyInput';
import {type I18nLocale} from '~/lib/type';
import {parseAsCurrency} from '~/lib/utils';
import {MyPriceIcon} from './Icons/MyPrice';
import {MyStickFilterIcon} from './Icons/MyStickFilterIcon';
import {MyVendorIcon} from './Icons/MyVendorIcon';
import {MyCategory2Icon} from './Icons/MyCategory2Icon';
import {MyColorIcon} from './Icons/MyColorIcon';
import {MyTagIcon} from './Icons/MyTagIcon';
import {MySizeIcon} from './Icons/MySizeIcon';
import {MyShapIcon} from './Icons/MyShapIcon';
import {MyPrice2Icon} from './Icons/MyPrice2Icon';
import ButtonThird from './Button/ButtonThird';
import ButtonPrimary from './Button/ButtonPrimary';
import {ChevronDownIcon} from '@heroicons/react/24/outline';
import SortMenu, {type SortMenuProps} from './SortMenu';
import ButtonClose from './ButtonClose';
import {MyAdjustmentsIcon} from './Icons/MyAdjustmentsIcon';
import type {RootLoader} from '~/root';

const Slider = lazy(() => delayForDemo(import('rc-slider')));

// Add a fixed delay so you can see the loading state
function delayForDemo(promise: Promise<any>) {
  return new Promise((resolve) => {
    setTimeout(resolve, 100);
  }).then(() => promise);
}

export type MyProductFilter =
  | (Pick<Filter, 'id' | 'label' | 'type'> & {
      values: Pick<FilterValue, 'count' | 'input' | 'id' | 'label'>[];
    })
  | undefined;

export type AppliedFilter = {
  label: string;
  filter: ProductFilter;
  data?: Partial<FilterValue>;
};

export type DefaultPriceFilter =
  | {
      value: Partial<
        Pick<FilterValue, 'id' | 'label' | 'count' | 'input'>
      > | null;
      locale: I18nLocale;
    }
  | null
  | undefined;

type Props = {
  filters: Filter[];
  productPriceRange?: ProductPriceRange;
  defaultPriceFilter?: DefaultPriceFilter;
  sorts?: SortMenuProps['items'];
};
export const FILTER_URL_PREFIX = 'filter.';

interface TTTTT extends Partial<FilterValue> {
  checked: boolean;
}

export function SortFilter({filters, defaultPriceFilter, sorts}: Props) {
  const [params] = useSearchParams();
  const rootData = useRouteLoaderData<RootLoader>('root');
  const locale = rootData?.selectedLocale;

  const filtersFromSearchParams = [...params.entries()].reduce(
    (filters, [key, value]) => {
      if (key.startsWith(FILTER_URL_PREFIX)) {
        const filterKey = key.substring(FILTER_URL_PREFIX.length);
        filters.push({
          [filterKey]: JSON.parse(value),
        });
      }
      return filters;
    },
    [] as ProductFilter[],
  );

  const allFilterValues = filters.flatMap((filter) => filter.values);
  const appliedFilters = filtersFromSearchParams
    .map((filter) => {
      const foundValue = allFilterValues?.find((value) => {
        const valueInput = JSON.parse(value.input as string) as ProductFilter;
        // special case for price, the user can enter something freeform (still a number, though)
        // that may not make sense for the locale/currency.
        // Basically just check if the price filter is applied at all.
        if (valueInput.price && filter.price) {
          return true;
        }
        return (
          // This comparison should be okay as long as we're not manipulating the input we
          // get from the API before using it as a URL param.
          JSON.stringify(valueInput) === JSON.stringify(filter)
        );
      });
      if (!foundValue) {
        // eslint-disable-next-line no-console
        console.error('Could not find filter value for filter', filter);
        return null;
      }

      if (foundValue.id === 'filter.v.price') {
        // Special case for price, we want to show the min and max values as the label.
        const input = JSON.parse(foundValue.input as string) as ProductFilter;
        const min = parseAsCurrency(input.price?.min ?? 0, locale);
        const max = input.price?.max
          ? parseAsCurrency(input.price.max, locale)
          : '';
        const label = min && max ? `${min} - ${max}` : 'Price';

        return {
          filter,
          label,
          data: foundValue,
        };
      }
      return {
        filter,
        label: foundValue.label,
        data: foundValue,
      };
    })
    .filter((filter): filter is NonNullable<typeof filter> => filter !== null);

  return (
    <div className="flex justify-between flex-1 gap-x-16 gap-y-3">
      <div className="flex flex-1 lg:gap-x-4">
        {/* FOR DESKTOP */}
        <div className="hidden lg:flex flex-1 flex-wrap gap-4">
          <FiltersDrawer
            filters={filters}
            appliedFilters={appliedFilters}
            defaultPriceFilter={defaultPriceFilter}
          />
        </div>

        {/* FOR RESPONSIVE MOBILE */}
        <div className="block lg:hidden">
          <TabMoreFilterOnMobile
            filters={filters}
            appliedFilters={appliedFilters}
            defaultPriceFilter={defaultPriceFilter}
          />
        </div>
      </div>

      <div className="flex">
        <SortMenu items={sorts} />
      </div>
    </div>
  );
}

export function FiltersDrawer({
  filters = [],
  appliedFilters = [],
  defaultPriceFilter,
}: Omit<Props, 'children'> & {
  appliedFilters: AppliedFilter[];
}) {
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const [temporarySelectedInputs, setTemporarySelectedInputs] = useState<
    Record<string, TTTTT>
  >({});
  const LOADING = navigation.state === 'loading';

  return (
    <>
      <>
        {filters.map((filter: Filter) => {
          const isActive = appliedFilters.some((af) =>
            af.data?.id?.includes(filter.id),
          );

          const count =
            appliedFilters.filter((f) => f.data?.id?.includes(filter.id))
              .length ?? 0;

          if (filter.type === 'PRICE_RANGE') {
            const {min, max, initMax, initMaxWithCurrency, initMin} =
              getPropsDataForPriceTab({
                filter,
                appliedFilters,
                defaultPriceFilter,
                params,
              });

            return (
              <TabsPriceRage
                filter={filter}
                appliedFilters={appliedFilters}
                key={filter.id}
                min={min}
                max={max}
                initMin={initMin || 0}
                initMax={initMax || 100}
                initMaxWithCurrency={initMaxWithCurrency}
                isActive={isActive}
              />
            );
          }

          return (
            <Popover key={filter.id} className="relative">
              {({open, close}) => (
                <>
                  <PopoverButton
                    className={clsx([
                      `relative flex gap-2 items-center justify-center ps-4 pe-3.5 py-2 text-sm rounded-full border focus:outline-none select-none`,
                      isActive || open
                        ? 'border-primary-600 bg-primary-50 text-primary-900'
                        : 'border-neutral-300 text-neutral-700 hover:border-neutral-500 focus:border-neutral-500',
                    ])}
                    onClick={() => {
                      setTemporarySelectedInputs({});
                    }}
                    onKeyDown={() => {
                      setTemporarySelectedInputs({});
                    }}
                  >
                    {filter.id === 'filter.v.availability' && (
                      <MyStickFilterIcon />
                    )}
                    {filter.id === 'filter.p.vendor' && <MyVendorIcon />}
                    {filter.id === 'filter.p.tag' && <MyTagIcon />}
                    {filter.id === 'filter.p.product_type' && (
                      <MyCategory2Icon />
                    )}
                    {filter.id === 'filter.v.option.color' && <MyColorIcon />}
                    {filter.id === 'filter.v.option.size' && <MySizeIcon />}
                    {filter.id === 'filter.v.option.denominations' && (
                      <MyPrice2Icon />
                    )}
                    {filter.id === 'filter.v.option.material' && <MyShapIcon />}

                    <div className="flex items-center gap-1">
                      <span className="flex-shrink-0 capitalize">
                        {filter.label}
                      </span>
                    </div>

                    <CountActived isActive={isActive} count={count} />

                    <ChevronDownIcon className="w-4 h-4" />
                  </PopoverButton>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <PopoverPanel className="absolute z-40 w-screen max-w-xs xl:max-w-sm px-4 mt-3 left-0 sm:px-0">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          let paramsClone = new URLSearchParams(params);

                          Object.entries(temporarySelectedInputs).forEach(
                            ([_, value]) => {
                              if (value.checked) {
                                paramsClone = filterInputToParams(
                                  value.input as string,
                                  paramsClone,
                                );
                              } else {
                                const rawInput = value.input as
                                  | string
                                  | ProductFilter;
                                const input =
                                  typeof rawInput === 'string'
                                    ? (JSON.parse(rawInput) as ProductFilter)
                                    : rawInput;

                                Object.entries(input).forEach(
                                  ([key, value]) => {
                                    const fullKey = FILTER_URL_PREFIX + key;
                                    paramsClone.delete(
                                      fullKey,
                                      JSON.stringify(value),
                                    );
                                  },
                                );
                              }
                            },
                          );

                          navigate(
                            `${location.pathname}?${paramsClone.toString()}`,
                            {preventScrollReset: true},
                          );

                          close();
                          return;
                        }}
                        className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700"
                      >
                        <div className="relative flex flex-col px-5 py-6 space-y-5 max-h-96 overflow-auto hiddenScroll">
                          {filter.values?.map((option, index) => {
                            const isCheckedFromServer = appliedFilters.some(
                              (af) =>
                                af.data?.id === option.id &&
                                af.label === option.label,
                            );

                            //  We use the id + label as the key to avoid the same id
                            const isChecked =
                              temporarySelectedInputs[option.id + option.label]
                                ?.checked ?? isCheckedFromServer;

                            return (
                              <div key={`${index + option.id}`}>
                                <Checkbox
                                  data-input={option.input as string}
                                  name={option.label}
                                  label={option.label}
                                  checked={isChecked}
                                  labelClassName="capitalize"
                                  onChange={(event) => {
                                    setTemporarySelectedInputs({
                                      ...temporarySelectedInputs,
                                      [option.id + option.label]: {
                                        ...option,
                                        checked: event.target.checked,
                                      },
                                    });
                                  }}
                                />
                              </div>
                            );
                          })}
                        </div>

                        <div className="p-5 ps-3.5 border-t border-neutral-200 flex items-center justify-between">
                          <ButtonThird
                            type="button"
                            onClick={() => {
                              const newVal = filter.values?.reduce(
                                (acc, option) => {
                                  return {
                                    ...acc,
                                    [option.id + option.label]: {
                                      ...option,
                                      checked: false,
                                    },
                                  };
                                },
                                {},
                              );

                              setTemporarySelectedInputs(newVal);
                            }}
                            sizeClass="!px-2 !py-2"
                          >
                            Clear
                          </ButtonThird>
                          <ButtonPrimary
                            type="submit"
                            sizeClass="px-4 py-2 sm:px-5"
                            loading={LOADING}
                          >
                            Apply
                          </ButtonPrimary>
                        </div>
                      </form>
                    </PopoverPanel>
                  </Transition>
                </>
              )}
            </Popover>
          );
        })}
      </>
    </>
  );
}

const PRICE_RANGE_FILTER_DEBOUNCE = 500;
// Render tab price range filter
function TabsPriceRage({
  filter,
  appliedFilters,
  min,
  max,
  initMin,
  initMax,
  initMaxWithCurrency,
  isActive,
}: {
  filter: Filter;
  appliedFilters: AppliedFilter[];
  min?: number;
  max?: number;
  initMin?: number;
  initMax?: number;
  initMaxWithCurrency?: string;
  isActive?: boolean;
}) {
  //
  const location = useLocation();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );
  const navigate = useNavigate();
  const [minPrice, setMinPrice] = useState(min);
  const [maxPrice, setMaxPrice] = useState(max);
  const priceAppliedFilter = appliedFilters.find((af) => !!af.filter.price);
  const resetDefaultState = () => {
    setMaxPrice(max);
    setMinPrice(min);
  };
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsMounted(true);
  }, []);

  return (
    <Popover className="relative">
      {({open, close}) => (
        <>
          <Popover.Button
            className={clsx([
              `flex items-center gap-2 justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none`,
              isActive || open
                ? 'border-primary-600 bg-primary-50 text-primary-900'
                : 'border-neutral-300 text-neutral-700 hover:border-slate-500',
            ])}
            onClick={resetDefaultState}
            onKeyDown={resetDefaultState}
          >
            <MyPriceIcon />
            <span>{priceAppliedFilter?.label || filter.label}</span>
            <ChevronDownIcon className="w-4 h-4" />
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
            <Popover.Panel className="absolute z-40 w-screen max-w-xs lg:max-w-sm px-4 mt-3 left-0 sm:px-0 ">
              <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                <div className="relative flex flex-col px-5 py-6 gap-y-6">
                  <div className="">
                    <h5 className="font-medium">{filter.label}</h5>
                    <div className="text-xs mt-1 ">
                      The highest price is {initMaxWithCurrency}
                    </div>
                  </div>

                  <div className="px-1">
                    {isMounted ? (
                      <Suspense fallback={<div />}>
                        <Slider
                          range
                          min={initMin}
                          max={initMax}
                          step={1}
                          value={[
                            minPrice ?? initMin ?? 0,
                            maxPrice ?? initMax ?? 0,
                          ]}
                          allowCross={false}
                          onChange={(_input: number | number[]) => {
                            const input = _input as number[];
                            setMinPrice(input[0]);
                            setMaxPrice(input[1]);
                          }}
                        />
                      </Suspense>
                    ) : null}
                  </div>

                  <div>
                    <div className="flex justify-between gap-6">
                      <div className="flex-1">
                        <label
                          htmlFor="minPrice"
                          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                          Min price
                        </label>
                        <div className="mt-1 relative rounded-md">
                          <span className="absolute inset-y-0 start-3.5 flex items-center pointer-events-none text-neutral-700 sm:text-sm">
                            $
                          </span>
                          <Input
                            min={0}
                            type="number"
                            name="minPrice"
                            id="minPrice"
                            className="block min-w-32 ps-7 pe-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-lg bg-transparent"
                            value={minPrice ?? initMin ?? 0}
                            onChange={(e) => {
                              setMinPrice(Number(e.target.value));
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor="maxPrice"
                          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                          Max price
                        </label>
                        <div className="mt-1 relative rounded-md">
                          <span className="absolute inset-y-0 start-3.5 flex items-center pointer-events-none text-neutral-700 sm:text-sm">
                            $
                          </span>
                          <Input
                            min={0}
                            type="number"
                            name="maxPrice"
                            id="maxPrice"
                            className="block min-w-32 ps-7 pe-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-lg bg-transparent"
                            value={maxPrice ?? initMax ?? 0}
                            onChange={(e) => {
                              setMaxPrice(Number(e.target.value));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 ps-3.5 border-t border-neutral-200 flex items-center justify-between">
                  <ButtonThird
                    type="button"
                    onClick={() => {
                      setMaxPrice(undefined);
                      setMinPrice(undefined);
                    }}
                    sizeClass="!px-2 !py-2"
                  >
                    Reset
                  </ButtonThird>
                  <ButtonPrimary
                    type="submit"
                    sizeClass="px-4 py-2 sm:px-5"
                    onClick={() => {
                      close();
                      const newParams = getPriceNewParams({
                        maxPrice,
                        minPrice,
                        params,
                      });

                      navigate(`${location.pathname}?${newParams.toString()}`, {
                        preventScrollReset: true,
                      });
                    }}
                  >
                    Apply
                  </ButtonPrimary>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

// Render tab price range filter
function TabsPriceRageOnMoreFilterModal({
  filter,
  appliedFilters,
  min,
  max,
  initMin,
  initMax,
  onChangeMaxPrice,
  onChangeMinPrice,
}: {
  filter: Filter;
  appliedFilters: AppliedFilter[];
  min?: number;
  max?: number;
  initMin?: number;
  initMax?: number;
  onChangeMinPrice: (value: number | undefined) => void;
  onChangeMaxPrice: (value: number | undefined) => void;
}) {
  const minPrice = min;
  const maxPrice = max;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsMounted(true);
  }, []);

  return (
    <div className="grid gap-4 md:gap-x-8 md:gap-y-5">
      <div className="px-1">
        {!!isMounted && (
          <Slider
            range
            min={initMin}
            max={initMax}
            step={1}
            value={[minPrice ?? initMin ?? 0, maxPrice ?? initMax ?? 0]}
            allowCross={false}
            onChange={(_input: number | number[]) => {
              const input = _input as number[];
              onChangeMinPrice(input[0]);
              onChangeMaxPrice(input[1]);
            }}
          />
        )}
      </div>

      <div>
        <div className="flex justify-between gap-4 md:gap-x-8 pt-1">
          <div className="flex-1">
            <label
              htmlFor="minPrice"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Min price
            </label>
            <div className="mt-1 relative rounded-md">
              <span className="absolute inset-y-0 start-3.5 flex items-center pointer-events-none text-neutral-700 sm:text-sm">
                $
              </span>
              <Input
                min={0}
                type="number"
                name="minPrice"
                id="minPrice"
                className="block min-w-32 ps-7 pe-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-lg bg-transparent"
                value={minPrice ?? initMin ?? 0}
                onChange={(e) => {
                  onChangeMinPrice(Number(e.target.value));
                  onChangeMaxPrice(maxPrice);
                }}
              />
            </div>
          </div>
          <div className="flex-1">
            <label
              htmlFor="maxPrice"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Max price
            </label>
            <div className="mt-1 relative rounded-md">
              <span className="absolute inset-y-0 start-3.5 flex items-center pointer-events-none text-neutral-700 sm:text-sm">
                $
              </span>
              <Input
                min={0}
                type="number"
                name="maxPrice"
                id="maxPrice"
                className="block min-w-32 ps-7 pe-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-lg bg-transparent"
                value={maxPrice ?? initMax ?? 0}
                onChange={(e) => {
                  onChangeMaxPrice(Number(e.target.value));
                  onChangeMinPrice(minPrice);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//  Render tab more filter
function TabMoreFilterOnMobile({
  defaultPriceFilter,
  filters = [],
  appliedFilters = [],
  productPriceRange,
}: Omit<Props, 'children'> & {
  appliedFilters: AppliedFilter[];
}) {
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const [temporarySelectedInputs, setTemporarySelectedInputs] = useState<
    Record<string, TTTTT>
  >({});

  // null: no change, undefined: reset, number: new value
  const [temporaryMinPrice, setTemporaryMinPrice] = useState<
    number | undefined | null
  >(null);
  const [temporaryMaxPrice, setTemporaryMaxPrice] = useState<
    number | undefined | null
  >(null);
  const LOADING = navigation.state === 'loading';

  const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
  const closeModalMoreFilter = () => {
    setisOpenMoreFilter(false);
    setTimeout(() => {
      setTemporarySelectedInputs({});
      setTemporaryMaxPrice(null);
      setTemporaryMinPrice(null);
    }, 500);
  };
  const openModalMoreFilter = () => {
    setTemporarySelectedInputs({});
    setisOpenMoreFilter(true);
  };

  const hasFiltered = appliedFilters.length > 0;
  const count = appliedFilters.length;

  return (
    <div className="flex-shrink-0">
      <button
        className={clsx([
          `relative flex gap-2 items-center justify-center px-4 py-2 text-sm rounded-full focus:outline-none select-none`,
          hasFiltered || isOpenMoreFilter
            ? 'border border-primary-600 bg-primary-50 text-primary-900'
            : 'border border-neutral-300 text-neutral-700 hover:border-neutral-500 focus:border-neutral-500',
        ])}
        onClick={openModalMoreFilter}
        onKeyDown={openModalMoreFilter}
      >
        <MyAdjustmentsIcon />
        <span>Filters</span>
        <CountActived isActive={hasFiltered} count={count} />
      </button>

      <Transition appear show={isOpenMoreFilter} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModalMoreFilter}
        >
          <div className="min-h-screen text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
            </TransitionChild>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <TransitionChild
              as={'div'}
              className="inline-block h-screen w-full max-w-4xl p-2 lg:p-10"
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <form
                className="inline-flex flex-col w-full text-left align-middle transition-all transform bg-white h-full rounded-2xl"
                onSubmit={(e) => {
                  e.preventDefault();
                  let paramsClone = new URLSearchParams(params);

                  Object.entries(temporarySelectedInputs).forEach(
                    ([_, value]) => {
                      if (value.checked) {
                        paramsClone = filterInputToParams(
                          value.input as string,
                          paramsClone,
                        );
                      } else {
                        const rawInput = value.input as string | ProductFilter;
                        const input =
                          typeof rawInput === 'string'
                            ? (JSON.parse(rawInput) as ProductFilter)
                            : rawInput;

                        Object.entries(input).forEach(([key, value]) => {
                          const fullKey = FILTER_URL_PREFIX + key;
                          paramsClone.delete(fullKey, JSON.stringify(value));
                        });
                      }
                    },
                  );

                  let newParams = paramsClone;
                  if (
                    temporaryMaxPrice !== null &&
                    temporaryMinPrice !== null
                  ) {
                    newParams = getPriceNewParams({
                      maxPrice: temporaryMaxPrice,
                      minPrice: temporaryMinPrice,
                      params: paramsClone,
                    });
                  }

                  navigate(`${location.pathname}?${newParams.toString()}`, {
                    preventScrollReset: true,
                  });

                  close();
                  return;
                }}
              >
                <div className="relative flex-shrink-0 px-6 py-5 border-b text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Products filters
                  </Dialog.Title>
                  <span className="absolute start-5 top-1/2 -translate-y-1/2">
                    <ButtonClose onClick={closeModalMoreFilter} />
                  </span>
                </div>

                <div className="flex-grow overflow-y-auto hiddenScroll">
                  <div className="px-6 sm:px-8 divide-y ">
                    {filters.map((filter) => {
                      const isActive = appliedFilters.some((af) =>
                        af.data?.id?.includes(filter.id),
                      );

                      if (filter.type === 'PRICE_RANGE') {
                        const {
                          min,
                          max,
                          initMax,
                          initMaxWithCurrency,
                          initMin,
                        } = getPropsDataForPriceTab({
                          filter,
                          appliedFilters,
                          defaultPriceFilter,
                          params,
                        });
                        return (
                          <div key={filter.id + filter.label} className="py-8">
                            <h3 className="text-xl font-medium">
                              {filter.label}
                            </h3>
                            <span className="block text-sm mt-2 text-neutral-700">
                              The highest price is {initMaxWithCurrency}
                            </span>
                            <div className="mt-7 relative">
                              <TabsPriceRageOnMoreFilterModal
                                filter={filter}
                                appliedFilters={appliedFilters}
                                key={filter.id}
                                min={
                                  typeof temporaryMinPrice === 'undefined'
                                    ? undefined
                                    : (temporaryMinPrice ?? min)
                                }
                                max={
                                  typeof temporaryMaxPrice === 'undefined'
                                    ? undefined
                                    : (temporaryMaxPrice ?? max)
                                }
                                initMin={initMin || 0}
                                initMax={initMax || 99999}
                                onChangeMaxPrice={(value) => {
                                  setTemporaryMaxPrice(value);
                                }}
                                onChangeMinPrice={(value) => {
                                  setTemporaryMinPrice(value);
                                }}
                              />
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={filter.id + filter.label} className="py-8">
                          <h3 className="text-xl font-medium">
                            {filter.label}
                          </h3>
                          <div className="mt-7 relative">
                            <div className="grid sm:grid-cols-2 gap-4 md:gap-x-8 md:gap-y-5">
                              {filter.values?.map((option, index) => {
                                const isCheckedFromServer =
                                  appliedFilters?.some(
                                    (af) =>
                                      af.data?.id === option.id &&
                                      af.label === option.label,
                                  );

                                //  We use the id + label as the key to avoid the same id
                                const isChecked =
                                  temporarySelectedInputs[
                                    option.id + option.label
                                  ]?.checked ?? isCheckedFromServer;

                                return (
                                  <div key={`${index + option.id}`}>
                                    <Checkbox
                                      name={option.label}
                                      label={option.label}
                                      checked={isChecked}
                                      onChange={(event) => {
                                        setTemporarySelectedInputs({
                                          ...temporarySelectedInputs,
                                          [option.id + option.label]: {
                                            ...option,
                                            checked: event.target.checked,
                                          },
                                        });
                                      }}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-6 ps-4 flex-shrink-0 border-t flex items-center justify-between">
                  <ButtonThird
                    onClick={() => {
                      setTemporaryMinPrice(undefined);
                      setTemporaryMaxPrice(undefined);
                      const newstate = filters
                        .filter((i) => i.type !== 'PRICE_RANGE')
                        .reduce((acc, filter) => {
                          const values = filter.values?.reduce(
                            (acc, option) => {
                              return {
                                ...acc,
                                [option.id + option.label]: {
                                  ...option,
                                  checked: false,
                                },
                              };
                            },
                            {},
                          );
                          return {
                            ...acc,
                            ...values,
                          };
                        }, {});
                      setTemporarySelectedInputs(newstate);
                    }}
                    sizeClass="px-4 py-2.5 sm:px-4"
                    type="button"
                  >
                    Clear all
                  </ButtonThird>
                  <ButtonPrimary
                    onClick={closeModalMoreFilter}
                    sizeClass="px-4 py-2.5 sm:px-5 md:px-8"
                    loading={LOADING}
                    type="submit"
                  >
                    Apply
                  </ButtonPrimary>
                </div>
              </form>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

function filterInputToParams(
  rawInput: string | ProductFilter,
  params: URLSearchParams,
) {
  const input =
    typeof rawInput === 'string'
      ? (JSON.parse(rawInput) as ProductFilter)
      : rawInput;

  Object.entries(input).forEach(([key, value]) => {
    if (params.has(`${FILTER_URL_PREFIX}${key}`, JSON.stringify(value))) {
      return;
    }
    if (key === 'price') {
      // For price, we want to overwrite
      params.set(`${FILTER_URL_PREFIX}${key}`, JSON.stringify(value));
    } else {
      params.append(`${FILTER_URL_PREFIX}${key}`, JSON.stringify(value));
    }
  });

  return params;
}

function getPropsDataForPriceTab({
  filter,
  appliedFilters,
  defaultPriceFilter,
  params,
}: {
  filter: Filter;
  appliedFilters: AppliedFilter[];
  defaultPriceFilter: Props['defaultPriceFilter'];
  params: URLSearchParams;
}) {
  const isActive = appliedFilters.some((af) =>
    af.data?.id?.includes(filter.id),
  );
  const priceFilter = params.get(`${FILTER_URL_PREFIX}price`);
  const price = priceFilter
    ? (JSON.parse(priceFilter) as ProductFilter['price'])
    : undefined;
  const min = isNaN(Number(price?.min)) ? undefined : Number(price?.min);
  const max = isNaN(Number(price?.max)) ? undefined : Number(price?.max);
  const initPrice = JSON.parse(
    (defaultPriceFilter?.value?.input as string) || '{}',
  ) as ProductFilter;
  const initMaxWithCurrency = parseAsCurrency(
    initPrice?.price?.max ?? 0,
    defaultPriceFilter?.locale,
  );
  return {
    filter,
    appliedFilters,
    min,
    max,
    initMin: initPrice?.price?.min || 0,
    initMax: initPrice?.price?.max || 100,
    initMaxWithCurrency,
    isActive,
    initPrice,
  };
}

function getPriceNewParams({
  maxPrice,
  minPrice,
  params,
}: {
  minPrice: number | undefined;
  maxPrice: number | undefined;
  params: URLSearchParams;
}) {
  if (minPrice === undefined && maxPrice === undefined) {
    params.delete(`${FILTER_URL_PREFIX}price`);
    return params;
  }

  const price = {
    ...(minPrice === undefined ? {} : {min: minPrice}),
    ...(maxPrice === undefined ? {} : {max: maxPrice}),
  };
  const newParams = filterInputToParams({price}, params);
  return newParams;
}

function CountActived({isActive, count}: {isActive: boolean; count: number}) {
  if (isActive && count) {
    return (
      <div className="absolute -top-0 -right-1 text-[0.55rem] bg-primary-800 text-white rounded-full p-0.5 min-w-4 h-4 flex items-center justify-center text-center ring ring-offset-0 ring-white pointer-events-none leading-none">
        {count}
      </div>
    );
  }
  return null;
}
