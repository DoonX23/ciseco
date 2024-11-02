import {ParsedMetafields, parseMetafield} from '@shopify/hydrogen';
import {
  Metafield,
  SelectedOption,
} from '@shopify/hydrogen/storefront-api-types';

export function getProductFeatureText({
  outstanding_features,
  variants,
}: {
  outstanding_features?: Pick<Metafield, 'value'> | null;
  variants?: {
    nodes: Array<{
      selectedOptions: Array<SelectedOption>;
    }>;
  } | null;
}) {
  const parsed_outstanding_features = outstanding_features
    ? parseMetafield<ParsedMetafields['list.single_line_text_field']>(
        outstanding_features,
      )
    : null;
  const firstVariant = variants?.nodes?.[0];

  const firstVariantIsDefault = Boolean(
    firstVariant?.selectedOptions.find(
      (option: SelectedOption) =>
        option.name === 'Title' && option.value === 'Default Title',
    ),
  );

  //  If the first variant is the default variant, use the outstanding features
  const featureText = parsed_outstanding_features?.parsedValue?.[0] || '';
  const featureOptionText =
    firstVariant?.selectedOptions?.find((option) => option.name === 'Color')
      ?.value || featureText;

  return firstVariantIsDefault ? featureText : featureOptionText;
}
