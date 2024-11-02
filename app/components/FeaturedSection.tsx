import {useEffect} from 'react';
import {useFetcher} from '@remix-run/react';
import {usePrefixPathWithLocale} from '~/lib/utils';
import type {FeaturedData} from '~/routes/($locale).featured-products';
import {CollectionSlider} from '~/sections/SectionCollectionsSlider';
import {SnapSliderProducts} from './SnapSliderProducts';

export function FeaturedSection({
  className = 'space-y-24',
}: {
  className?: string;
}) {
  const {load, data} = useFetcher<FeaturedData>();
  const path = usePrefixPathWithLocale('/featured-products');

  useEffect(() => {
    load(path);
  }, [load, path]);

  if (!data) return null;

  const {featuredCollections, featuredProducts} = data;

  return (
    <div className={className}>
      <CollectionSlider
        heading_bold={'Trending Collections'}
        collections={featuredCollections?.nodes}
        headingFontClass="text-2xl md:text-3xl font-semibold"
      />
      <SnapSliderProducts
        heading_bold={'Trending Products'}
        products={featuredProducts.nodes}
        cardStyle="1"
        headingFontClass="text-2xl md:text-3xl font-semibold"
      />
    </div>
  );
}
