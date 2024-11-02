import {Image, type ParsedMetafields} from '@shopify/hydrogen';
import {parseSection} from '~/utils/parseSection';
import type {
  HeroItemFragment,
  SectionHeroSliderFragment,
} from 'storefrontapi.generated';
import {useEffect, useRef, useState} from 'react';
import ButtonPrimary from '~/components/Button/ButtonPrimary';
import useInterval from 'beautiful-react-hooks/useInterval';
import useHorizontalSwipe from 'beautiful-react-hooks/useHorizontalSwipe';
import clsx from 'clsx';

let TIME_OUT: NodeJS.Timeout | null = null;

export function SectionHeroSlider(props: SectionHeroSliderFragment) {
  const DATA = props?.hero_items?.references?.nodes || [];

  const ref = useRef<HTMLDivElement>(null);
  const swipeState = useHorizontalSwipe(ref, {
    threshold: 100,
    preventDefault: false,
    passive: true,
  });
  const [isSlided, setIsSlided] = useState(false);
  const [indexActive, setIndexActive] = useState(0);
  const [isRunning, toggleIsRunning] = useState(true);

  useEffect(() => {
    if (isSlided || !indexActive) {
      return;
    }
    setIsSlided(true);
  }, [indexActive, isSlided]);

  useEffect(() => {
    if (swipeState.swiping || !swipeState.direction || !swipeState.count) {
      return;
    }
    swipeState.direction === 'left' && handleClickNext();
    swipeState.direction === 'right' && handleClickPrev();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swipeState.direction, swipeState.swiping, swipeState.count]);

  useInterval(
    () => {
      handleAutoNext();
    },
    isRunning ? 5000 : 999999,
  );

  const handleAutoNext = () => {
    setIndexActive((state) => {
      if (state >= DATA.length - 1) {
        return 0;
      }
      return state + 1;
    });
  };

  const handleClickNext = () => {
    setIndexActive((state) => {
      if (state >= DATA.length - 1) {
        return 0;
      }
      return state + 1;
    });
    handleAfterClick();
  };

  const handleClickPrev = () => {
    setIndexActive((state) => {
      if (state === 0) {
        return DATA.length - 1;
      }
      return state - 1;
    });
    handleAfterClick();
  };

  const handleAfterClick = () => {
    toggleIsRunning(false);
    if (TIME_OUT) {
      clearTimeout(TIME_OUT);
    }
    TIME_OUT = setTimeout(() => {
      toggleIsRunning(true);
    }, 1000);
  };
  // ================= ================= =================

  const renderDots = () => {
    if (!DATA.length || DATA.length < 2) {
      return null;
    }

    return (
      <>
        <div className="absolute bottom-4 inset-x-px z-10 ">
          <div className="container flex items-center justify-center gap-2">
            {DATA.map((_, index) => {
              const isActive = index === indexActive;
              return (
                <button
                  key={`item-${index + 1}`} // Fix: Generate a unique key using a unique identifier
                  className="relative py-1.5 flex-1 max-w-20"
                  onClick={() => {
                    setIndexActive(index);
                    handleAfterClick();
                  }}
                >
                  <div className="relative h-1 w-full rounded-md bg-white shadow-sm">
                    {isActive && (
                      <div className="nc-SectionHeroSliderItem__dot absolute inset-0 rounded-md bg-slate-900" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className="absolute inset-y-px end-0 px-10 hidden lg:flex items-center justify-center z-10 text-slate-700"
          onClick={handleClickNext}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={0.6}
            stroke="currentColor"
            className="h-12 w-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
        <button
          type="button"
          className="absolute inset-y-px start-0 px-10 hidden lg:flex items-center justify-center z-10 text-slate-700"
          onClick={handleClickPrev}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={0.6}
            stroke="currentColor"
            className="h-12 w-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      </>
    );
  };

  return (
    <section className="section-hero-slider relative" ref={ref}>
      {DATA.map((section, index) =>
        indexActive === index ? (
          <div
            key={(index + 1).toString()}
            className={clsx(
              'nc-SectionHeroSliderItem',
              isSlided && 'nc-SectionHeroSliderItem--animation',
            )}
          >
            <SectionItem section={section} />
          </div>
        ) : null,
      )}

      {/* DOT, Next/Prev Btns */}
      {renderDots()}
    </section>
  );
}

const SectionItem = ({section}: {section: HeroItemFragment}) => {
  const item = parseSection<
    HeroItemFragment,
    {
      heading?: ParsedMetafields['list.single_line_text_field'];
      sub_heading?: ParsedMetafields['list.single_line_text_field'];
      vertical_image?: ParsedMetafields['list.file_reference'];
      horizontal_image?: ParsedMetafields['list.file_reference'];
    }
  >(section);

  return (
    <div className="aspect-h-16 aspect-w-10 relative flex flex-col-reverse overflow-hidden sm:aspect-h-16 sm:aspect-w-13 lg:aspect-h-7 lg:aspect-w-16 2xl:aspect-h-[5.75] 2xl:aspect-w-16 lg:flex-col bg-slate-100">
      {/* BG */}
      <div className="nc-SectionHeroSliderItem__image">
        {!!item.horizontal_image?.image && (
          <Image
            data={item.horizontal_image?.image}
            sizes="110vw"
            className="hidden h-full w-full object-cover lg:block"
          />
        )}

        {!!item.vertical_image?.image && (
          <Image
            data={item.vertical_image?.image}
            sizes="100vw"
            className="block h-full w-full object-cover object-bottom lg:hidden"
          />
        )}
      </div>

      {/* CONTENT */}
      <div className="flex py-12 sm:py-14 lg:items-center lg:pb-20">
        <div className="container relative">
          <div className="nc-SectionHeroSliderItem__left relative w-full max-w-3xl space-y-8 lg:space-y-14">
            <div className="space-y-5 sm:space-y-6">
              {!!item.sub_heading?.value && (
                <span
                  className="nc-SectionHeroSliderItem__subheading block text-base font-medium text-slate-700 md:text-xl"
                  dangerouslySetInnerHTML={{__html: item.sub_heading.value}}
                />
              )}
              {!!item.heading?.value && (
                <h2
                  className="nc-SectionHeroSliderItem__heading text-3xl font-semibold !leading-[114%] text-slate-900 sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl"
                  dangerouslySetInnerHTML={{__html: item.heading.value}}
                />
              )}
            </div>

            {!!item.cta_button?.href && (
              <ButtonPrimary
                className="nc-SectionHeroSliderItem__button"
                sizeClass="py-3 px-6 sm:py-5 sm:px-9"
                fontSize="text-sm sm:text-base xl:text-lg font-medium"
                href={item.cta_button?.href?.value}
                targetBlank={item.cta_button?.target?.value === 'true'}
              >
                <span>{item.cta_button?.text?.value}</span>
                {!!item.cta_button?.icon_svg?.value && (
                  <span
                    className="ms-2.5 *:!h-5 *:!w-5"
                    dangerouslySetInnerHTML={{
                      __html: item.cta_button?.icon_svg.value,
                    }}
                  />
                )}
              </ButtonPrimary>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const HERO_ITEM_FRAGMENT = `#graphql
    fragment HeroItem on Metaobject {
      type
      heading: field(key: "heading") {
        value
      }
      sub_heading: field(key: "sub_heading") {
        value
      }
      cta_button: field(key: "cta_button") {
        ...Link
      }
      vertical_image: field(key: "vertical_image") {
        key
        reference {
          ... on MediaImage {
            ...MediaImage
          }
        }
      }
      horizontal_image: field(key: "horizontal_image") {
        key
        reference {
          ... on MediaImage {
            ...MediaImage
          }
        }
      }
  }
`;

export const SECTION_HERO_SLIDER_FRAGMENT = `#graphql
  fragment SectionHeroSlider on Metaobject {
    type
    hero_items: field(key: "hero_items") {
      references(first: 10) {
        nodes {
          ... on Metaobject {
            ...HeroItem
          }
        }
      }
    }
  }
`;
