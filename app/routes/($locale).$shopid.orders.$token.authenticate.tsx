import {redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import invariant from 'tiny-invariant';
import ButtonPrimary from '~/components/Button/ButtonPrimary';
import PageHeader from '~/components/PageHeader';

/*
 If your online store had active orders before you launched your Hydrogen storefront,
 and the Hydrogen storefront uses the same domain formerly used by the online store,
 then customers will receive 404 pages when they click on the old order status URLs
 that are routing to your Hydrogen storefront. To prevent this, ensure that you redirect
 those requests back to Shopify.
*/
export async function loader({
  request,
  context: {storefront},
}: LoaderFunctionArgs) {
  const {origin} = new URL(request.url);
  const {shop} = await storefront.query(
    `#graphql
      query getShopPrimaryDomain { shop { primaryDomain { url } } }
    `,
    {cache: storefront.CacheLong()},
  );
  invariant(shop, 'Error redirecting to the order status URL');
  return redirect(request.url.replace(origin, shop.primaryDomain.url));
}

export default function () {
  return null;
}
export function ErrorBoundary() {
  return (
    <div>
      <PageHeader title={'Error redirecting to the order status URL'} />
      <div className="flex items-baseline justify-between w-full">
        <ButtonPrimary type="button" onClick={() => window.location.reload()}>
          Try Again
        </ButtonPrimary>
      </div>
    </div>
  );
}
