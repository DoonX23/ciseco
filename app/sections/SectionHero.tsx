import React, {type FC} from 'react';
import {parseSection} from '~/utils/parseSection';
import {Image, type ParsedMetafields} from '@shopify/hydrogen';
import type {
  HeroItemFragment,
  SectionHeroFragment,
} from 'storefrontapi.generated';
import ButtonPrimary from '~/components/Button/ButtonPrimary';

export function SectionHero(props: SectionHeroFragment) {
  const heroItem = props.hero_item?.reference
    ? parseSection<
        HeroItemFragment,
        {
          heading?: ParsedMetafields['list.single_line_text_field'];
          sub_heading?: ParsedMetafields['list.single_line_text_field'];
          vertical_image?: ParsedMetafields['list.file_reference'];
          horizontal_image?: ParsedMetafields['list.file_reference'];
        }
      >(props.hero_item?.reference)
    : null;

  if (!heroItem) {
    return null;
  }

  const {cta_button, heading, horizontal_image, sub_heading, vertical_image} =
    heroItem;

  return (
    <div className="container px-4">
      <div className="nc-SectionHero aspect-h-16 aspect-w-10 relative overflow-hidden rounded-2xl bg-slate-100 sm:aspect-h-4 sm:aspect-w-3 lg:aspect-h-7 lg:aspect-w-16 2xl:aspect-w-16 2xl:aspect-h-7">
        {/* BG */}
        <div>
          {horizontal_image?.image && (
            <Image
              sizes="110vw"
              className="hidden h-full w-full object-cover lg:block"
              data={horizontal_image?.image}
            />
          )}

          {vertical_image?.image && (
            <Image
              sizes="100vw"
              className="block h-full w-full object-cover object-bottom lg:hidden"
              data={vertical_image?.image}
            />
          )}
        </div>

        {/* CONTENT */}
        <div className="flex py-12 sm:py-14 lg:items-center lg:pb-20">
          <div className="container relative">
            <div className="flex max-w-lg flex-col items-start space-y-5 xl:max-w-2xl xl:space-y-8 ">
              {sub_heading?.value && (
                <span className="font-semibold text-neutral-900 sm:text-lg md:text-xl">
                  {sub_heading?.value}
                </span>
              )}
              {heading?.value && (
                <h2
                  className="text-3xl font-bold !leading-[115%] text-black sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl "
                  dangerouslySetInnerHTML={{__html: heading?.value}}
                />
              )}
              {!!cta_button?.href?.value && (
                <div className="sm:pt-4">
                  <ButtonPrimary
                    sizeClass="px-6 py-3 lg:px-8 lg:py-4"
                    fontSize="text-sm sm:text-base lg:text-lg font-medium"
                    href={cta_button?.href?.value || ''}
                    targetBlank={cta_button?.target?.value === 'true'}
                  >
                    <span>{cta_button?.text?.value}</span>
                    {!!cta_button?.icon_svg?.value && (
                      <span
                        className="ms-2.5 flex max-w-5 *:!h-5 *:!w-5"
                        dangerouslySetInnerHTML={{
                          __html: cta_button?.icon_svg.value,
                        }}
                      />
                    )}
                  </ButtonPrimary>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const SECTION_HERO_FRAGMENT = `#graphql
  fragment SectionHero on Metaobject {
    type
    hero_item: field(key: "hero_item") {
      reference {
          ... on Metaobject {
            ...HeroItem
          }
      }
    }
  }
`;
