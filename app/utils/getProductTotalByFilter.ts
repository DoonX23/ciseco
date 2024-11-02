import {type FilterValue} from '@shopify/hydrogen/storefront-api-types';

export const getProductTotalByFilter = (
  values?: Pick<FilterValue, 'input' | 'count' | 'label'>[],
) => {
  return values?.reduce((acc, value) => acc + value.count, 0) || 0;
};
