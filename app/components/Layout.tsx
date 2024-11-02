import {Await, useRouteLoaderData} from '@remix-run/react';
import {Suspense} from 'react';
import type {
  FooterMenuQuery,
  HeaderMenuQuery,
  LayoutQuery,
} from 'storefrontapi.generated';
import {type EnhancedMenu, parseMenu, useIsHomePath} from '~/lib/utils';
import MainNav from './Header/MainNav';
import NavMobile from './Header/NavMobile';
import Logo from './Logo';
import Footer from './Footer';
import {CartLoading} from './CartLoading';
import {Cart} from './Cart';
import type {RootLoader} from '~/root';
import {Aside, useAside} from './Aside';

type LayoutProps = {
  children: React.ReactNode;
  layout?: LayoutQuery;
};

export function Layout({children, layout}: LayoutProps) {
  return (
    <Aside.Provider>
      <div className="flex flex-col min-h-screen">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>

        {!!layout && <MyHeader />}

        <main role="main" className="flex-grow">
          {children}
        </main>
      </div>

      {!!layout && <Footer />}
    </Aside.Provider>
  );
}

function MyHeader() {
  const isHome = useIsHomePath();

  return (
    <>
      <CartAside />
      <MobileMenuAside />
      <div className="nc-Header z-20">
        <MainNav isHome={isHome} />
      </div>
    </>
  );
}

function CartAside() {
  const rootData = useRouteLoaderData<RootLoader>('root');
  const {close} = useAside();
  return (
    <Aside heading="Shopping Cart" openFrom="right" type="cart">
      <Suspense fallback={<CartLoading />}>
        <Await resolve={rootData?.cart}>
          {(cart) => {
            return <Cart onClose={close} cart={cart || null} />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

function MobileMenuAside() {
  const {close} = useAside();
  return (
    <Aside openFrom="left" renderHeading={() => <Logo />} type="mobile">
      <NavMobile onClose={close} />
    </Aside>
  );
}

export function HeaderMenuDataWrap({
  children,
  fallback = null,
}: {
  fallback?: React.ReactNode;
  children: ({
    headerData,
    headerMenu,
  }: {
    headerMenu: EnhancedMenu | null | undefined;
    headerData: HeaderMenuQuery;
  }) => React.ReactNode;
}) {
  const rootData = useRouteLoaderData<RootLoader>('root');

  const headerPromise = rootData?.headerPromise;
  const layout = rootData?.layout;
  const env = rootData?.env;

  const shop = layout?.shop;

  const customPrefixes = {BLOG: '', CATALOG: 'products'};
  return (
    <Suspense fallback={fallback}>
      <Await resolve={headerPromise}>
        {(headerData) => {
          const menu =
            headerData?.headerMenu && shop?.primaryDomain?.url && env
              ? parseMenu(
                  headerData.headerMenu,
                  shop?.primaryDomain?.url,
                  env,
                  customPrefixes,
                )
              : undefined;

          return headerData ? children({headerData, headerMenu: menu}) : null;
        }}
      </Await>
    </Suspense>
  );
}

export function FooterMenuDataWrap({
  children,
}: {
  children: ({
    footerData,
    footerMenu,
  }: {
    footerMenu: EnhancedMenu | null | undefined;
    footerData: FooterMenuQuery;
  }) => React.ReactNode;
}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  const footerPromise = rootData?.footerPromise;
  const layout = rootData?.layout;
  const env = rootData?.env;
  const shop = layout?.shop;

  const customPrefixes = {BLOG: '', CATALOG: 'products'};
  return (
    <Suspense fallback={null}>
      <Await resolve={footerPromise}>
        {(footerData) => {
          const menu =
            footerData?.footerMenu && shop?.primaryDomain?.url && env
              ? parseMenu(
                  footerData.footerMenu,
                  shop.primaryDomain.url,
                  env,
                  customPrefixes,
                )
              : undefined;
          return footerData ? children({footerData, footerMenu: menu}) : null;
        }}
      </Await>
    </Suspense>
  );
}
