import {
  type Image as SImage,
  type Maybe,
} from '@shopify/hydrogen/customer-account-api-types';
import {type GenericFile} from '@shopify/hydrogen/storefront-api-types';

export type TImage = Maybe<
  Pick<SImage, 'altText' | 'width' | 'height' | 'url'>
>;

export interface Link {
  href: {
    value: string;
  };
  target: {
    value: 'false' | 'true';
  };
  text: {
    value: string;
  };
}

export interface Image extends GenericFile {}
