import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/24/solid';
import {Fragment} from 'react';
import {Link, useRouteLoaderData} from '@remix-run/react';
import CollectionItem from '../CollectionItem';
import {HeaderMenuDataWrap} from '../Layout';
import type {ChildEnhancedMenuItem, ParentEnhancedMenuItem} from '~/lib/utils';
import type {RootLoader} from '~/root';

export default function TemplatesDropdown() {
  const rootLoaderData = useRouteLoaderData<RootLoader>('root');

  if (!rootLoaderData) {
    return null;
  }

  return (
    <div className="TemplatesDropdown">
      <HeaderMenuDataWrap
        fallback={
          <div className="text-opacity-90 py-2 h-10 sm:h-12 flex items-center rounded-md text-sm lg:text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-0">
            <span>Await</span>
            <ChevronDownIcon className="text-opacity-70 ml-2 h-5 w-5 text-neutral-700 group-hover:text-opacity-80 transition ease-in-out duration-150" />
          </div>
        }
      >
        {({headerData, headerMenu}) => (
          <Popover className="">
            {({open, close}) => (
              <>
                <PopoverButton
                  className={`
                  ${open ? '' : 'text-opacity-90'}
                  group py-2 h-10 sm:h-12 flex items-center rounded-md text-sm lg:text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-0`}
                >
                  <span>{headerMenu?.title || 'Shops'}</span>
                  <ChevronDownIcon
                    className={`${open ? '-rotate-180' : 'text-opacity-70 '}
                    ml-2 h-5 w-5 text-neutral-700 group-hover:text-opacity-80 transition ease-in-out duration-150 `}
                    aria-hidden="true"
                  />
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
                  <PopoverPanel className="absolute z-20 w-full mt-3.5 inset-x-0">
                    <div className="bg-white dark:bg-neutral-900 shadow-lg">
                      <div className="container">
                        <div className="flex text-sm border-t border-slate-200 dark:border-slate-700 py-10 lg:py-14">
                          <div className="flex-1 grid grid-cols-4 gap-6 xl:gap-8 pr-6 xl:pr-8">
                            {headerMenu?.items.map((item, index) => (
                              <MenuItem
                                item={item}
                                key={item.id + '-' + index.toString()}
                                close={close}
                              />
                            ))}
                          </div>
                          <div className="hidden lg:block w-[40%] xl:w-[35%]">
                            <CollectionItem
                              onClick={close}
                              item={headerData.featuredCollections.nodes?.[0]}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </PopoverPanel>
                </Transition>
              </>
            )}
          </Popover>
        )}
      </HeaderMenuDataWrap>
    </div>
  );
}

function MenuItem({
  item,
  close,
}: {
  item: ParentEnhancedMenuItem;
  close: () => void;
}) {
  return (
    <div key={item.id}>
      {!item.to.startsWith('http') ? (
        <Link
          to={item.to}
          target={item.target}
          prefetch="intent"
          className="font-medium text-slate-900 dark:text-neutral-200"
          onClick={close}
        >
          {item.title}
        </Link>
      ) : (
        <a
          href={item.to}
          target={item.target}
          className="font-medium text-slate-900 dark:text-neutral-200"
          onClick={close}
        >
          {item.title}
        </a>
      )}

      {/* subbbbb */}
      <ul className="grid space-y-4 mt-4">
        {item.items?.map((subItem: ChildEnhancedMenuItem) => (
          <li key={subItem.id} onClick={close} aria-hidden>
            {!subItem.to.startsWith('http') ? (
              <Link
                className="font-normal text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white"
                to={subItem.to}
                target={subItem.target}
                prefetch="intent"
                onClick={close}
              >
                {subItem.title}
              </Link>
            ) : (
              <a
                className="font-normal text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white"
                href={subItem.to}
                target={subItem.target}
                onClick={close}
              >
                {subItem.title}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
