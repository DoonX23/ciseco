import {type ParsedMetafields} from '@shopify/hydrogen';
import {parseSection} from '~/utils/parseSection';
import type {
  CollectionOnGroupItemFragment,
  SectionTabsCollectionsByGroupFragment,
} from 'storefrontapi.generated';
import {useState} from 'react';
import CollectionCard1 from '@/components/CollectionCards/CollectionCard1';
import CollectionCard4, {
  CollectionCard4Skeleton,
} from '@/components/CollectionCards/CollectionCard4';
import Heading from '@/components/Heading/Heading';
import NavItem from '@/components/NavItem';
import CollectionCard6 from '@/components/CollectionCards/CollectionCard6';
import Nav from '~/components/Nav';
import BackgroundSection from '~/components/BackgroundSection';
import {getProductTotalByFilter} from '~/utils/getProductTotalByFilter';

export function SectionTabsCollectionsByGroup(
  props: SectionTabsCollectionsByGroupFragment,
) {
  const section = parseSection<
    SectionTabsCollectionsByGroupFragment,
    // override metafields types that have been parsed
    {
      heading?: ParsedMetafields['single_line_text_field'];
    }
  >(props);

  const {
    collection_groups,
    heading,
    number_collections_to_show,
    sub_heading,
    card_style,
    background_color,
  } = section;
  const boxCard = card_style?.value || '4';

  const [tabActive, setTabActive] = useState(0);

  const currentGroup = collection_groups?.nodes?.[tabActive];
  const noneBgColor =
    !background_color?.value ||
    background_color?.value === '#fff' ||
    background_color?.value === '#ffffff';
  const isSkeleton = !currentGroup?.collections;

  const renderCard = (item: CollectionOnGroupItemFragment, index: number) => {
    if (!item.id || index >= (Number(number_collections_to_show?.value) || 6)) {
      return null;
    }

    switch (boxCard) {
      case '1':
        return <CollectionCard1 key={item.id} collection={item} />;
      case '6':
        return <CollectionCard6 key={item.id} collection={item} />;
      default:
        return (
          <CollectionCard4
            key={item.id}
            count={getProductTotalByFilter(item.products.filters?.[0]?.values)}
            collection={item}
            bgColor={noneBgColor ? 'bg-neutral-50' : undefined}
          />
        );
    }
  };

  const renderHeading = () => {
    const moreThanOneGroup = (collection_groups?.nodes?.length || 1) > 1;

    return (
      <div>
        <Heading
          className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50"
          fontClass="text-3xl md:text-4xl 2xl:text-5xl font-semibold"
          isCenter
          desc={sub_heading?.value || ''}
        >
          {heading?.value || 'Discover More'}
        </Heading>
        {moreThanOneGroup && (
          <Nav
            className="p-1 bg-white dark:bg-neutral-800 rounded-full shadow-lg overflow-x-auto hiddenScrollbar"
            containerClassName="mb-12 lg:mb-14 relative flex justify-center w-full text-sm md:text-base"
          >
            {collection_groups?.nodes.map((item, index) => (
              <NavItem
                key={item.id}
                isActive={tabActive === index}
                onClick={() => setTabActive(index)}
              >
                <div className="flex items-center justify-center space-x-1.5 sm:space-x-2.5 text-xs sm:text-sm ">
                  {item.icon_svg?.value && (
                    <span
                      className="inline-block *:w-full *:h-full w-4 h-4 sm:w-5 sm:h-5"
                      dangerouslySetInnerHTML={{
                        __html: item.icon_svg?.value || '',
                      }}
                    ></span>
                  )}
                  <span>{item.name?.value}</span>
                </div>
              </NavItem>
            ))}
          </Nav>
        )}
      </div>
    );
  };

  return (
    <section className="section-TabsCollectionsByGroup container">
      <div className={!noneBgColor ? 'relative py-24 lg:py-32' : ''}>
        {background_color?.value && (
          <BackgroundSection
            style={{backgroundColor: background_color?.value}}
          />
        )}
        {renderHeading()}
        <div className="grid gap-4 md:gap-7 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {isSkeleton &&
            [...Array(6)].map((_, index) => (
              <CollectionCard4Skeleton key={index + 'skeleton'} />
            ))}
          {!isSkeleton &&
            currentGroup?.collections?.nodes.map((item, index) =>
              renderCard(item as CollectionOnGroupItemFragment, index),
            )}
        </div>
      </div>
    </section>
  );
}

const COLLECTION_GROUP_FRAGMENT = `#graphql
fragment CollectionOnGroupItem on Collection {
    ...CommonCollectionItem
    products(first: 0) {
      filters {
        values {
          input
          count
          label
        }
      }
    }
  }

  fragment CollectionGroupItem on Metaobject {
    type
    id
    handle
    title: field(key: "title") {
     type
     key
     value
    }
    name: field(key: "name") {
     type
     key
     value
    }
    icon_svg: field(key: "icon_svg") {
     type
     key
     value
    }
    
    collections: field(key: "collections") {
      references(first: 12) {
        nodes {
          ... on Collection {
            ...CollectionOnGroupItem
          }
        }
      }
    }
}
`;

export const SECTION_TABS_COLLECTONS_BY_GROUP_FRAGMENT = `#graphql
  fragment SectionTabsCollectionsByGroup on Metaobject {
    type
    heading: field(key: "heading") {
     type
     key
     value
    }
    card_style: field(key: "card_style") {
     type
     key
     value
    }
    sub_heading: field(key: "sub_heading") {
     type
     key
     value
    }
    number_collections_to_show: field(key: "number_collections_to_show") {
     type
     key
     value
    }
    background_color: field(key: "background_color") {
     type
     key
     value
    }
    collection_groups: field(key: "collection_groups") {
      references(first: 20) {
        nodes {
          ...CollectionGroupItem
        }
      }
    }
  }
  ${COLLECTION_GROUP_FRAGMENT} `;
