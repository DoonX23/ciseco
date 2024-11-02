import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from '@headlessui/react';
import {useLocation, useSearchParams, useNavigate} from '@remix-run/react';
import type {Location} from '@remix-run/react';
import {Fragment} from 'react';
import {ChevronDownIcon} from '@heroicons/react/24/outline';
import Radio from './Radio';
import {MySortIcon} from './Icons/MySortIcon';
import clsx from 'clsx';

export type SortParam =
  | 'price-low-high'
  | 'price-high-low'
  | 'best-selling'
  | 'newest'
  | 'featured'
  | 'relevance';

const DEMO: {label: string; key: SortParam}[] = [
  {label: 'Featured', key: 'featured'},
  {
    label: 'Price: Low - High',
    key: 'price-low-high',
  },
  {
    label: 'Price: High - Low',
    key: 'price-high-low',
  },
  {
    label: 'Best Selling',
    key: 'best-selling',
  },
  {
    label: 'Newest',
    key: 'newest',
  },
];
export interface SortMenuProps {
  items?: {
    label: string;
    key: SortParam;
  }[];
}
export default function SortMenu({items = DEMO}: SortMenuProps) {
  const [params] = useSearchParams();
  const location = useLocation();
  const activeItem =
    items.find((item) => item.key === params.get('sort')) || items[0];
  const navigate = useNavigate();

  const renderTabsSortOrder = () => {
    return (
      <Popover className="relative flex-shrink-0">
        {({open, close}) => (
          <>
            <PopoverButton
              className={clsx(
                `flex gap-2 flex-shrink-0 items-center justify-center ps-4 pe-3.5 py-2 text-sm border rounded-full focus:outline-none select-none`,
                activeItem?.key || open
                  ? 'border-primary-600 bg-primary-50 text-primary-900'
                  : 'border-neutral-300 text-neutral-700 hover:border-neutral-500',
              )}
            >
              <MySortIcon />

              <span className="hidden sm:block flex-shrink-0">
                {(activeItem || items[0]).label || 'Sort order'}
              </span>
              <span className="block sm:hidden flex-shrink-0">
                <span className="hidden sm:inline-block">Sort order</span>
                <span className="inline-block sm:hidden">Sort</span>
              </span>
              <ChevronDownIcon className="w-4 h-4 ml-3 flex-shrink-0 hidden sm:block" />
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
              <PopoverPanel className="absolute z-40 w-screen px-2.5 mt-3 right-0 sm:px-0 max-w-72 sm:max-w-xs xl:max-w-sm">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {items.map((item) => (
                      <Radio
                        id={item.key}
                        key={item.key}
                        name={'rdo-sort-order'}
                        label={item.label}
                        defaultChecked={activeItem?.key === item.key}
                        onChange={(_) => {
                          const newL = getSortLink(item.key, params, location);
                          navigate(newL, {preventScrollReset: true});
                          close();
                        }}
                      />
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between"></div>
                </div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  return <>{renderTabsSortOrder()}</>;
}

function getSortLink(
  sort: SortParam,
  params: URLSearchParams,
  location: Location,
) {
  params.set('sort', sort);
  return `${location.pathname}?${params.toString()}`;
}
