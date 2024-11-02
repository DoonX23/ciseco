import {type SortParam} from '~/components/SortMenu';
import {FILTER_URL_PREFIX} from '~/components/SortFilter';
import {type ProductFilter} from '@shopify/hydrogen/storefront-api-types';
import {getPaginationVariables} from '@shopify/hydrogen';
import {getSortValuesFromParam} from './getSortValuesFromParam';

export const getPaginationAndFiltersFromRequest = (
  request: Request,
  pageBy = 12,
) => {
  const paginationVariables = getPaginationVariables(request, {
    pageBy,
  });
  const searchParams = new URL(request.url).searchParams;

  const {sortKey, reverse} = getSortValuesFromParam(
    searchParams.get('sort') as SortParam,
  );
  const filters = [...searchParams.entries()].reduce(
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
  return {paginationVariables, filters, sortKey, reverse};
};
