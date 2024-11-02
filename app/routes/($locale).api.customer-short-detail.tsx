import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {CACHE_NONE} from '~/data/cache';
import {CUSTOMER_SHORT_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';

export async function loader({request, context, params}: LoaderFunctionArgs) {
  const {data, errors} = await context.customerAccount.query(
    CUSTOMER_SHORT_DETAILS_QUERY,
  );

  /**
   * If the customer failed to load, we assume their access token is invalid.
   */
  if (errors?.length || !data?.customer) {
    return {
      customer: null,
    };
  }

  const customer = data?.customer;

  return defer(
    {
      customer,
    },
    {
      headers: {
        'Cache-Control': CACHE_NONE,
        'Set-Cookie': await context.session.commit(),
      },
    },
  );
}

// no-op
export default function Index() {
  return null;
}
