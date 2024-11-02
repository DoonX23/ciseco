import {SECTIONS_FRAGMENT, Sections} from '~/sections/Sections';
import type {RouteContentQuery} from 'storefrontapi.generated';

export function RouteContent({
  route,
  className,
}: {
  route: RouteContentQuery['route'];
  className?: string;
}) {
  return (
    <>
      {route?.sections && (
        <Sections
          className={className}
          sections={route.sections}
          hasDivider={route.separation_line_between_sections?.value === 'true'}
          showFirstDivider={route.firt_line_on_top?.value === 'true'}
          paddingTopPx={Number(route.padding_top_px?.value) || undefined}
        />
      )}
    </>
  );
}

export const ROUTE_CONTENT_QUERY = `#graphql
  query RouteContent($handle: String!
    $country: CountryCode
    $language: LanguageCode
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys!
    $reverse: Boolean
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    )
    @inContext(country: $country, language: $language)
     {
    route: metaobject(handle: {type: "ciseco--route", handle: $handle}) {
      type
      id
      title: field(key: "title") {
        key
        value
      }
      padding_top_px: field(key: "padding_top_px") {
        type
        key
        value
      }
      firt_line_on_top: field(key: "firt_line_on_top") {
        type
        key
        value
      }
      separation_line_between_sections: field(key: "separation_line_between_sections") {
        type
        key
        value
      }
      sections: field(key: "sections") {
        ...Sections
      }
    }
  }
  ${SECTIONS_FRAGMENT}
`;
