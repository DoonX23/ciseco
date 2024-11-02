import React from 'react';
import {ChevronDownIcon} from '@heroicons/react/24/solid';
import {type ParentEnhancedMenuItem} from '~/lib/utils';
import SocialsList from '../SocialsList';
import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react';
import {Form, Link, useRouteLoaderData} from '@remix-run/react';
import LangDropdown from './LangDropdown';
import {HeaderMenuDataWrap} from '../Layout';
import type {RootLoader} from '~/root';

export interface NavMobileProps {
  onClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({onClose}) => {
  const rootData = useRouteLoaderData<RootLoader>('root');
  const layout = rootData?.layout;
  const {description} = layout?.shop || {};

  const _renderMenuChild = (
    item: ParentEnhancedMenuItem,
    itemClass = ' pl-2 text-neutral-900 dark:text-neutral-200 font-medium ',
  ) => {
    return (
      <ul className="nav-mobile-sub-menu pl-4 pb-1 text-base">
        {item.items?.map((i, index) => (
          <Disclosure key={i.id} as="li">
            <Link
              to={item.to}
              className={`flex text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-0.5 pr-4 ${itemClass}`}
              target={item.target}
              prefetch="intent"
            >
              <span
                className={`py-2.5 block w-full`}
                onClick={onClose}
                aria-hidden
              >
                {i.title}
              </span>
            </Link>
          </Disclosure>
        ))}
      </ul>
    );
  };

  const _renderItem = (item: ParentEnhancedMenuItem, index: number) => {
    return (
      <Disclosure
        key={item.id}
        as="li"
        className="text-slate-900 dark:text-white"
      >
        <Link
          className="flex w-full items-center py-2.5 px-2.5 font-medium uppercase tracking-wide text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          to={item.to}
          target={item.target}
          prefetch="intent"
        >
          <span
            className={!item.items.length ? 'block w-full' : ''}
            onClick={onClose}
            aria-hidden
          >
            {item.title}
          </span>
          {!!item.items.length && (
            <span
              className="block flex-grow"
              onClick={(e) => e.preventDefault()}
              aria-hidden
            >
              <DisclosureButton
                as="span"
                className="flex justify-end flex-grow"
              >
                <ChevronDownIcon
                  className="ml-2 h-4 w-4 text-neutral-500"
                  aria-hidden="true"
                />
              </DisclosureButton>
            </span>
          )}
        </Link>
        {!!item.items.length && (
          <DisclosurePanel>{_renderMenuChild(item)}</DisclosurePanel>
        )}
      </Disclosure>
    );
  };

  const renderMagnifyingGlassIcon = () => {
    return (
      <svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 22L20 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const renderSearchForm = () => {
    if (typeof window === 'undefined') return null;

    const searchParams = new URLSearchParams(window.location.search);
    const searchTerm = searchParams.get('q')!;

    return (
      <Form
        action="/search"
        method="get"
        className="flex-1 text-slate-900 dark:text-slate-200"
        onSubmit={() => {
          onClose && onClose();
        }}
      >
        <div className="bg-slate-50 dark:bg-slate-800 flex space-x-1 p-2 rounded-xl h-full">
          <input
            name="q"
            defaultValue={searchTerm}
            type="search"
            placeholder="Type and press enter"
            className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-sm "
          />
          <button
            className="flex items-center justify-center px-2"
            type="submit"
          >
            {renderMagnifyingGlassIcon()}
          </button>
        </div>
      </Form>
    );
  };

  return (
    <div className="w-full h-full overflow-auto py-2 bg-white divide-y divide-neutral-100 hiddenScrollbar">
      <div className="pb-6 pt-2.5 grid gap-5">
        {/* <Logo /> */}
        <div className="flex flex-col text-slate-600 dark:text-slate-300 text-sm gap-4">
          {!!description && <span>{description}</span>}

          <div className="flex justify-between items-center">
            <HeaderMenuDataWrap>
              {({headerData}) => {
                return (
                  <SocialsList
                    data={headerData.socials.edges.map((edge) => {
                      const node = edge.node;
                      return {
                        name: node.title?.value || '',
                        icon: node.icon?.reference?.image?.url || '',
                        href: node.link?.value || '',
                      };
                    })}
                    itemClass="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xl"
                  />
                );
              }}
            </HeaderMenuDataWrap>
          </div>
        </div>

        <div className="">{renderSearchForm()}</div>
      </div>
      <ul className="flex flex-col py-6 gap-y-1.5">
        <HeaderMenuDataWrap>
          {({headerMenu}) => {
            return headerMenu?.items.map(_renderItem);
          }}
        </HeaderMenuDataWrap>
      </ul>
      <div className="flex items-center justify-between py-6 gap-x-2">
        <LangDropdown className="border rounded-full" />
      </div>
    </div>
  );
};

export default NavMobile;
