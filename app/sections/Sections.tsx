import type {SectionsFragment} from 'storefrontapi.generated';
import {
  HERO_ITEM_FRAGMENT,
  SECTION_HERO_SLIDER_FRAGMENT,
  SectionHeroSlider,
} from './SectionHeroSlider';
import {
  COMMON_COLLECTION_ITEM_FRAGMENT,
  COMMON_PRODUCT_CARD_FRAGMENT,
  LINK_FRAGMENT,
  MEDIA_IMAGE_FRAGMENT,
} from '~/data/commonFragments';
import {
  SECTION_COLLECTIONS_SLIDER_FRAGMENT,
  SectionCollectionsSlider,
} from './SectionCollectionsSlider';
import {
  SECTION_PRODUCTS_SLIDER_FRAGMENT,
  SectionProductsSlider,
} from './SectionProductsSlider';
import {SECTION_STEPS_FRAGMENT, SectionSteps} from './SectionSteps';
import {
  SECTION_IMAGEWITHTEXT_FRAGMENT,
  SectionImageWithText,
} from './SectionImageWithText';
import {
  SECTION_TABS_COLLECTONS_BY_GROUP_FRAGMENT,
  SectionTabsCollectionsByGroup,
} from './SectionTabsCollectionsByGroup';
import {
  SECTION_GRID_PRODUCTS_AND_FILTER_FRAGMENT,
  SectionGridProductsAndFilter,
} from './SectionGridProductsAndFilter';
import {
  SECTION_LATEST_BLOG_FRAGMENT,
  SectionLatestBlog,
} from './SectionLatestBlog';
import {
  SECTION_CLIENTS_SAY_FRAGMENT,
  SectionClientsSay,
} from './SectionClientsSay';
import clsx from 'clsx';
import {SECTION_HERO_FRAGMENT, SectionHero} from './SectionHero';
import {OKENDO_PRODUCT_STAR_RATING_FRAGMENT} from '@okendo/shopify-hydrogen';

export interface SectionProps {
  sections: SectionsFragment;
  className?: string;
  hasDivider?: boolean;
  showFirstDivider?: boolean;
  paddingTopPx?: number;
}

export type CisecoSectionType =
  | 'ciseco--section_hero'
  | 'ciseco--section_hero_slider'
  | 'ciseco--section_collections_slider'
  | 'ciseco--section_products_slider'
  | 'ciseco--section_steps'
  | 'ciseco--section_image_with_text'
  | 'ciseco--section_tabs_collections_by_group'
  | 'ciseco--section_grid_products_and_filter'
  | 'ciseco--section_latest_blog'
  | 'ciseco--section_clients_say';

export function Sections({
  sections,
  className = 'space-y-20 sm:space-y-24 lg:space-y-28 xl:space-y-32',
  paddingTopPx,
  ...args
}: SectionProps) {
  return (
    <div
      className={clsx('sections', className)}
      style={{
        paddingTop: paddingTopPx ? `${paddingTopPx}px` : undefined,
      }}
    >
      {sections?.references?.nodes.map((section, index, arr) => {
        switch (section.type as CisecoSectionType) {
          case 'ciseco--section_hero':
            return (
              <WrapSection key={section.id} index={index} {...args}>
                <SectionHero {...section} key={section.id} />
              </WrapSection>
            );
          case 'ciseco--section_hero_slider':
            return (
              <WrapSection key={section.id} index={index} {...args}>
                <SectionHeroSlider {...section} key={section.id} />
              </WrapSection>
            );
          case 'ciseco--section_collections_slider':
            return (
              <WrapSection key={section.id} index={index} {...args}>
                <SectionCollectionsSlider {...section} key={section.id} />
              </WrapSection>
            );
          case 'ciseco--section_products_slider':
            return (
              <WrapSection key={section.id} index={index} {...args}>
                <SectionProductsSlider {...section} key={section.id} />
              </WrapSection>
            );

          case 'ciseco--section_steps':
            return (
              <WrapSection key={section.id} index={index} {...args}>
                <SectionSteps {...section} key={section.id} />
              </WrapSection>
            );
          case 'ciseco--section_image_with_text':
            return (
              <WrapSection key={section.id} index={index} {...args}>
                <SectionImageWithText {...section} key={section.id} />
              </WrapSection>
            );
          case 'ciseco--section_tabs_collections_by_group':
            return (
              <WrapSection key={section.id} index={index} {...args}>
                <SectionTabsCollectionsByGroup {...section} key={section.id} />
              </WrapSection>
            );
          case 'ciseco--section_grid_products_and_filter':
            return (
              <WrapSection key={section.id} index={index} {...args}>
                <SectionGridProductsAndFilter {...section} key={section.id} />
              </WrapSection>
            );
          case 'ciseco--section_latest_blog':
            return (
              <WrapSection key={section.id} index={index} {...args}>
                <SectionLatestBlog {...section} key={section.id} />
              </WrapSection>
            );
          case 'ciseco--section_clients_say':
            return (
              <WrapSection key={section.id} index={index} {...args}>
                <SectionClientsSay {...section} key={section.id} />
              </WrapSection>
            );

          // case 'section_another':
          //   return <AnotherSection />;
          default:
            // eslint-disable-next-line no-console
            console.log(`Unsupported section type: ${section.type}`);
            return null;
        }
      })}
    </div>
  );
}

function WrapSection({
  children,
  index,
  hasDivider,
  showFirstDivider,
}: {
  children: React.ReactNode;
  index: number;
  hasDivider?: boolean;
  showFirstDivider?: boolean;
}) {
  const isFirst = index === 0;

  return (
    <>
      {((isFirst && showFirstDivider) || (!isFirst && hasDivider)) && (
        <div className="container">
          <hr />
        </div>
      )}
      {children}
    </>
  );
}

export const SECTIONS_FRAGMENT = `#graphql
  fragment Sections on MetaobjectField {
    ... on MetaobjectField {
      references(first: 20) {
        nodes {
          ... on Metaobject {
            id
            type
            ...SectionHero
            ...SectionHeroSlider
            ...SectionCollectionsSlider
            ...SectionProductsSlider
            ...SectionSteps
            ...SectionImageWithText
            ...SectionTabsCollectionsByGroup
            ...SectionGridProductsAndFilter
            ...SectionLatestBlog
            ...SectionClientsSay
          }
        }
      }
    }
  }
  # All section fragments
  ${SECTION_HERO_FRAGMENT} 
  ${SECTION_HERO_SLIDER_FRAGMENT} 
  ${SECTION_COLLECTIONS_SLIDER_FRAGMENT}
  ${SECTION_PRODUCTS_SLIDER_FRAGMENT}
  ${SECTION_STEPS_FRAGMENT}
  ${SECTION_IMAGEWITHTEXT_FRAGMENT}
  ${SECTION_TABS_COLLECTONS_BY_GROUP_FRAGMENT}
  ${SECTION_GRID_PRODUCTS_AND_FILTER_FRAGMENT}
  ${SECTION_LATEST_BLOG_FRAGMENT}
  ${SECTION_CLIENTS_SAY_FRAGMENT}

  # All common fragments
  ${COMMON_PRODUCT_CARD_FRAGMENT}
  ${MEDIA_IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${COMMON_COLLECTION_ITEM_FRAGMENT}
  ${HERO_ITEM_FRAGMENT}
`;
