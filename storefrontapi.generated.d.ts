/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontAPI from '@shopify/hydrogen/storefront-api-types';

export type OrderCardFragment = Pick<
  StorefrontAPI.Order,
  'id' | 'orderNumber' | 'processedAt' | 'financialStatus' | 'fulfillmentStatus'
> & {
  currentTotalPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  lineItems: {
    edges: Array<{
      node: Pick<StorefrontAPI.OrderLineItem, 'title'> & {
        variant?: StorefrontAPI.Maybe<{
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'height' | 'width'>
          >;
        }>;
      };
    }>;
  };
};

export type AddSubscriberMutationVariables = StorefrontAPI.Exact<{
  password?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['String']['input']>;
  email?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['String']['input']>;
}>;

export type AddSubscriberMutation = {
  customerCreate?: StorefrontAPI.Maybe<{
    customer?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Customer, 'id'>>;
    customerUserErrors: Array<
      Pick<StorefrontAPI.CustomerUserError, 'message' | 'field' | 'code'>
    >;
  }>;
};

export type MediaImageFragment = {
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'altText' | 'url' | 'width' | 'height'>
  >;
};

export type LinkFragment = {
  reference?: StorefrontAPI.Maybe<{
    href?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
    target?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
    text?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
    icon_svg?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MetaobjectField, 'value'>
    >;
  }>;
};

export type LinkContentFragment = {
  href?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  target?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  text?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  icon_svg?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
};

export type OkendoStarRatingSnippetFragment = {
  okendoStarRatingSnippet?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metafield, 'value'>
  >;
};

export type OkendoReviewsSnippetFragment = {
  okendoReviewsSnippet?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metafield, 'value'>
  >;
};

export type CommonProductCardVariantFragment = Pick<
  StorefrontAPI.ProductVariant,
  'id' | 'title' | 'availableForSale'
> & {
  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
  >;
  selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>>;
  product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
};

export type CommonProductCardFragment = Pick<
  StorefrontAPI.Product,
  'id' | 'title' | 'handle' | 'publishedAt' | 'availableForSale' | 'vendor'
> & {
  options: Array<Pick<StorefrontAPI.ProductOption, 'name' | 'values'>>;
  featuredImage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
  >;
  images: {
    edges: Array<{
      node: Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>;
    }>;
  };
  variants: {
    nodes: Array<
      Pick<
        StorefrontAPI.ProductVariant,
        'id' | 'title' | 'availableForSale'
      > & {
        price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
        selectedOptions: Array<
          Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
        >;
        product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
      }
    >;
  };
  priceRange: {
    minVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  };
  compareAtPriceRange: {
    minVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  };
  reviews_rating_count?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metafield, 'type' | 'id' | 'value' | 'namespace' | 'key'>
  >;
  reviews_rating?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metafield, 'type' | 'id' | 'value' | 'namespace' | 'key'>
  >;
  outstanding_features?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metafield, 'type' | 'id' | 'value' | 'namespace' | 'key'>
  >;
  okendoStarRatingSnippet?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metafield, 'value'>
  >;
};

export type CommonCollectionItemFragment = Pick<
  StorefrontAPI.Collection,
  'id' | 'title' | 'updatedAt' | 'description' | 'handle'
> & {
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'altText' | 'width' | 'height' | 'url'>
  >;
  horizontal_image?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MediaImage, 'id'> & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'altText' | 'height' | 'width' | 'url'>
        >;
      }
    >;
  }>;
  seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
};

type Media_ExternalVideo_Fragment = {__typename: 'ExternalVideo'} & Pick<
  StorefrontAPI.ExternalVideo,
  'id' | 'embedUrl' | 'host' | 'mediaContentType' | 'alt'
> & {previewImage?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>};

type Media_MediaImage_Fragment = {__typename: 'MediaImage'} & Pick<
  StorefrontAPI.MediaImage,
  'id' | 'mediaContentType' | 'alt'
> & {
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'id' | 'url' | 'width' | 'height'>
    >;
    previewImage?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
  };

type Media_Model3d_Fragment = {__typename: 'Model3d'} & Pick<
  StorefrontAPI.Model3d,
  'id' | 'mediaContentType' | 'alt'
> & {
    sources: Array<Pick<StorefrontAPI.Model3dSource, 'mimeType' | 'url'>>;
    previewImage?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
  };

type Media_Video_Fragment = {__typename: 'Video'} & Pick<
  StorefrontAPI.Video,
  'id' | 'mediaContentType' | 'alt'
> & {
    sources: Array<Pick<StorefrontAPI.VideoSource, 'mimeType' | 'url'>>;
    previewImage?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
  };

export type MediaFragment =
  | Media_ExternalVideo_Fragment
  | Media_MediaImage_Fragment
  | Media_Model3d_Fragment
  | Media_Video_Fragment;

export type MoneyFragment = Pick<
  StorefrontAPI.MoneyV2,
  'currencyCode' | 'amount'
>;

export type CartLineFragment = Pick<
  StorefrontAPI.CartLine,
  'id' | 'quantity'
> & {
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  cost: {
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    amountPerQuantity: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
  };
  merchandise: Pick<
    StorefrontAPI.ProductVariant,
    'id' | 'availableForSale' | 'requiresShipping' | 'title'
  > & {
    compareAtPrice?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
    >;
    product: Pick<StorefrontAPI.Product, 'handle' | 'title' | 'id' | 'vendor'>;
    selectedOptions: Array<
      Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
    >;
  };
};

export type CartApiQueryFragment = Pick<
  StorefrontAPI.Cart,
  'updatedAt' | 'id' | 'checkoutUrl' | 'totalQuantity' | 'note'
> & {
  buyerIdentity: Pick<
    StorefrontAPI.CartBuyerIdentity,
    'countryCode' | 'email' | 'phone'
  > & {
    customer?: StorefrontAPI.Maybe<
      Pick<
        StorefrontAPI.Customer,
        'id' | 'email' | 'firstName' | 'lastName' | 'displayName'
      >
    >;
  };
  lines: {
    nodes: Array<
      Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
        attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
        cost: {
          totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
          amountPerQuantity: Pick<
            StorefrontAPI.MoneyV2,
            'currencyCode' | 'amount'
          >;
          compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
          >;
        };
        merchandise: Pick<
          StorefrontAPI.ProductVariant,
          'id' | 'availableForSale' | 'requiresShipping' | 'title'
        > & {
          compareAtPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
          >;
          price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
          image?: StorefrontAPI.Maybe<
            Pick<
              StorefrontAPI.Image,
              'id' | 'url' | 'altText' | 'width' | 'height'
            >
          >;
          product: Pick<
            StorefrontAPI.Product,
            'handle' | 'title' | 'id' | 'vendor'
          >;
          selectedOptions: Array<
            Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
          >;
        };
      }
    >;
  };
  cost: {
    subtotalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    totalDutyAmount?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    totalTaxAmount?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
  };
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  discountCodes: Array<
    Pick<StorefrontAPI.CartDiscountCode, 'code' | 'applicable'>
  >;
};

export type MenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
>;

export type ChildMenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
>;

export type ParentMenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
> & {
  items: Array<
    Pick<
      StorefrontAPI.MenuItem,
      'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
    >
  >;
};

export type MenuFragment = Pick<StorefrontAPI.Menu, 'id' | 'title'> & {
  items: Array<
    Pick<
      StorefrontAPI.MenuItem,
      'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
    > & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        >
      >;
    }
  >;
};

export type LayoutQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
}>;

export type LayoutQuery = {
  shop: Pick<StorefrontAPI.Shop, 'id' | 'name' | 'description'> & {
    primaryDomain: Pick<StorefrontAPI.Domain, 'url'>;
    brand?: StorefrontAPI.Maybe<{
      logo?: StorefrontAPI.Maybe<{
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'width' | 'height'>
        >;
      }>;
      squareLogo?: StorefrontAPI.Maybe<{
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'altText' | 'height' | 'width' | 'url'>
        >;
      }>;
    }>;
  };
};

export type ShopFragment = Pick<
  StorefrontAPI.Shop,
  'id' | 'name' | 'description'
> & {
  primaryDomain: Pick<StorefrontAPI.Domain, 'url'>;
  brand?: StorefrontAPI.Maybe<{
    logo?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'url' | 'width' | 'height'>
      >;
    }>;
    squareLogo?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'altText' | 'height' | 'width' | 'url'>
      >;
    }>;
  }>;
};

export type FooterMenuQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  footerMenuHandle: StorefrontAPI.Scalars['String']['input'];
}>;

export type FooterMenuQuery = {
  footerMenu?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Menu, 'id' | 'title'> & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        > & {
          items: Array<
            Pick<
              StorefrontAPI.MenuItem,
              'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
            >
          >;
        }
      >;
    }
  >;
};

export type HeaderMenuQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  headerMenuHandle: StorefrontAPI.Scalars['String']['input'];
  featuredCollectionsFirst: StorefrontAPI.Scalars['Int']['input'];
  socialsFirst: StorefrontAPI.Scalars['Int']['input'];
}>;

export type HeaderMenuQuery = {
  headerMenu?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Menu, 'id' | 'title'> & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        > & {
          items: Array<
            Pick<
              StorefrontAPI.MenuItem,
              'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
            >
          >;
        }
      >;
    }
  >;
  featuredCollections: {
    nodes: Array<
      Pick<
        StorefrontAPI.Collection,
        'id' | 'title' | 'updatedAt' | 'description' | 'handle'
      > & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'altText' | 'width' | 'height' | 'url'>
        >;
        horizontal_image?: StorefrontAPI.Maybe<{
          reference?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MediaImage, 'id'> & {
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'altText' | 'height' | 'width' | 'url'
                >
              >;
            }
          >;
        }>;
        seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
      }
    >;
  };
  socials: {
    edges: Array<{
      node: Pick<StorefrontAPI.Metaobject, 'type' | 'id' | 'handle'> & {
        title?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
        >;
        description?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
        >;
        icon?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'type' | 'key'> & {
            reference?: StorefrontAPI.Maybe<{
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'altText' | 'url' | 'width' | 'height'
                >
              >;
            }>;
          }
        >;
        link?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
        >;
      };
    }>;
  };
};

export type GetShopPrimaryDomainQueryVariables = StorefrontAPI.Exact<{
  [key: string]: never;
}>;

export type GetShopPrimaryDomainQuery = {
  shop: {primaryDomain: Pick<StorefrontAPI.Domain, 'url'>};
};

export type SeoCollectionContentQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type SeoCollectionContentQuery = {
  shop: Pick<StorefrontAPI.Shop, 'name' | 'description'>;
};

export type ApiAllProductsQueryVariables = StorefrontAPI.Exact<{
  query?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['String']['input']>;
  count?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  reverse?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Boolean']['input']>;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  sortKey?: StorefrontAPI.InputMaybe<StorefrontAPI.ProductSortKeys>;
}>;

export type ApiAllProductsQuery = {
  products: {
    nodes: Array<
      Pick<
        StorefrontAPI.Product,
        | 'id'
        | 'title'
        | 'handle'
        | 'publishedAt'
        | 'availableForSale'
        | 'vendor'
      > & {
        options: Array<Pick<StorefrontAPI.ProductOption, 'name' | 'values'>>;
        featuredImage?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
        images: {
          edges: Array<{
            node: Pick<
              StorefrontAPI.Image,
              'url' | 'altText' | 'width' | 'height'
            >;
          }>;
        };
        variants: {
          nodes: Array<
            Pick<
              StorefrontAPI.ProductVariant,
              'id' | 'title' | 'availableForSale'
            > & {
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              selectedOptions: Array<
                Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
              >;
              product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
            }
          >;
        };
        priceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        compareAtPriceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        reviews_rating_count?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Metafield,
            'type' | 'id' | 'value' | 'namespace' | 'key'
          >
        >;
        reviews_rating?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Metafield,
            'type' | 'id' | 'value' | 'namespace' | 'key'
          >
        >;
        outstanding_features?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Metafield,
            'type' | 'id' | 'value' | 'namespace' | 'key'
          >
        >;
        okendoStarRatingSnippet?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'value'>
        >;
      }
    >;
  };
};

export type CollectionDetailsQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  filters?: StorefrontAPI.InputMaybe<
    Array<StorefrontAPI.ProductFilter> | StorefrontAPI.ProductFilter
  >;
  sortKey: StorefrontAPI.ProductCollectionSortKeys;
  reverse?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Boolean']['input']>;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type CollectionDetailsQuery = {
  collection?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Collection,
      'id' | 'handle' | 'title' | 'description'
    > & {
      seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'id' | 'url' | 'width' | 'height' | 'altText'>
      >;
      productsWithDefaultFilter: {
        filters: Array<
          Pick<StorefrontAPI.Filter, 'id' | 'label' | 'type'> & {
            values: Array<
              Pick<
                StorefrontAPI.FilterValue,
                'id' | 'label' | 'count' | 'input'
              >
            >;
          }
        >;
      };
      products: {
        filters: Array<
          Pick<StorefrontAPI.Filter, 'id' | 'label' | 'type'> & {
            values: Array<
              Pick<
                StorefrontAPI.FilterValue,
                'id' | 'label' | 'count' | 'input'
              >
            >;
          }
        >;
        nodes: Array<
          Pick<
            StorefrontAPI.Product,
            | 'id'
            | 'title'
            | 'handle'
            | 'publishedAt'
            | 'availableForSale'
            | 'vendor'
          > & {
            options: Array<
              Pick<StorefrontAPI.ProductOption, 'name' | 'values'>
            >;
            featuredImage?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
            >;
            images: {
              edges: Array<{
                node: Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >;
              }>;
            };
            variants: {
              nodes: Array<
                Pick<
                  StorefrontAPI.ProductVariant,
                  'id' | 'title' | 'availableForSale'
                > & {
                  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'url' | 'altText' | 'width' | 'height'
                    >
                  >;
                  selectedOptions: Array<
                    Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                  >;
                  product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
                }
              >;
            };
            priceRange: {
              minVariantPrice: Pick<
                StorefrontAPI.MoneyV2,
                'amount' | 'currencyCode'
              >;
            };
            compareAtPriceRange: {
              minVariantPrice: Pick<
                StorefrontAPI.MoneyV2,
                'amount' | 'currencyCode'
              >;
            };
            reviews_rating_count?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Metafield,
                'type' | 'id' | 'value' | 'namespace' | 'key'
              >
            >;
            reviews_rating?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Metafield,
                'type' | 'id' | 'value' | 'namespace' | 'key'
              >
            >;
            outstanding_features?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Metafield,
                'type' | 'id' | 'value' | 'namespace' | 'key'
              >
            >;
            okendoStarRatingSnippet?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Metafield, 'value'>
            >;
          }
        >;
        pageInfo: Pick<
          StorefrontAPI.PageInfo,
          'hasPreviousPage' | 'hasNextPage' | 'endCursor' | 'startCursor'
        >;
      };
    }
  >;
};

export type CollectionsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type CollectionsQuery = {
  collections: {
    nodes: Array<
      Pick<
        StorefrontAPI.Collection,
        'id' | 'title' | 'updatedAt' | 'description' | 'handle'
      > & {
        products: {
          filters: Array<{
            values: Array<
              Pick<StorefrontAPI.FilterValue, 'input' | 'count' | 'label'>
            >;
          }>;
        };
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'altText' | 'width' | 'height' | 'url'>
        >;
        horizontal_image?: StorefrontAPI.Maybe<{
          reference?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MediaImage, 'id'> & {
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'altText' | 'height' | 'width' | 'url'
                >
              >;
            }
          >;
        }>;
        seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
      }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'hasPreviousPage' | 'hasNextPage' | 'startCursor' | 'endCursor'
    >;
  };
};

export type FeaturedItemsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  pageBy?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
}>;

export type FeaturedItemsQuery = {
  featuredCollections: {
    nodes: Array<
      Pick<
        StorefrontAPI.Collection,
        'id' | 'title' | 'updatedAt' | 'description' | 'handle'
      > & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'altText' | 'width' | 'height' | 'url'>
        >;
        horizontal_image?: StorefrontAPI.Maybe<{
          reference?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MediaImage, 'id'> & {
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'altText' | 'height' | 'width' | 'url'
                >
              >;
            }
          >;
        }>;
        seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
      }
    >;
  };
  featuredProducts: {
    nodes: Array<
      Pick<
        StorefrontAPI.Product,
        | 'id'
        | 'title'
        | 'handle'
        | 'publishedAt'
        | 'availableForSale'
        | 'vendor'
      > & {
        options: Array<Pick<StorefrontAPI.ProductOption, 'name' | 'values'>>;
        featuredImage?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
        images: {
          edges: Array<{
            node: Pick<
              StorefrontAPI.Image,
              'url' | 'altText' | 'width' | 'height'
            >;
          }>;
        };
        variants: {
          nodes: Array<
            Pick<
              StorefrontAPI.ProductVariant,
              'id' | 'title' | 'availableForSale'
            > & {
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              selectedOptions: Array<
                Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
              >;
              product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
            }
          >;
        };
        priceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        compareAtPriceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        reviews_rating_count?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Metafield,
            'type' | 'id' | 'value' | 'namespace' | 'key'
          >
        >;
        reviews_rating?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Metafield,
            'type' | 'id' | 'value' | 'namespace' | 'key'
          >
        >;
        outstanding_features?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Metafield,
            'type' | 'id' | 'value' | 'namespace' | 'key'
          >
        >;
        okendoStarRatingSnippet?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'value'>
        >;
      }
    >;
  };
};

export type ArticleDetailsQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  blogHandle: StorefrontAPI.Scalars['String']['input'];
  articleHandle: StorefrontAPI.Scalars['String']['input'];
}>;

export type ArticleDetailsQuery = {
  blog?: StorefrontAPI.Maybe<{
    articleByHandle?: StorefrontAPI.Maybe<
      Pick<
        StorefrontAPI.Article,
        | 'id'
        | 'title'
        | 'contentHtml'
        | 'publishedAt'
        | 'tags'
        | 'excerpt'
        | 'content'
      > & {
        author?: StorefrontAPI.Maybe<Pick<StorefrontAPI.ArticleAuthor, 'name'>>;
        image?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Image,
            'id' | 'altText' | 'url' | 'width' | 'height'
          >
        >;
        seo?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Seo, 'description' | 'title'>
        >;
      }
    >;
  }>;
};

export type BlogQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  blogHandle: StorefrontAPI.Scalars['String']['input'];
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  query?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['String']['input']>;
}>;

export type BlogQuery = {
  blog?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Blog, 'title'> & {
      seo?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Seo, 'title' | 'description'>
      >;
      articles: {
        edges: Array<{
          node: Pick<
            StorefrontAPI.Article,
            'excerpt' | 'handle' | 'id' | 'publishedAt' | 'title' | 'tags'
          > & {
            author?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.ArticleAuthor, 'name'>
            >;
            authorV2?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.ArticleAuthor, 'name' | 'bio'>
            >;
            image?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'altText' | 'url' | 'width' | 'height'
              >
            >;
          };
        }>;
        pageInfo: Pick<
          StorefrontAPI.PageInfo,
          'hasPreviousPage' | 'hasNextPage' | 'endCursor' | 'startCursor'
        >;
      };
    }
  >;
};

export type ArticleFragment = Pick<
  StorefrontAPI.Article,
  'excerpt' | 'handle' | 'id' | 'publishedAt' | 'title' | 'tags'
> & {
  author?: StorefrontAPI.Maybe<Pick<StorefrontAPI.ArticleAuthor, 'name'>>;
  authorV2?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.ArticleAuthor, 'name' | 'bio'>
  >;
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'id' | 'altText' | 'url' | 'width' | 'height'>
  >;
};

export type PageDetailsQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type PageDetailsQuery = {
  page?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Page, 'id' | 'title' | 'body'> & {
      seo?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Seo, 'description' | 'title'>
      >;
    }
  >;
};

export type PolicyHandleFragment = Pick<
  StorefrontAPI.ShopPolicy,
  'body' | 'handle' | 'id' | 'title' | 'url'
>;

export type PoliciesHandleQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  privacyPolicy: StorefrontAPI.Scalars['Boolean']['input'];
  shippingPolicy: StorefrontAPI.Scalars['Boolean']['input'];
  termsOfService: StorefrontAPI.Scalars['Boolean']['input'];
  refundPolicy: StorefrontAPI.Scalars['Boolean']['input'];
}>;

export type PoliciesHandleQuery = {
  shop: {
    privacyPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
    shippingPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
    termsOfService?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
    refundPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
  };
};

export type PolicyIndexFragment = Pick<
  StorefrontAPI.ShopPolicy,
  'id' | 'title' | 'handle'
>;

export type PoliciesIndexQueryVariables = StorefrontAPI.Exact<{
  [key: string]: never;
}>;

export type PoliciesIndexQuery = {
  shop: {
    privacyPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    shippingPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    termsOfService?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    refundPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    subscriptionPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicyWithDefault, 'id' | 'title' | 'handle'>
    >;
  };
};

export type ProductVariantFragmentFragment = Pick<
  StorefrontAPI.ProductVariant,
  'id' | 'availableForSale' | 'sku' | 'title'
> & {
  selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>>;
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
  >;
  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  compareAtPrice?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
  >;
  unitPrice?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
  >;
  product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
};

export type ProductQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  handle: StorefrontAPI.Scalars['String']['input'];
  selectedOptions:
    | Array<StorefrontAPI.SelectedOptionInput>
    | StorefrontAPI.SelectedOptionInput;
}>;

export type ProductQuery = {
  product?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Product,
      | 'id'
      | 'title'
      | 'vendor'
      | 'handle'
      | 'descriptionHtml'
      | 'description'
      | 'publishedAt'
    > & {
      collections: {
        nodes: Array<Pick<StorefrontAPI.Collection, 'id' | 'title' | 'handle'>>;
      };
      reviews_rating_count?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'id' | 'value' | 'namespace' | 'key'>
      >;
      reviews_rating?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'id' | 'value' | 'namespace' | 'key'>
      >;
      outstanding_features?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'id' | 'value' | 'namespace' | 'key'>
      >;
      options: Array<Pick<StorefrontAPI.ProductOption, 'name' | 'values'>>;
      selectedVariant?: StorefrontAPI.Maybe<
        Pick<
          StorefrontAPI.ProductVariant,
          'id' | 'availableForSale' | 'sku' | 'title'
        > & {
          selectedOptions: Array<
            Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
          >;
          image?: StorefrontAPI.Maybe<
            Pick<
              StorefrontAPI.Image,
              'id' | 'url' | 'altText' | 'width' | 'height'
            >
          >;
          price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
          compareAtPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
          unitPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
          product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
        }
      >;
      media: {
        nodes: Array<
          | ({__typename: 'ExternalVideo'} & Pick<
              StorefrontAPI.ExternalVideo,
              'id' | 'embedUrl' | 'host' | 'mediaContentType' | 'alt'
            > & {
                previewImage?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, 'url'>
                >;
              })
          | ({__typename: 'MediaImage'} & Pick<
              StorefrontAPI.MediaImage,
              'id' | 'mediaContentType' | 'alt'
            > & {
                image?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, 'id' | 'url' | 'width' | 'height'>
                >;
                previewImage?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, 'url'>
                >;
              })
          | ({__typename: 'Model3d'} & Pick<
              StorefrontAPI.Model3d,
              'id' | 'mediaContentType' | 'alt'
            > & {
                sources: Array<
                  Pick<StorefrontAPI.Model3dSource, 'mimeType' | 'url'>
                >;
                previewImage?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, 'url'>
                >;
              })
          | ({__typename: 'Video'} & Pick<
              StorefrontAPI.Video,
              'id' | 'mediaContentType' | 'alt'
            > & {
                sources: Array<
                  Pick<StorefrontAPI.VideoSource, 'mimeType' | 'url'>
                >;
                previewImage?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, 'url'>
                >;
              })
        >;
      };
      variants: {
        nodes: Array<
          Pick<
            StorefrontAPI.ProductVariant,
            'id' | 'availableForSale' | 'sku' | 'title'
          > & {
            selectedOptions: Array<
              Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
            >;
            image?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'url' | 'altText' | 'width' | 'height'
              >
            >;
            price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
            compareAtPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
            >;
            unitPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
            >;
            product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
          }
        >;
      };
      seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
      okendoStarRatingSnippet?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      okendoReviewsSnippet?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
    }
  >;
  shop: Pick<StorefrontAPI.Shop, 'name'> & {
    primaryDomain: Pick<StorefrontAPI.Domain, 'url'>;
    shippingPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'handle'>
    >;
    refundPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'handle'>
    >;
    subscriptionPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicyWithDefault, 'handle'>
    >;
  };
};

export type VariantsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type VariantsQuery = {
  product?: StorefrontAPI.Maybe<{
    variants: {
      nodes: Array<
        Pick<
          StorefrontAPI.ProductVariant,
          'id' | 'availableForSale' | 'sku' | 'title'
        > & {
          selectedOptions: Array<
            Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
          >;
          image?: StorefrontAPI.Maybe<
            Pick<
              StorefrontAPI.Image,
              'id' | 'url' | 'altText' | 'width' | 'height'
            >
          >;
          price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
          compareAtPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
          unitPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
          product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
        }
      >;
    };
  }>;
};

export type ProductRecommendationsQueryVariables = StorefrontAPI.Exact<{
  productId: StorefrontAPI.Scalars['ID']['input'];
  count?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type ProductRecommendationsQuery = {
  recommended?: StorefrontAPI.Maybe<
    Array<
      Pick<
        StorefrontAPI.Product,
        | 'id'
        | 'title'
        | 'handle'
        | 'publishedAt'
        | 'availableForSale'
        | 'vendor'
      > & {
        options: Array<Pick<StorefrontAPI.ProductOption, 'name' | 'values'>>;
        featuredImage?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
        images: {
          edges: Array<{
            node: Pick<
              StorefrontAPI.Image,
              'url' | 'altText' | 'width' | 'height'
            >;
          }>;
        };
        variants: {
          nodes: Array<
            Pick<
              StorefrontAPI.ProductVariant,
              'id' | 'title' | 'availableForSale'
            > & {
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              selectedOptions: Array<
                Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
              >;
              product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
            }
          >;
        };
        priceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        compareAtPriceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        reviews_rating_count?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Metafield,
            'type' | 'id' | 'value' | 'namespace' | 'key'
          >
        >;
        reviews_rating?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Metafield,
            'type' | 'id' | 'value' | 'namespace' | 'key'
          >
        >;
        outstanding_features?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Metafield,
            'type' | 'id' | 'value' | 'namespace' | 'key'
          >
        >;
        okendoStarRatingSnippet?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'value'>
        >;
      }
    >
  >;
  additional: {
    nodes: Array<
      Pick<
        StorefrontAPI.Product,
        | 'id'
        | 'title'
        | 'handle'
        | 'publishedAt'
        | 'availableForSale'
        | 'vendor'
      > & {
        options: Array<Pick<StorefrontAPI.ProductOption, 'name' | 'values'>>;
        featuredImage?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
        images: {
          edges: Array<{
            node: Pick<
              StorefrontAPI.Image,
              'url' | 'altText' | 'width' | 'height'
            >;
          }>;
        };
        variants: {
          nodes: Array<
            Pick<
              StorefrontAPI.ProductVariant,
              'id' | 'title' | 'availableForSale'
            > & {
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              selectedOptions: Array<
                Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
              >;
              product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
            }
          >;
        };
        priceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        compareAtPriceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        reviews_rating_count?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Metafield,
            'type' | 'id' | 'value' | 'namespace' | 'key'
          >
        >;
        reviews_rating?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Metafield,
            'type' | 'id' | 'value' | 'namespace' | 'key'
          >
        >;
        outstanding_features?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Metafield,
            'type' | 'id' | 'value' | 'namespace' | 'key'
          >
        >;
        okendoStarRatingSnippet?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'value'>
        >;
      }
    >;
  };
};

export type AllProductsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type AllProductsQuery = {
  products: {
    nodes: Array<
      Pick<
        StorefrontAPI.Product,
        | 'id'
        | 'title'
        | 'handle'
        | 'publishedAt'
        | 'availableForSale'
        | 'vendor'
      > & {
        options: Array<Pick<StorefrontAPI.ProductOption, 'name' | 'values'>>;
        featuredImage?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
        images: {
          edges: Array<{
            node: Pick<
              StorefrontAPI.Image,
              'url' | 'altText' | 'width' | 'height'
            >;
          }>;
        };
        variants: {
          nodes: Array<
            Pick<
              StorefrontAPI.ProductVariant,
              'id' | 'title' | 'availableForSale'
            > & {
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              selectedOptions: Array<
                Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
              >;
              product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
            }
          >;
        };
        priceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        compareAtPriceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        reviews_rating_count?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Metafield,
            'type' | 'id' | 'value' | 'namespace' | 'key'
          >
        >;
        reviews_rating?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Metafield,
            'type' | 'id' | 'value' | 'namespace' | 'key'
          >
        >;
        outstanding_features?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Metafield,
            'type' | 'id' | 'value' | 'namespace' | 'key'
          >
        >;
        okendoStarRatingSnippet?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'value'>
        >;
      }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'hasPreviousPage' | 'hasNextPage' | 'startCursor' | 'endCursor'
    >;
  };
};

export type PaginatedProductsSearchQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  searchTerm: StorefrontAPI.Scalars['String']['input'];
  filters?: StorefrontAPI.InputMaybe<
    Array<StorefrontAPI.ProductFilter> | StorefrontAPI.ProductFilter
  >;
  reverse?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Boolean']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  sortKey: StorefrontAPI.SearchSortKeys;
}>;

export type PaginatedProductsSearchQuery = {
  search: {
    productFilters: Array<
      Pick<StorefrontAPI.Filter, 'id' | 'label' | 'type'> & {
        values: Array<
          Pick<StorefrontAPI.FilterValue, 'id' | 'label' | 'count' | 'input'>
        >;
      }
    >;
    nodes: Array<
      Pick<
        StorefrontAPI.Product,
        | 'id'
        | 'title'
        | 'handle'
        | 'publishedAt'
        | 'availableForSale'
        | 'vendor'
      > & {
        options: Array<Pick<StorefrontAPI.ProductOption, 'name' | 'values'>>;
        featuredImage?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
        images: {
          edges: Array<{
            node: Pick<
              StorefrontAPI.Image,
              'url' | 'altText' | 'width' | 'height'
            >;
          }>;
        };
        variants: {
          nodes: Array<
            Pick<
              StorefrontAPI.ProductVariant,
              'id' | 'title' | 'availableForSale'
            > & {
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              selectedOptions: Array<
                Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
              >;
              product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
            }
          >;
        };
        priceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        compareAtPriceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        reviews_rating_count?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Metafield,
            'type' | 'id' | 'value' | 'namespace' | 'key'
          >
        >;
        reviews_rating?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Metafield,
            'type' | 'id' | 'value' | 'namespace' | 'key'
          >
        >;
        outstanding_features?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Metafield,
            'type' | 'id' | 'value' | 'namespace' | 'key'
          >
        >;
        okendoStarRatingSnippet?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'value'>
        >;
      }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'startCursor' | 'endCursor' | 'hasNextPage' | 'hasPreviousPage'
    >;
  };
};

export type PaginatedProductsSearchForGetDefaultPriceFilterQueryVariables =
  StorefrontAPI.Exact<{
    country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
    language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
    searchTerm: StorefrontAPI.Scalars['String']['input'];
  }>;

export type PaginatedProductsSearchForGetDefaultPriceFilterQuery = {
  search: {
    productFilters: Array<
      Pick<StorefrontAPI.Filter, 'id' | 'label' | 'type'> & {
        values: Array<
          Pick<StorefrontAPI.FilterValue, 'id' | 'label' | 'count' | 'input'>
        >;
      }
    >;
  };
};

export type ProductsByHandlesQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  query?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['String']['input']>;
}>;

export type ProductsByHandlesQuery = {
  products: {
    nodes: Array<
      Pick<
        StorefrontAPI.Product,
        | 'id'
        | 'title'
        | 'handle'
        | 'publishedAt'
        | 'availableForSale'
        | 'vendor'
      > & {
        options: Array<Pick<StorefrontAPI.ProductOption, 'name' | 'values'>>;
        featuredImage?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
        images: {
          edges: Array<{
            node: Pick<
              StorefrontAPI.Image,
              'url' | 'altText' | 'width' | 'height'
            >;
          }>;
        };
        variants: {
          nodes: Array<
            Pick<
              StorefrontAPI.ProductVariant,
              'id' | 'title' | 'availableForSale'
            > & {
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              selectedOptions: Array<
                Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
              >;
              product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
            }
          >;
        };
        priceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        compareAtPriceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        reviews_rating_count?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Metafield,
            'type' | 'id' | 'value' | 'namespace' | 'key'
          >
        >;
        reviews_rating?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Metafield,
            'type' | 'id' | 'value' | 'namespace' | 'key'
          >
        >;
        outstanding_features?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Metafield,
            'type' | 'id' | 'value' | 'namespace' | 'key'
          >
        >;
        okendoStarRatingSnippet?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'value'>
        >;
      }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'hasPreviousPage' | 'hasNextPage' | 'startCursor' | 'endCursor'
    >;
  };
};

export type SitemapsQueryVariables = StorefrontAPI.Exact<{
  urlLimits?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type SitemapsQuery = {
  products: {
    nodes: Array<
      Pick<
        StorefrontAPI.Product,
        'updatedAt' | 'handle' | 'onlineStoreUrl' | 'title'
      > & {
        featuredImage?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText'>
        >;
      }
    >;
  };
  collections: {
    nodes: Array<
      Pick<StorefrontAPI.Collection, 'updatedAt' | 'handle' | 'onlineStoreUrl'>
    >;
  };
  pages: {
    nodes: Array<
      Pick<StorefrontAPI.Page, 'updatedAt' | 'handle' | 'onlineStoreUrl'>
    >;
  };
};

export type RouteContentQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  filters?: StorefrontAPI.InputMaybe<
    Array<StorefrontAPI.ProductFilter> | StorefrontAPI.ProductFilter
  >;
  sortKey: StorefrontAPI.ProductCollectionSortKeys;
  reverse?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Boolean']['input']>;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type RouteContentQuery = {
  route?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metaobject, 'type' | 'id'> & {
      title?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
      >;
      padding_top_px?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
      >;
      firt_line_on_top?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
      >;
      separation_line_between_sections?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
      >;
      sections?: StorefrontAPI.Maybe<{
        references?: StorefrontAPI.Maybe<{
          nodes: Array<
            Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
              hero_item?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Metaobject, 'type'> & {
                    heading?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    sub_heading?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    cta_button?: StorefrontAPI.Maybe<{
                      reference?: StorefrontAPI.Maybe<{
                        href?: StorefrontAPI.Maybe<
                          Pick<StorefrontAPI.MetaobjectField, 'value'>
                        >;
                        target?: StorefrontAPI.Maybe<
                          Pick<StorefrontAPI.MetaobjectField, 'value'>
                        >;
                        text?: StorefrontAPI.Maybe<
                          Pick<StorefrontAPI.MetaobjectField, 'value'>
                        >;
                        icon_svg?: StorefrontAPI.Maybe<
                          Pick<StorefrontAPI.MetaobjectField, 'value'>
                        >;
                      }>;
                    }>;
                    vertical_image?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'key'> & {
                        reference?: StorefrontAPI.Maybe<{
                          image?: StorefrontAPI.Maybe<
                            Pick<
                              StorefrontAPI.Image,
                              'altText' | 'url' | 'width' | 'height'
                            >
                          >;
                        }>;
                      }
                    >;
                    horizontal_image?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'key'> & {
                        reference?: StorefrontAPI.Maybe<{
                          image?: StorefrontAPI.Maybe<
                            Pick<
                              StorefrontAPI.Image,
                              'altText' | 'url' | 'width' | 'height'
                            >
                          >;
                        }>;
                      }
                    >;
                  }
                >;
              }>;
              hero_items?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<
                    Pick<StorefrontAPI.Metaobject, 'type'> & {
                      heading?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      sub_heading?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      cta_button?: StorefrontAPI.Maybe<{
                        reference?: StorefrontAPI.Maybe<{
                          href?: StorefrontAPI.Maybe<
                            Pick<StorefrontAPI.MetaobjectField, 'value'>
                          >;
                          target?: StorefrontAPI.Maybe<
                            Pick<StorefrontAPI.MetaobjectField, 'value'>
                          >;
                          text?: StorefrontAPI.Maybe<
                            Pick<StorefrontAPI.MetaobjectField, 'value'>
                          >;
                          icon_svg?: StorefrontAPI.Maybe<
                            Pick<StorefrontAPI.MetaobjectField, 'value'>
                          >;
                        }>;
                      }>;
                      vertical_image?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'key'> & {
                          reference?: StorefrontAPI.Maybe<{
                            image?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Image,
                                'altText' | 'url' | 'width' | 'height'
                              >
                            >;
                          }>;
                        }
                      >;
                      horizontal_image?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'key'> & {
                          reference?: StorefrontAPI.Maybe<{
                            image?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Image,
                                'altText' | 'url' | 'width' | 'height'
                              >
                            >;
                          }>;
                        }
                      >;
                    }
                  >;
                }>;
              }>;
              heading_bold?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
              >;
              heading_light?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
              >;
              sub_heading?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
              >;
              button_text?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
              >;
              collections?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<
                    Pick<
                      StorefrontAPI.Collection,
                      'id' | 'title' | 'updatedAt' | 'description' | 'handle'
                    > & {
                      image?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'altText' | 'width' | 'height' | 'url'
                        >
                      >;
                      horizontal_image?: StorefrontAPI.Maybe<{
                        reference?: StorefrontAPI.Maybe<
                          Pick<StorefrontAPI.MediaImage, 'id'> & {
                            image?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Image,
                                'altText' | 'height' | 'width' | 'url'
                              >
                            >;
                          }
                        >;
                      }>;
                      seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
                    }
                  >;
                }>;
              }>;
              body?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
              >;
              style?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
              >;
              collection?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'type' | 'key'> & {
                  reference?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Collection,
                      'id' | 'handle' | 'title' | 'description'
                    > & {
                      products: {
                        nodes: Array<
                          Pick<
                            StorefrontAPI.Product,
                            | 'id'
                            | 'title'
                            | 'handle'
                            | 'publishedAt'
                            | 'availableForSale'
                            | 'vendor'
                          > & {
                            options: Array<
                              Pick<
                                StorefrontAPI.ProductOption,
                                'name' | 'values'
                              >
                            >;
                            featuredImage?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Image,
                                'url' | 'altText' | 'width' | 'height'
                              >
                            >;
                            images: {
                              edges: Array<{
                                node: Pick<
                                  StorefrontAPI.Image,
                                  'url' | 'altText' | 'width' | 'height'
                                >;
                              }>;
                            };
                            variants: {
                              nodes: Array<
                                Pick<
                                  StorefrontAPI.ProductVariant,
                                  'id' | 'title' | 'availableForSale'
                                > & {
                                  price: Pick<
                                    StorefrontAPI.MoneyV2,
                                    'amount' | 'currencyCode'
                                  >;
                                  image?: StorefrontAPI.Maybe<
                                    Pick<
                                      StorefrontAPI.Image,
                                      'url' | 'altText' | 'width' | 'height'
                                    >
                                  >;
                                  selectedOptions: Array<
                                    Pick<
                                      StorefrontAPI.SelectedOption,
                                      'name' | 'value'
                                    >
                                  >;
                                  product: Pick<
                                    StorefrontAPI.Product,
                                    'title' | 'handle'
                                  >;
                                }
                              >;
                            };
                            priceRange: {
                              minVariantPrice: Pick<
                                StorefrontAPI.MoneyV2,
                                'amount' | 'currencyCode'
                              >;
                            };
                            compareAtPriceRange: {
                              minVariantPrice: Pick<
                                StorefrontAPI.MoneyV2,
                                'amount' | 'currencyCode'
                              >;
                            };
                            reviews_rating_count?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Metafield,
                                'type' | 'id' | 'value' | 'namespace' | 'key'
                              >
                            >;
                            reviews_rating?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Metafield,
                                'type' | 'id' | 'value' | 'namespace' | 'key'
                              >
                            >;
                            outstanding_features?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Metafield,
                                'type' | 'id' | 'value' | 'namespace' | 'key'
                              >
                            >;
                            okendoStarRatingSnippet?: StorefrontAPI.Maybe<
                              Pick<StorefrontAPI.Metafield, 'value'>
                            >;
                          }
                        >;
                      };
                      sectionGridProductsAndFilterProductsDefaultFilter: {
                        filters: Array<
                          Pick<
                            StorefrontAPI.Filter,
                            'id' | 'label' | 'type'
                          > & {
                            values: Array<
                              Pick<
                                StorefrontAPI.FilterValue,
                                'id' | 'label' | 'count' | 'input'
                              >
                            >;
                          }
                        >;
                      };
                      sectionGridProductsAndFilterProducts: {
                        filters: Array<
                          Pick<
                            StorefrontAPI.Filter,
                            'id' | 'label' | 'type'
                          > & {
                            values: Array<
                              Pick<
                                StorefrontAPI.FilterValue,
                                'id' | 'label' | 'count' | 'input'
                              >
                            >;
                          }
                        >;
                        nodes: Array<
                          Pick<
                            StorefrontAPI.Product,
                            | 'id'
                            | 'title'
                            | 'handle'
                            | 'publishedAt'
                            | 'availableForSale'
                            | 'vendor'
                          > & {
                            options: Array<
                              Pick<
                                StorefrontAPI.ProductOption,
                                'name' | 'values'
                              >
                            >;
                            featuredImage?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Image,
                                'url' | 'altText' | 'width' | 'height'
                              >
                            >;
                            images: {
                              edges: Array<{
                                node: Pick<
                                  StorefrontAPI.Image,
                                  'url' | 'altText' | 'width' | 'height'
                                >;
                              }>;
                            };
                            variants: {
                              nodes: Array<
                                Pick<
                                  StorefrontAPI.ProductVariant,
                                  'id' | 'title' | 'availableForSale'
                                > & {
                                  price: Pick<
                                    StorefrontAPI.MoneyV2,
                                    'amount' | 'currencyCode'
                                  >;
                                  image?: StorefrontAPI.Maybe<
                                    Pick<
                                      StorefrontAPI.Image,
                                      'url' | 'altText' | 'width' | 'height'
                                    >
                                  >;
                                  selectedOptions: Array<
                                    Pick<
                                      StorefrontAPI.SelectedOption,
                                      'name' | 'value'
                                    >
                                  >;
                                  product: Pick<
                                    StorefrontAPI.Product,
                                    'title' | 'handle'
                                  >;
                                }
                              >;
                            };
                            priceRange: {
                              minVariantPrice: Pick<
                                StorefrontAPI.MoneyV2,
                                'amount' | 'currencyCode'
                              >;
                            };
                            compareAtPriceRange: {
                              minVariantPrice: Pick<
                                StorefrontAPI.MoneyV2,
                                'amount' | 'currencyCode'
                              >;
                            };
                            reviews_rating_count?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Metafield,
                                'type' | 'id' | 'value' | 'namespace' | 'key'
                              >
                            >;
                            reviews_rating?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Metafield,
                                'type' | 'id' | 'value' | 'namespace' | 'key'
                              >
                            >;
                            outstanding_features?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Metafield,
                                'type' | 'id' | 'value' | 'namespace' | 'key'
                              >
                            >;
                            okendoStarRatingSnippet?: StorefrontAPI.Maybe<
                              Pick<StorefrontAPI.Metafield, 'value'>
                            >;
                          }
                        >;
                        pageInfo: Pick<
                          StorefrontAPI.PageInfo,
                          | 'hasPreviousPage'
                          | 'hasNextPage'
                          | 'endCursor'
                          | 'startCursor'
                        >;
                      };
                    }
                  >;
                }
              >;
              title?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
              >;
              headings?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
              >;
              labels?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
              >;
              contents?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
              >;
              icons?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.MetaobjectField,
                  'key' | 'type' | 'value'
                > & {
                  references?: StorefrontAPI.Maybe<{
                    nodes: Array<{
                      image?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'altText' | 'url' | 'width' | 'height'
                        >
                      >;
                    }>;
                  }>;
                }
              >;
              heading?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
              >;
              content?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
              >;
              hide_logo?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
              >;
              background_color?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
              >;
              button_1?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<{
                  href?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  target?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  text?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  icon_svg?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                }>;
              }>;
              button_2?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<{
                  href?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  target?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  text?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  icon_svg?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                }>;
              }>;
              image?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'key'> & {
                  reference?: StorefrontAPI.Maybe<{
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'altText' | 'url' | 'width' | 'height'
                      >
                    >;
                  }>;
                }
              >;
              features?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'key' | 'type' | 'value'>
              >;
              show_subscribers_input?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
              >;
              card_style?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
              >;
              number_collections_to_show?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
              >;
              collection_groups?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<
                    Pick<StorefrontAPI.Metaobject, 'type' | 'id' | 'handle'> & {
                      title?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.MetaobjectField,
                          'type' | 'key' | 'value'
                        >
                      >;
                      name?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.MetaobjectField,
                          'type' | 'key' | 'value'
                        >
                      >;
                      icon_svg?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.MetaobjectField,
                          'type' | 'key' | 'value'
                        >
                      >;
                      collections?: StorefrontAPI.Maybe<{
                        references?: StorefrontAPI.Maybe<{
                          nodes: Array<
                            Pick<
                              StorefrontAPI.Collection,
                              | 'id'
                              | 'title'
                              | 'updatedAt'
                              | 'description'
                              | 'handle'
                            > & {
                              products: {
                                filters: Array<{
                                  values: Array<
                                    Pick<
                                      StorefrontAPI.FilterValue,
                                      'input' | 'count' | 'label'
                                    >
                                  >;
                                }>;
                              };
                              image?: StorefrontAPI.Maybe<
                                Pick<
                                  StorefrontAPI.Image,
                                  'altText' | 'width' | 'height' | 'url'
                                >
                              >;
                              horizontal_image?: StorefrontAPI.Maybe<{
                                reference?: StorefrontAPI.Maybe<
                                  Pick<StorefrontAPI.MediaImage, 'id'> & {
                                    image?: StorefrontAPI.Maybe<
                                      Pick<
                                        StorefrontAPI.Image,
                                        'altText' | 'height' | 'width' | 'url'
                                      >
                                    >;
                                  }
                                >;
                              }>;
                              seo: Pick<
                                StorefrontAPI.Seo,
                                'description' | 'title'
                              >;
                            }
                          >;
                        }>;
                      }>;
                    }
                  >;
                }>;
              }>;
              button_view_all?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<{
                  href?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  target?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  text?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  icon_svg?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                }>;
              }>;
              number_of_items?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
              >;
              blog_slug?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
              >;
              clients_say?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<
                    Pick<StorefrontAPI.Metaobject, 'type' | 'id' | 'handle'> & {
                      title?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.MetaobjectField,
                          'type' | 'key' | 'value'
                        >
                      >;
                      name?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.MetaobjectField,
                          'type' | 'key' | 'value'
                        >
                      >;
                      stars?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.MetaobjectField,
                          'type' | 'key' | 'value'
                        >
                      >;
                      content?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.MetaobjectField,
                          'type' | 'key' | 'value'
                        >
                      >;
                      image?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'type' | 'key'> & {
                          reference?: StorefrontAPI.Maybe<{
                            image?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Image,
                                'altText' | 'url' | 'width' | 'height'
                              >
                            >;
                          }>;
                        }
                      >;
                    }
                  >;
                }>;
              }>;
            }
          >;
        }>;
      }>;
    }
  >;
};

export type ClientSayFragment = Pick<
  StorefrontAPI.Metaobject,
  'type' | 'id' | 'handle'
> & {
  title?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
  >;
  name?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
  >;
  stars?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
  >;
  content?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
  >;
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'type' | 'key'> & {
      reference?: StorefrontAPI.Maybe<{
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'altText' | 'url' | 'width' | 'height'>
        >;
      }>;
    }
  >;
};

export type SectionClientsSayFragment = Pick<
  StorefrontAPI.Metaobject,
  'type'
> & {
  heading?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
  >;
  sub_heading?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
  >;
  clients_say?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<
        Pick<StorefrontAPI.Metaobject, 'type' | 'id' | 'handle'> & {
          title?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
          >;
          name?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
          >;
          stars?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
          >;
          content?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
          >;
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'type' | 'key'> & {
              reference?: StorefrontAPI.Maybe<{
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'altText' | 'url' | 'width' | 'height'
                  >
                >;
              }>;
            }
          >;
        }
      >;
    }>;
  }>;
};

export type SectionCollectionsSliderFragment = Pick<
  StorefrontAPI.Metaobject,
  'type' | 'id'
> & {
  heading_bold?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
  >;
  heading_light?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
  >;
  sub_heading?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
  >;
  button_text?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
  >;
  collections?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<
        Pick<
          StorefrontAPI.Collection,
          'id' | 'title' | 'updatedAt' | 'description' | 'handle'
        > & {
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'altText' | 'width' | 'height' | 'url'>
          >;
          horizontal_image?: StorefrontAPI.Maybe<{
            reference?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MediaImage, 'id'> & {
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'altText' | 'height' | 'width' | 'url'
                  >
                >;
              }
            >;
          }>;
          seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
        }
      >;
    }>;
  }>;
};

export type SectionGridProductsAndFilterFragment = Pick<
  StorefrontAPI.Metaobject,
  'type'
> & {
  heading?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
  >;
  sub_heading?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
  >;
  collection?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'type' | 'key'> & {
      reference?: StorefrontAPI.Maybe<
        Pick<
          StorefrontAPI.Collection,
          'id' | 'handle' | 'title' | 'description'
        > & {
          sectionGridProductsAndFilterProductsDefaultFilter: {
            filters: Array<
              Pick<StorefrontAPI.Filter, 'id' | 'label' | 'type'> & {
                values: Array<
                  Pick<
                    StorefrontAPI.FilterValue,
                    'id' | 'label' | 'count' | 'input'
                  >
                >;
              }
            >;
          };
          sectionGridProductsAndFilterProducts: {
            filters: Array<
              Pick<StorefrontAPI.Filter, 'id' | 'label' | 'type'> & {
                values: Array<
                  Pick<
                    StorefrontAPI.FilterValue,
                    'id' | 'label' | 'count' | 'input'
                  >
                >;
              }
            >;
            nodes: Array<
              Pick<
                StorefrontAPI.Product,
                | 'id'
                | 'title'
                | 'handle'
                | 'publishedAt'
                | 'availableForSale'
                | 'vendor'
              > & {
                options: Array<
                  Pick<StorefrontAPI.ProductOption, 'name' | 'values'>
                >;
                featuredImage?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'url' | 'altText' | 'width' | 'height'
                  >
                >;
                images: {
                  edges: Array<{
                    node: Pick<
                      StorefrontAPI.Image,
                      'url' | 'altText' | 'width' | 'height'
                    >;
                  }>;
                };
                variants: {
                  nodes: Array<
                    Pick<
                      StorefrontAPI.ProductVariant,
                      'id' | 'title' | 'availableForSale'
                    > & {
                      price: Pick<
                        StorefrontAPI.MoneyV2,
                        'amount' | 'currencyCode'
                      >;
                      image?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'url' | 'altText' | 'width' | 'height'
                        >
                      >;
                      selectedOptions: Array<
                        Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                      >;
                      product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
                    }
                  >;
                };
                priceRange: {
                  minVariantPrice: Pick<
                    StorefrontAPI.MoneyV2,
                    'amount' | 'currencyCode'
                  >;
                };
                compareAtPriceRange: {
                  minVariantPrice: Pick<
                    StorefrontAPI.MoneyV2,
                    'amount' | 'currencyCode'
                  >;
                };
                reviews_rating_count?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Metafield,
                    'type' | 'id' | 'value' | 'namespace' | 'key'
                  >
                >;
                reviews_rating?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Metafield,
                    'type' | 'id' | 'value' | 'namespace' | 'key'
                  >
                >;
                outstanding_features?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Metafield,
                    'type' | 'id' | 'value' | 'namespace' | 'key'
                  >
                >;
                okendoStarRatingSnippet?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Metafield, 'value'>
                >;
              }
            >;
            pageInfo: Pick<
              StorefrontAPI.PageInfo,
              'hasPreviousPage' | 'hasNextPage' | 'endCursor' | 'startCursor'
            >;
          };
        }
      >;
    }
  >;
};

export type SectionHeroFragment = Pick<StorefrontAPI.Metaobject, 'type'> & {
  hero_item?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Metaobject, 'type'> & {
        heading?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        sub_heading?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        cta_button?: StorefrontAPI.Maybe<{
          reference?: StorefrontAPI.Maybe<{
            href?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            target?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            text?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            icon_svg?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
          }>;
        }>;
        vertical_image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'key'> & {
            reference?: StorefrontAPI.Maybe<{
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'altText' | 'url' | 'width' | 'height'
                >
              >;
            }>;
          }
        >;
        horizontal_image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'key'> & {
            reference?: StorefrontAPI.Maybe<{
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'altText' | 'url' | 'width' | 'height'
                >
              >;
            }>;
          }
        >;
      }
    >;
  }>;
};

export type HeroItemFragment = Pick<StorefrontAPI.Metaobject, 'type'> & {
  heading?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  sub_heading?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  cta_button?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      href?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
      target?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
      text?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
      icon_svg?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
    }>;
  }>;
  vertical_image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key'> & {
      reference?: StorefrontAPI.Maybe<{
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'altText' | 'url' | 'width' | 'height'>
        >;
      }>;
    }
  >;
  horizontal_image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key'> & {
      reference?: StorefrontAPI.Maybe<{
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'altText' | 'url' | 'width' | 'height'>
        >;
      }>;
    }
  >;
};

export type SectionHeroSliderFragment = Pick<
  StorefrontAPI.Metaobject,
  'type'
> & {
  hero_items?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<
        Pick<StorefrontAPI.Metaobject, 'type'> & {
          heading?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          sub_heading?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          cta_button?: StorefrontAPI.Maybe<{
            reference?: StorefrontAPI.Maybe<{
              href?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              target?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              text?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              icon_svg?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
            }>;
          }>;
          vertical_image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'key'> & {
              reference?: StorefrontAPI.Maybe<{
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'altText' | 'url' | 'width' | 'height'
                  >
                >;
              }>;
            }
          >;
          horizontal_image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'key'> & {
              reference?: StorefrontAPI.Maybe<{
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'altText' | 'url' | 'width' | 'height'
                  >
                >;
              }>;
            }
          >;
        }
      >;
    }>;
  }>;
};

export type SectionImageWithTextFragment = Pick<
  StorefrontAPI.Metaobject,
  'type'
> & {
  title?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
  >;
  heading?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
  >;
  content?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
  >;
  hide_logo?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
  >;
  background_color?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
  >;
  button_1?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      href?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
      target?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
      text?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
      icon_svg?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
    }>;
  }>;
  button_2?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      href?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
      target?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
      text?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
      icon_svg?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
    }>;
  }>;
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key'> & {
      reference?: StorefrontAPI.Maybe<{
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'altText' | 'url' | 'width' | 'height'>
        >;
      }>;
    }
  >;
  features?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key' | 'type' | 'value'>
  >;
  show_subscribers_input?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
  >;
  style?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
  >;
};

export type SectionLatestBlogFragment = Pick<
  StorefrontAPI.Metaobject,
  'type'
> & {
  heading?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
  >;
  heading_bold?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
  >;
  heading_light?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
  >;
  background_color?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
  >;
  button_view_all?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      href?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
      target?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
      text?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
      icon_svg?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
    }>;
  }>;
  number_of_items?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
  >;
  blog_slug?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
  >;
};

export type SectionProductsSliderFragment = Pick<
  StorefrontAPI.Metaobject,
  'type'
> & {
  heading_bold?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
  >;
  heading_light?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
  >;
  sub_heading?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
  >;
  body?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
  >;
  style?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
  >;
  collection?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'type' | 'key'> & {
      reference?: StorefrontAPI.Maybe<
        Pick<
          StorefrontAPI.Collection,
          'id' | 'handle' | 'title' | 'description'
        > & {
          products: {
            nodes: Array<
              Pick<
                StorefrontAPI.Product,
                | 'id'
                | 'title'
                | 'handle'
                | 'publishedAt'
                | 'availableForSale'
                | 'vendor'
              > & {
                options: Array<
                  Pick<StorefrontAPI.ProductOption, 'name' | 'values'>
                >;
                featuredImage?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'url' | 'altText' | 'width' | 'height'
                  >
                >;
                images: {
                  edges: Array<{
                    node: Pick<
                      StorefrontAPI.Image,
                      'url' | 'altText' | 'width' | 'height'
                    >;
                  }>;
                };
                variants: {
                  nodes: Array<
                    Pick<
                      StorefrontAPI.ProductVariant,
                      'id' | 'title' | 'availableForSale'
                    > & {
                      price: Pick<
                        StorefrontAPI.MoneyV2,
                        'amount' | 'currencyCode'
                      >;
                      image?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'url' | 'altText' | 'width' | 'height'
                        >
                      >;
                      selectedOptions: Array<
                        Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                      >;
                      product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
                    }
                  >;
                };
                priceRange: {
                  minVariantPrice: Pick<
                    StorefrontAPI.MoneyV2,
                    'amount' | 'currencyCode'
                  >;
                };
                compareAtPriceRange: {
                  minVariantPrice: Pick<
                    StorefrontAPI.MoneyV2,
                    'amount' | 'currencyCode'
                  >;
                };
                reviews_rating_count?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Metafield,
                    'type' | 'id' | 'value' | 'namespace' | 'key'
                  >
                >;
                reviews_rating?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Metafield,
                    'type' | 'id' | 'value' | 'namespace' | 'key'
                  >
                >;
                outstanding_features?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Metafield,
                    'type' | 'id' | 'value' | 'namespace' | 'key'
                  >
                >;
                okendoStarRatingSnippet?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Metafield, 'value'>
                >;
              }
            >;
          };
        }
      >;
    }
  >;
};

export type SectionStepsFragment = Pick<StorefrontAPI.Metaobject, 'type'> & {
  title?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
  >;
  headings?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
  >;
  labels?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
  >;
  contents?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
  >;
  icons?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key' | 'type' | 'value'> & {
      references?: StorefrontAPI.Maybe<{
        nodes: Array<{
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'altText' | 'url' | 'width' | 'height'>
          >;
        }>;
      }>;
    }
  >;
  style?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
  >;
};

export type CollectionOnGroupItemFragment = Pick<
  StorefrontAPI.Collection,
  'id' | 'title' | 'updatedAt' | 'description' | 'handle'
> & {
  products: {
    filters: Array<{
      values: Array<
        Pick<StorefrontAPI.FilterValue, 'input' | 'count' | 'label'>
      >;
    }>;
  };
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'altText' | 'width' | 'height' | 'url'>
  >;
  horizontal_image?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MediaImage, 'id'> & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'altText' | 'height' | 'width' | 'url'>
        >;
      }
    >;
  }>;
  seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
};

export type CollectionGroupItemFragment = Pick<
  StorefrontAPI.Metaobject,
  'type' | 'id' | 'handle'
> & {
  title?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
  >;
  name?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
  >;
  icon_svg?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
  >;
  collections?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<
        Pick<
          StorefrontAPI.Collection,
          'id' | 'title' | 'updatedAt' | 'description' | 'handle'
        > & {
          products: {
            filters: Array<{
              values: Array<
                Pick<StorefrontAPI.FilterValue, 'input' | 'count' | 'label'>
              >;
            }>;
          };
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'altText' | 'width' | 'height' | 'url'>
          >;
          horizontal_image?: StorefrontAPI.Maybe<{
            reference?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MediaImage, 'id'> & {
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'altText' | 'height' | 'width' | 'url'
                  >
                >;
              }
            >;
          }>;
          seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
        }
      >;
    }>;
  }>;
};

export type SectionTabsCollectionsByGroupFragment = Pick<
  StorefrontAPI.Metaobject,
  'type'
> & {
  heading?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
  >;
  card_style?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
  >;
  sub_heading?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
  >;
  number_collections_to_show?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
  >;
  background_color?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
  >;
  collection_groups?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<
        Pick<StorefrontAPI.Metaobject, 'type' | 'id' | 'handle'> & {
          title?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
          >;
          name?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
          >;
          icon_svg?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
          >;
          collections?: StorefrontAPI.Maybe<{
            references?: StorefrontAPI.Maybe<{
              nodes: Array<
                Pick<
                  StorefrontAPI.Collection,
                  'id' | 'title' | 'updatedAt' | 'description' | 'handle'
                > & {
                  products: {
                    filters: Array<{
                      values: Array<
                        Pick<
                          StorefrontAPI.FilterValue,
                          'input' | 'count' | 'label'
                        >
                      >;
                    }>;
                  };
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'altText' | 'width' | 'height' | 'url'
                    >
                  >;
                  horizontal_image?: StorefrontAPI.Maybe<{
                    reference?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MediaImage, 'id'> & {
                        image?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'altText' | 'height' | 'width' | 'url'
                          >
                        >;
                      }
                    >;
                  }>;
                  seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
                }
              >;
            }>;
          }>;
        }
      >;
    }>;
  }>;
};

export type SectionsFragment = {
  references?: StorefrontAPI.Maybe<{
    nodes: Array<
      Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
        hero_item?: StorefrontAPI.Maybe<{
          reference?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metaobject, 'type'> & {
              heading?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              sub_heading?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              cta_button?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<{
                  href?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  target?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  text?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  icon_svg?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                }>;
              }>;
              vertical_image?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'key'> & {
                  reference?: StorefrontAPI.Maybe<{
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'altText' | 'url' | 'width' | 'height'
                      >
                    >;
                  }>;
                }
              >;
              horizontal_image?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'key'> & {
                  reference?: StorefrontAPI.Maybe<{
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'altText' | 'url' | 'width' | 'height'
                      >
                    >;
                  }>;
                }
              >;
            }
          >;
        }>;
        hero_items?: StorefrontAPI.Maybe<{
          references?: StorefrontAPI.Maybe<{
            nodes: Array<
              Pick<StorefrontAPI.Metaobject, 'type'> & {
                heading?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'value'>
                >;
                sub_heading?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'value'>
                >;
                cta_button?: StorefrontAPI.Maybe<{
                  reference?: StorefrontAPI.Maybe<{
                    href?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    target?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    text?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    icon_svg?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                  }>;
                }>;
                vertical_image?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'key'> & {
                    reference?: StorefrontAPI.Maybe<{
                      image?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'altText' | 'url' | 'width' | 'height'
                        >
                      >;
                    }>;
                  }
                >;
                horizontal_image?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'key'> & {
                    reference?: StorefrontAPI.Maybe<{
                      image?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'altText' | 'url' | 'width' | 'height'
                        >
                      >;
                    }>;
                  }
                >;
              }
            >;
          }>;
        }>;
        heading_bold?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
        >;
        heading_light?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
        >;
        sub_heading?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
        >;
        button_text?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
        >;
        collections?: StorefrontAPI.Maybe<{
          references?: StorefrontAPI.Maybe<{
            nodes: Array<
              Pick<
                StorefrontAPI.Collection,
                'id' | 'title' | 'updatedAt' | 'description' | 'handle'
              > & {
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'altText' | 'width' | 'height' | 'url'
                  >
                >;
                horizontal_image?: StorefrontAPI.Maybe<{
                  reference?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MediaImage, 'id'> & {
                      image?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'altText' | 'height' | 'width' | 'url'
                        >
                      >;
                    }
                  >;
                }>;
                seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
              }
            >;
          }>;
        }>;
        body?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
        >;
        style?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
        >;
        collection?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'type' | 'key'> & {
            reference?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Collection,
                'id' | 'handle' | 'title' | 'description'
              > & {
                products: {
                  nodes: Array<
                    Pick<
                      StorefrontAPI.Product,
                      | 'id'
                      | 'title'
                      | 'handle'
                      | 'publishedAt'
                      | 'availableForSale'
                      | 'vendor'
                    > & {
                      options: Array<
                        Pick<StorefrontAPI.ProductOption, 'name' | 'values'>
                      >;
                      featuredImage?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'url' | 'altText' | 'width' | 'height'
                        >
                      >;
                      images: {
                        edges: Array<{
                          node: Pick<
                            StorefrontAPI.Image,
                            'url' | 'altText' | 'width' | 'height'
                          >;
                        }>;
                      };
                      variants: {
                        nodes: Array<
                          Pick<
                            StorefrontAPI.ProductVariant,
                            'id' | 'title' | 'availableForSale'
                          > & {
                            price: Pick<
                              StorefrontAPI.MoneyV2,
                              'amount' | 'currencyCode'
                            >;
                            image?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Image,
                                'url' | 'altText' | 'width' | 'height'
                              >
                            >;
                            selectedOptions: Array<
                              Pick<
                                StorefrontAPI.SelectedOption,
                                'name' | 'value'
                              >
                            >;
                            product: Pick<
                              StorefrontAPI.Product,
                              'title' | 'handle'
                            >;
                          }
                        >;
                      };
                      priceRange: {
                        minVariantPrice: Pick<
                          StorefrontAPI.MoneyV2,
                          'amount' | 'currencyCode'
                        >;
                      };
                      compareAtPriceRange: {
                        minVariantPrice: Pick<
                          StorefrontAPI.MoneyV2,
                          'amount' | 'currencyCode'
                        >;
                      };
                      reviews_rating_count?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Metafield,
                          'type' | 'id' | 'value' | 'namespace' | 'key'
                        >
                      >;
                      reviews_rating?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Metafield,
                          'type' | 'id' | 'value' | 'namespace' | 'key'
                        >
                      >;
                      outstanding_features?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Metafield,
                          'type' | 'id' | 'value' | 'namespace' | 'key'
                        >
                      >;
                      okendoStarRatingSnippet?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.Metafield, 'value'>
                      >;
                    }
                  >;
                };
                sectionGridProductsAndFilterProductsDefaultFilter: {
                  filters: Array<
                    Pick<StorefrontAPI.Filter, 'id' | 'label' | 'type'> & {
                      values: Array<
                        Pick<
                          StorefrontAPI.FilterValue,
                          'id' | 'label' | 'count' | 'input'
                        >
                      >;
                    }
                  >;
                };
                sectionGridProductsAndFilterProducts: {
                  filters: Array<
                    Pick<StorefrontAPI.Filter, 'id' | 'label' | 'type'> & {
                      values: Array<
                        Pick<
                          StorefrontAPI.FilterValue,
                          'id' | 'label' | 'count' | 'input'
                        >
                      >;
                    }
                  >;
                  nodes: Array<
                    Pick<
                      StorefrontAPI.Product,
                      | 'id'
                      | 'title'
                      | 'handle'
                      | 'publishedAt'
                      | 'availableForSale'
                      | 'vendor'
                    > & {
                      options: Array<
                        Pick<StorefrontAPI.ProductOption, 'name' | 'values'>
                      >;
                      featuredImage?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'url' | 'altText' | 'width' | 'height'
                        >
                      >;
                      images: {
                        edges: Array<{
                          node: Pick<
                            StorefrontAPI.Image,
                            'url' | 'altText' | 'width' | 'height'
                          >;
                        }>;
                      };
                      variants: {
                        nodes: Array<
                          Pick<
                            StorefrontAPI.ProductVariant,
                            'id' | 'title' | 'availableForSale'
                          > & {
                            price: Pick<
                              StorefrontAPI.MoneyV2,
                              'amount' | 'currencyCode'
                            >;
                            image?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Image,
                                'url' | 'altText' | 'width' | 'height'
                              >
                            >;
                            selectedOptions: Array<
                              Pick<
                                StorefrontAPI.SelectedOption,
                                'name' | 'value'
                              >
                            >;
                            product: Pick<
                              StorefrontAPI.Product,
                              'title' | 'handle'
                            >;
                          }
                        >;
                      };
                      priceRange: {
                        minVariantPrice: Pick<
                          StorefrontAPI.MoneyV2,
                          'amount' | 'currencyCode'
                        >;
                      };
                      compareAtPriceRange: {
                        minVariantPrice: Pick<
                          StorefrontAPI.MoneyV2,
                          'amount' | 'currencyCode'
                        >;
                      };
                      reviews_rating_count?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Metafield,
                          'type' | 'id' | 'value' | 'namespace' | 'key'
                        >
                      >;
                      reviews_rating?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Metafield,
                          'type' | 'id' | 'value' | 'namespace' | 'key'
                        >
                      >;
                      outstanding_features?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Metafield,
                          'type' | 'id' | 'value' | 'namespace' | 'key'
                        >
                      >;
                      okendoStarRatingSnippet?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.Metafield, 'value'>
                      >;
                    }
                  >;
                  pageInfo: Pick<
                    StorefrontAPI.PageInfo,
                    | 'hasPreviousPage'
                    | 'hasNextPage'
                    | 'endCursor'
                    | 'startCursor'
                  >;
                };
              }
            >;
          }
        >;
        title?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
        >;
        headings?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
        >;
        labels?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
        >;
        contents?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
        >;
        icons?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'key' | 'type' | 'value'> & {
            references?: StorefrontAPI.Maybe<{
              nodes: Array<{
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'altText' | 'url' | 'width' | 'height'
                  >
                >;
              }>;
            }>;
          }
        >;
        heading?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
        >;
        content?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
        >;
        hide_logo?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
        >;
        background_color?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
        >;
        button_1?: StorefrontAPI.Maybe<{
          reference?: StorefrontAPI.Maybe<{
            href?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            target?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            text?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            icon_svg?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
          }>;
        }>;
        button_2?: StorefrontAPI.Maybe<{
          reference?: StorefrontAPI.Maybe<{
            href?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            target?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            text?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            icon_svg?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
          }>;
        }>;
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'key'> & {
            reference?: StorefrontAPI.Maybe<{
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'altText' | 'url' | 'width' | 'height'
                >
              >;
            }>;
          }
        >;
        features?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'key' | 'type' | 'value'>
        >;
        show_subscribers_input?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
        >;
        card_style?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
        >;
        number_collections_to_show?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
        >;
        collection_groups?: StorefrontAPI.Maybe<{
          references?: StorefrontAPI.Maybe<{
            nodes: Array<
              Pick<StorefrontAPI.Metaobject, 'type' | 'id' | 'handle'> & {
                title?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
                >;
                name?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
                >;
                icon_svg?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
                >;
                collections?: StorefrontAPI.Maybe<{
                  references?: StorefrontAPI.Maybe<{
                    nodes: Array<
                      Pick<
                        StorefrontAPI.Collection,
                        'id' | 'title' | 'updatedAt' | 'description' | 'handle'
                      > & {
                        products: {
                          filters: Array<{
                            values: Array<
                              Pick<
                                StorefrontAPI.FilterValue,
                                'input' | 'count' | 'label'
                              >
                            >;
                          }>;
                        };
                        image?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'altText' | 'width' | 'height' | 'url'
                          >
                        >;
                        horizontal_image?: StorefrontAPI.Maybe<{
                          reference?: StorefrontAPI.Maybe<
                            Pick<StorefrontAPI.MediaImage, 'id'> & {
                              image?: StorefrontAPI.Maybe<
                                Pick<
                                  StorefrontAPI.Image,
                                  'altText' | 'height' | 'width' | 'url'
                                >
                              >;
                            }
                          >;
                        }>;
                        seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
                      }
                    >;
                  }>;
                }>;
              }
            >;
          }>;
        }>;
        button_view_all?: StorefrontAPI.Maybe<{
          reference?: StorefrontAPI.Maybe<{
            href?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            target?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            text?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            icon_svg?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
          }>;
        }>;
        number_of_items?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
        >;
        blog_slug?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'key' | 'value'>
        >;
        clients_say?: StorefrontAPI.Maybe<{
          references?: StorefrontAPI.Maybe<{
            nodes: Array<
              Pick<StorefrontAPI.Metaobject, 'type' | 'id' | 'handle'> & {
                title?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
                >;
                name?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
                >;
                stars?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
                >;
                content?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'type' | 'key' | 'value'>
                >;
                image?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'type' | 'key'> & {
                    reference?: StorefrontAPI.Maybe<{
                      image?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'altText' | 'url' | 'width' | 'height'
                        >
                      >;
                    }>;
                  }
                >;
              }
            >;
          }>;
        }>;
      }
    >;
  }>;
};

interface GeneratedQueryTypes {
  '#graphql\n  query layout(\n    $language: LanguageCode\n    $country: CountryCode\n  ) @inContext(language: $language, country: $country) {\n    shop {\n      ...Shop\n    }\n  }\n  fragment Shop on Shop {\n    id\n    name\n    description\n    primaryDomain {\n      url\n    }\n    brand {\n      logo {\n        image {\n          url\n          width\n          height\n        }\n      }\n      squareLogo {\n        image {\n          altText\n          height\n          width\n          url\n        }\n      }\n    }\n  }\n': {
    return: LayoutQuery;
    variables: LayoutQueryVariables;
  };
  '#graphql\n  query FooterMenu(\n    $language: LanguageCode\n    $country: CountryCode\n    $footerMenuHandle: String!\n  ) @inContext(language: $language, country: $country) {\n    footerMenu: menu(handle: $footerMenuHandle) {\n      ...Menu\n    }\n  }\n  #graphql\n  fragment MenuItem on MenuItem {\n    id\n    resourceId\n    tags\n    title\n    type\n    url\n  }\n  fragment ChildMenuItem on MenuItem {\n    ...MenuItem\n  }\n  fragment ParentMenuItem on MenuItem {\n    ...MenuItem\n    items {\n      ...ChildMenuItem\n    }\n  }\n  fragment Menu on Menu {\n    id\n    title\n    items {\n      ...ParentMenuItem\n    }\n  }\n\n': {
    return: FooterMenuQuery;
    variables: FooterMenuQueryVariables;
  };
  '#graphql\n  query HeaderMenu(\n    $language: LanguageCode\n    $country: CountryCode\n    $headerMenuHandle: String!\n    $featuredCollectionsFirst: Int!\n    $socialsFirst: Int!\n  ) @inContext(language: $language, country: $country) {\n    headerMenu: menu(handle: $headerMenuHandle) {\n      ...Menu\n    }\n    featuredCollections: collections(first: $featuredCollectionsFirst, sortKey: UPDATED_AT) {\n      nodes {\n        ...CommonCollectionItem\n      }\n    }\n    socials: metaobjects(type: "ciseco--social", first: $socialsFirst) {\n      edges {\n        node {\n          type\n          id\n          handle\n          title: field(key: "title") {\n            type\n            key\n            value\n          }\n          description: field(key: "description") {\n            type\n            key\n            value\n          }\n          icon: field(key: "icon") {\n            type\n            key\n            reference {\n              ... on MediaImage {\n                image {\n                  altText\n                  url\n                  width\n                  height\n                }\n              }\n            }\n          }\n          link: field(key: "link") {\n            type\n            key\n            value\n          }\n        }\n      }\n    }\n  }\n  #graphql\n  fragment MenuItem on MenuItem {\n    id\n    resourceId\n    tags\n    title\n    type\n    url\n  }\n  fragment ChildMenuItem on MenuItem {\n    ...MenuItem\n  }\n  fragment ParentMenuItem on MenuItem {\n    ...MenuItem\n    items {\n      ...ChildMenuItem\n    }\n  }\n  fragment Menu on Menu {\n    id\n    title\n    items {\n      ...ParentMenuItem\n    }\n  }\n\n  #graphql\n  fragment CommonCollectionItem on Collection {\n    id\n    title\n    updatedAt\n    description\n    handle\n    image {\n      altText\n      width\n      height\n      url\n    }\n    horizontal_image: metafield(key: "horizontal_image", namespace: "ciseco--collection") {\n      reference {\n        ... on MediaImage {\n          id\n          image {\n            altText\n            height\n            width\n            url\n          }\n        }\n      }\n    }\n    seo {\n      description\n      title\n    }\n  }\n\n': {
    return: HeaderMenuQuery;
    variables: HeaderMenuQueryVariables;
  };
  '#graphql\n      query getShopPrimaryDomain { shop { primaryDomain { url } } }\n    ': {
    return: GetShopPrimaryDomainQuery;
    variables: GetShopPrimaryDomainQueryVariables;
  };
  '#graphql\n  query seoCollectionContent($country: CountryCode, $language: LanguageCode)\n  @inContext(country: $country, language: $language) {\n    shop {\n      name\n      description\n    }\n  }\n': {
    return: SeoCollectionContentQuery;
    variables: SeoCollectionContentQueryVariables;
  };
  '#graphql\n  query ApiAllProducts(\n    $query: String\n    $count: Int\n    $reverse: Boolean\n    $country: CountryCode\n    $language: LanguageCode\n    $sortKey: ProductSortKeys\n  ) @inContext(country: $country, language: $language) {\n    products(first: $count, sortKey: $sortKey, reverse: $reverse, query: $query) {\n      nodes {\n        ...CommonProductCard\n      }\n    }\n  }\n  #graphql\n  fragment CommonProductCardVariant on ProductVariant {\n    id\n    title\n    availableForSale\n    price {\n      amount\n      currencyCode\n    }\n    image {\n      url\n      altText\n      width\n      height\n    }\n    selectedOptions {\n      name\n      value\n    }\n    product {\n      title\n      handle\n    }\n  }\n\n  fragment CommonProductCard on Product {\n    id\n    title\n    handle\n    publishedAt\n    availableForSale\n    vendor\n    options {\n      name\n      values\n    }\n    featuredImage {\n      url\n      altText\n      width\n      height\n    }\n    # Need to 4 images, so we can display the productCardLarge component correctly, which requires 4 images\n    images(first: 4) {\n      edges {\n        node {\n          url\n          altText\n          width\n          height\n        }\n      }\n    }\n    variants(first: 1) {\n      nodes {\n        ...CommonProductCardVariant\n      }\n    }\n    priceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    compareAtPriceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    reviews_rating_count: metafield(namespace: "reviews", key:"rating_count") {\n      type\n      id\n      value\n      namespace\n      key\n    }\n    reviews_rating: metafield(namespace: "reviews", key:"rating") {\n      type\n      id\n      value\n      namespace\n      key\n    }\n    outstanding_features: metafield(namespace: "ciseco--product", key:"outstanding_features") {\n      type\n      id\n      value\n      namespace\n      key\n    }\n    okendoStarRatingSnippet: metafield(\n\t\t\tnamespace: "okendo"\n\t\t\tkey: "StarRatingSnippet"\n\t\t) {\n\t\t\tvalue\n\t\t}\n  } \n\n': {
    return: ApiAllProductsQuery;
    variables: ApiAllProductsQueryVariables;
  };
  '#graphql\n  query CollectionDetails(\n    $handle: String!\n    $country: CountryCode\n    $language: LanguageCode\n    $filters: [ProductFilter!]\n    $sortKey: ProductCollectionSortKeys!\n    $reverse: Boolean\n    $first: Int\n    $last: Int\n    $startCursor: String\n    $endCursor: String\n  ) @inContext(country: $country, language: $language) {\n    collection(handle: $handle) {\n      id\n      handle\n      title\n      description\n      seo {\n        description\n        title\n      }\n      image {\n        id\n        url\n        width\n        height\n        altText\n      }\n      productsWithDefaultFilter:products(\n        first: 0,\n        filters: {},\n      ) {\n        filters {\n          id\n          label\n          type\n          values {\n            id\n            label\n            count\n            input\n          }\n        }\n      }\n      products(\n        first: $first,\n        last: $last,\n        before: $startCursor,\n        after: $endCursor,\n        filters: $filters,\n        sortKey: $sortKey,\n        reverse: $reverse\n      ) {\n        filters {\n          id\n          label\n          type\n          values {\n            id\n            label\n            count\n            input\n          }\n        }\n        nodes {\n          ...CommonProductCard\n        }\n        pageInfo {\n          hasPreviousPage\n          hasNextPage\n          endCursor\n          startCursor\n        }\n      }\n    }\n  }\n   # All common fragments\n   #graphql\n  fragment CommonProductCardVariant on ProductVariant {\n    id\n    title\n    availableForSale\n    price {\n      amount\n      currencyCode\n    }\n    image {\n      url\n      altText\n      width\n      height\n    }\n    selectedOptions {\n      name\n      value\n    }\n    product {\n      title\n      handle\n    }\n  }\n\n  fragment CommonProductCard on Product {\n    id\n    title\n    handle\n    publishedAt\n    availableForSale\n    vendor\n    options {\n      name\n      values\n    }\n    featuredImage {\n      url\n      altText\n      width\n      height\n    }\n    # Need to 4 images, so we can display the productCardLarge component correctly, which requires 4 images\n    images(first: 4) {\n      edges {\n        node {\n          url\n          altText\n          width\n          height\n        }\n      }\n    }\n    variants(first: 1) {\n      nodes {\n        ...CommonProductCardVariant\n      }\n    }\n    priceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    compareAtPriceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    reviews_rating_count: metafield(namespace: "reviews", key:"rating_count") {\n      type\n      id\n      value\n      namespace\n      key\n    }\n    reviews_rating: metafield(namespace: "reviews", key:"rating") {\n      type\n      id\n      value\n      namespace\n      key\n    }\n    outstanding_features: metafield(namespace: "ciseco--product", key:"outstanding_features") {\n      type\n      id\n      value\n      namespace\n      key\n    }\n    okendoStarRatingSnippet: metafield(\n\t\t\tnamespace: "okendo"\n\t\t\tkey: "StarRatingSnippet"\n\t\t) {\n\t\t\tvalue\n\t\t}\n  } \n\n': {
    return: CollectionDetailsQuery;
    variables: CollectionDetailsQueryVariables;
  };
  '#graphql\n  query Collections(\n    $country: CountryCode\n    $language: LanguageCode\n    $first: Int\n    $last: Int\n    $startCursor: String\n    $endCursor: String\n  ) @inContext(country: $country, language: $language) {\n    collections(first: $first, last: $last, before: $startCursor, after: $endCursor) {\n      nodes {\n        ...CommonCollectionItem\n        products(first: 0) {\n          filters {\n            values {\n              input\n              count\n              label\n            }\n          }\n        }\n      }\n      pageInfo {\n        hasPreviousPage\n        hasNextPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n  #graphql\n  fragment CommonCollectionItem on Collection {\n    id\n    title\n    updatedAt\n    description\n    handle\n    image {\n      altText\n      width\n      height\n      url\n    }\n    horizontal_image: metafield(key: "horizontal_image", namespace: "ciseco--collection") {\n      reference {\n        ... on MediaImage {\n          id\n          image {\n            altText\n            height\n            width\n            url\n          }\n        }\n      }\n    }\n    seo {\n      description\n      title\n    }\n  }\n\n': {
    return: CollectionsQuery;
    variables: CollectionsQueryVariables;
  };
  '#graphql\n  query FeaturedItems(\n    $country: CountryCode\n    $language: LanguageCode\n    $pageBy: Int = 12\n  ) @inContext(country: $country, language: $language) {\n    featuredCollections: collections(first: 3, sortKey: UPDATED_AT) {\n      nodes {\n        ...CommonCollectionItem\n      }\n    }\n    featuredProducts: products(first: $pageBy) {\n      nodes {\n        ...CommonProductCard\n      }\n    }\n  }\n\n  #graphql\n  fragment CommonProductCardVariant on ProductVariant {\n    id\n    title\n    availableForSale\n    price {\n      amount\n      currencyCode\n    }\n    image {\n      url\n      altText\n      width\n      height\n    }\n    selectedOptions {\n      name\n      value\n    }\n    product {\n      title\n      handle\n    }\n  }\n\n  fragment CommonProductCard on Product {\n    id\n    title\n    handle\n    publishedAt\n    availableForSale\n    vendor\n    options {\n      name\n      values\n    }\n    featuredImage {\n      url\n      altText\n      width\n      height\n    }\n    # Need to 4 images, so we can display the productCardLarge component correctly, which requires 4 images\n    images(first: 4) {\n      edges {\n        node {\n          url\n          altText\n          width\n          height\n        }\n      }\n    }\n    variants(first: 1) {\n      nodes {\n        ...CommonProductCardVariant\n      }\n    }\n    priceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    compareAtPriceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    reviews_rating_count: metafield(namespace: "reviews", key:"rating_count") {\n      type\n      id\n      value\n      namespace\n      key\n    }\n    reviews_rating: metafield(namespace: "reviews", key:"rating") {\n      type\n      id\n      value\n      namespace\n      key\n    }\n    outstanding_features: metafield(namespace: "ciseco--product", key:"outstanding_features") {\n      type\n      id\n      value\n      namespace\n      key\n    }\n    okendoStarRatingSnippet: metafield(\n\t\t\tnamespace: "okendo"\n\t\t\tkey: "StarRatingSnippet"\n\t\t) {\n\t\t\tvalue\n\t\t}\n  } \n\n  #graphql\n  fragment CommonCollectionItem on Collection {\n    id\n    title\n    updatedAt\n    description\n    handle\n    image {\n      altText\n      width\n      height\n      url\n    }\n    horizontal_image: metafield(key: "horizontal_image", namespace: "ciseco--collection") {\n      reference {\n        ... on MediaImage {\n          id\n          image {\n            altText\n            height\n            width\n            url\n          }\n        }\n      }\n    }\n    seo {\n      description\n      title\n    }\n  }\n\n': {
    return: FeaturedItemsQuery;
    variables: FeaturedItemsQueryVariables;
  };
  '#graphql\n  query ArticleDetails(\n    $language: LanguageCode\n    $blogHandle: String!\n    $articleHandle: String!\n  ) @inContext(language: $language) {\n    blog(handle: $blogHandle) {\n      articleByHandle(handle: $articleHandle) {\n        id\n        title\n        contentHtml\n        publishedAt\n        tags\n        excerpt\n        content\n        author: authorV2 {\n          name\n        }\n        image {\n          id\n          altText\n          url\n          width\n          height\n        }\n        seo {\n          description\n          title\n        }\n      }\n    }\n  }\n': {
    return: ArticleDetailsQuery;
    variables: ArticleDetailsQueryVariables;
  };
  '#graphql\nquery Blog(\n  $language: LanguageCode\n  $blogHandle: String!\n  $first: Int\n  $last: Int\n  $endCursor: String\n  $startCursor: String\n  $query: String\n) @inContext(language: $language) {\n  blog(handle: $blogHandle) {\n    title\n    seo {\n      title\n      description\n    }\n    articles(\n      first: $first,\n      last: $last,\n      before: $startCursor,\n      after: $endCursor,\n      query: $query\n      ) {\n      edges {\n        node {\n          ...Article\n        }\n      }\n      pageInfo {\n        hasPreviousPage\n        hasNextPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n}\n\nfragment Article on Article {\n  author: authorV2 {\n    name\n  }\n  authorV2 {\n    name\n    bio\n  }\n  excerpt\n  handle\n  id\n  image {\n    id\n    altText\n    url\n    width\n    height\n  }\n  publishedAt\n  title\n  tags\n}\n': {
    return: BlogQuery;
    variables: BlogQueryVariables;
  };
  '#graphql\n  query PageDetails($language: LanguageCode, $handle: String!)\n  @inContext(language: $language) {\n    page(handle: $handle) {\n      id\n      title\n      body\n      seo {\n        description\n        title\n      }\n    }\n  }\n': {
    return: PageDetailsQuery;
    variables: PageDetailsQueryVariables;
  };
  '#graphql\n  fragment PolicyHandle on ShopPolicy {\n    body\n    handle\n    id\n    title\n    url\n  }\n\n  query PoliciesHandle(\n    $language: LanguageCode\n    $privacyPolicy: Boolean!\n    $shippingPolicy: Boolean!\n    $termsOfService: Boolean!\n    $refundPolicy: Boolean!\n  ) @inContext(language: $language) {\n    shop {\n      privacyPolicy @include(if: $privacyPolicy) {\n        ...PolicyHandle\n      }\n      shippingPolicy @include(if: $shippingPolicy) {\n        ...PolicyHandle\n      }\n      termsOfService @include(if: $termsOfService) {\n        ...PolicyHandle\n      }\n      refundPolicy @include(if: $refundPolicy) {\n        ...PolicyHandle\n      }\n    }\n  }\n': {
    return: PoliciesHandleQuery;
    variables: PoliciesHandleQueryVariables;
  };
  '#graphql\n  fragment PolicyIndex on ShopPolicy {\n    id\n    title\n    handle\n  }\n\n  query PoliciesIndex {\n    shop {\n      privacyPolicy {\n        ...PolicyIndex\n      }\n      shippingPolicy {\n        ...PolicyIndex\n      }\n      termsOfService {\n        ...PolicyIndex\n      }\n      refundPolicy {\n        ...PolicyIndex\n      }\n      subscriptionPolicy {\n        id\n        title\n        handle\n      }\n    }\n  }\n': {
    return: PoliciesIndexQuery;
    variables: PoliciesIndexQueryVariables;
  };
  '#graphql\n  query Product(\n    $country: CountryCode\n    $language: LanguageCode\n    $handle: String!\n    $selectedOptions: [SelectedOptionInput!]!\n  ) @inContext(country: $country, language: $language) {\n    product(handle: $handle) {\n      id\n      title\n      vendor\n      handle\n      descriptionHtml\n      description\n      publishedAt\n      collections(first: 1) {\n        nodes {\n          id\n          title\n          handle\n        }\n      }\n      reviews_rating_count: metafield(namespace: "reviews", key:"rating_count") {\n        id\n        value\n        namespace\n        key\n      }\n      reviews_rating: metafield(namespace: "reviews", key:"rating") {\n        id\n        value\n        namespace\n        key\n      }\n      outstanding_features: metafield(namespace: "ciseco--product", key:"outstanding_features") {\n        id\n        value\n        namespace\n        key\n      }\n      options {\n        name\n        values\n      }\n      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {\n        ...ProductVariantFragment\n      }\n      media(first: 7) {\n        nodes {\n          ...Media\n        }\n      }\n      variants(first: 1) {\n        nodes {\n          ...ProductVariantFragment\n        }\n      }\n      seo {\n        description\n        title\n      }\n      ...OkendoStarRatingSnippet\n\t\t  ...OkendoReviewsSnippet\n    }\n    shop {\n      name\n      primaryDomain {\n        url\n      }\n      shippingPolicy {\n        handle\n      }\n      refundPolicy {\n        handle\n      }\n      subscriptionPolicy {\n        handle\n      }\n    }\n  }\n  #graphql\n  fragment Media on Media {\n    __typename\n    mediaContentType\n    alt\n    previewImage {\n      url\n    }\n    ... on MediaImage {\n      id\n      image {\n        id\n        url\n        width\n        height\n      }\n    }\n    ... on Video {\n      id\n      sources {\n        mimeType\n        url\n      }\n    }\n    ... on Model3d {\n      id\n      sources {\n        mimeType\n        url\n      }\n    }\n    ... on ExternalVideo {\n      id\n      embedUrl\n      host\n    }\n  }\n\n  #graphql\n  fragment ProductVariantFragment on ProductVariant {\n    id\n    availableForSale\n    selectedOptions {\n      name\n      value\n    }\n    image {\n      id\n      url\n      altText\n      width\n      height\n    }\n    price {\n      amount\n      currencyCode\n    }\n    compareAtPrice {\n      amount\n      currencyCode\n    }\n    sku\n    title\n    unitPrice {\n      amount\n      currencyCode\n    }\n    product {\n      title\n      handle\n    }\n  }\n\n  #graphql\n\tfragment OkendoStarRatingSnippet on Product {\n\t\tokendoStarRatingSnippet: metafield(\n\t\t\tnamespace: "okendo"\n\t\t\tkey: "StarRatingSnippet"\n\t\t) {\n\t\t\tvalue\n\t\t}\n\t}\n\n\t#graphql\n\tfragment OkendoReviewsSnippet on Product {\n\t\tokendoReviewsSnippet: metafield(\n\t\t\tnamespace: "okendo"\n\t\t\tkey: "ReviewsWidgetSnippet"\n\t\t) {\n\t\t\tvalue\n\t\t}\n\t}\n\n': {
    return: ProductQuery;
    variables: ProductQueryVariables;
  };
  '#graphql\n  query variants(\n    $country: CountryCode\n    $language: LanguageCode\n    $handle: String!\n  ) @inContext(country: $country, language: $language) {\n    product(handle: $handle) {\n      variants(first: 250) {\n        nodes {\n          ...ProductVariantFragment\n        }\n      }\n    }\n  }\n  #graphql\n  fragment ProductVariantFragment on ProductVariant {\n    id\n    availableForSale\n    selectedOptions {\n      name\n      value\n    }\n    image {\n      id\n      url\n      altText\n      width\n      height\n    }\n    price {\n      amount\n      currencyCode\n    }\n    compareAtPrice {\n      amount\n      currencyCode\n    }\n    sku\n    title\n    unitPrice {\n      amount\n      currencyCode\n    }\n    product {\n      title\n      handle\n    }\n  }\n\n': {
    return: VariantsQuery;
    variables: VariantsQueryVariables;
  };
  '#graphql\n  query productRecommendations(\n    $productId: ID!\n    $count: Int\n    $country: CountryCode\n    $language: LanguageCode\n  ) @inContext(country: $country, language: $language) {\n    recommended: productRecommendations(productId: $productId) {\n      ...CommonProductCard\n    }\n    additional: products(first: $count, sortKey: BEST_SELLING) {\n      nodes {\n        ...CommonProductCard\n      }\n    }\n  }\n  #graphql\n  fragment CommonProductCardVariant on ProductVariant {\n    id\n    title\n    availableForSale\n    price {\n      amount\n      currencyCode\n    }\n    image {\n      url\n      altText\n      width\n      height\n    }\n    selectedOptions {\n      name\n      value\n    }\n    product {\n      title\n      handle\n    }\n  }\n\n  fragment CommonProductCard on Product {\n    id\n    title\n    handle\n    publishedAt\n    availableForSale\n    vendor\n    options {\n      name\n      values\n    }\n    featuredImage {\n      url\n      altText\n      width\n      height\n    }\n    # Need to 4 images, so we can display the productCardLarge component correctly, which requires 4 images\n    images(first: 4) {\n      edges {\n        node {\n          url\n          altText\n          width\n          height\n        }\n      }\n    }\n    variants(first: 1) {\n      nodes {\n        ...CommonProductCardVariant\n      }\n    }\n    priceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    compareAtPriceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    reviews_rating_count: metafield(namespace: "reviews", key:"rating_count") {\n      type\n      id\n      value\n      namespace\n      key\n    }\n    reviews_rating: metafield(namespace: "reviews", key:"rating") {\n      type\n      id\n      value\n      namespace\n      key\n    }\n    outstanding_features: metafield(namespace: "ciseco--product", key:"outstanding_features") {\n      type\n      id\n      value\n      namespace\n      key\n    }\n    okendoStarRatingSnippet: metafield(\n\t\t\tnamespace: "okendo"\n\t\t\tkey: "StarRatingSnippet"\n\t\t) {\n\t\t\tvalue\n\t\t}\n  } \n\n': {
    return: ProductRecommendationsQuery;
    variables: ProductRecommendationsQueryVariables;
  };
  '#graphql\n  query AllProducts(\n    $country: CountryCode\n    $language: LanguageCode\n    $first: Int\n    $last: Int\n    $startCursor: String\n    $endCursor: String\n  ) @inContext(country: $country, language: $language) {\n    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {\n      nodes {\n        ...CommonProductCard\n      }\n      pageInfo {\n        hasPreviousPage\n        hasNextPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n  #graphql\n  fragment CommonProductCardVariant on ProductVariant {\n    id\n    title\n    availableForSale\n    price {\n      amount\n      currencyCode\n    }\n    image {\n      url\n      altText\n      width\n      height\n    }\n    selectedOptions {\n      name\n      value\n    }\n    product {\n      title\n      handle\n    }\n  }\n\n  fragment CommonProductCard on Product {\n    id\n    title\n    handle\n    publishedAt\n    availableForSale\n    vendor\n    options {\n      name\n      values\n    }\n    featuredImage {\n      url\n      altText\n      width\n      height\n    }\n    # Need to 4 images, so we can display the productCardLarge component correctly, which requires 4 images\n    images(first: 4) {\n      edges {\n        node {\n          url\n          altText\n          width\n          height\n        }\n      }\n    }\n    variants(first: 1) {\n      nodes {\n        ...CommonProductCardVariant\n      }\n    }\n    priceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    compareAtPriceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    reviews_rating_count: metafield(namespace: "reviews", key:"rating_count") {\n      type\n      id\n      value\n      namespace\n      key\n    }\n    reviews_rating: metafield(namespace: "reviews", key:"rating") {\n      type\n      id\n      value\n      namespace\n      key\n    }\n    outstanding_features: metafield(namespace: "ciseco--product", key:"outstanding_features") {\n      type\n      id\n      value\n      namespace\n      key\n    }\n    okendoStarRatingSnippet: metafield(\n\t\t\tnamespace: "okendo"\n\t\t\tkey: "StarRatingSnippet"\n\t\t) {\n\t\t\tvalue\n\t\t}\n  } \n\n': {
    return: AllProductsQuery;
    variables: AllProductsQueryVariables;
  };
  '#graphql\n  query PaginatedProductsSearch(\n    $country: CountryCode\n    $endCursor: String\n    $first: Int\n    $language: LanguageCode\n    $last: Int\n    $searchTerm: String!\n    $filters: [ProductFilter!]\n    $reverse: Boolean\n    $startCursor: String\n    $sortKey: SearchSortKeys!\n  ) @inContext(country: $country, language: $language) {\n    search(\n      first: $first,\n      last: $last,\n      before: $startCursor,\n      after: $endCursor,\n      # sortKey: RELEVANCE,\n      types: PRODUCT,\n      query: $searchTerm,\n      productFilters: $filters,\n      sortKey: $sortKey,  \n      reverse: $reverse  \n    ) {\n      productFilters {\n        id\n        label\n        type\n        values {\n          id\n          label\n          count\n          input\n        }\n      }\n      nodes {\n        ... on Product {\n          ...CommonProductCard\n        }\n      }\n      pageInfo {\n        startCursor\n        endCursor\n        hasNextPage\n        hasPreviousPage\n      }\n    }\n  }\n\n  #graphql\n  fragment CommonProductCardVariant on ProductVariant {\n    id\n    title\n    availableForSale\n    price {\n      amount\n      currencyCode\n    }\n    image {\n      url\n      altText\n      width\n      height\n    }\n    selectedOptions {\n      name\n      value\n    }\n    product {\n      title\n      handle\n    }\n  }\n\n  fragment CommonProductCard on Product {\n    id\n    title\n    handle\n    publishedAt\n    availableForSale\n    vendor\n    options {\n      name\n      values\n    }\n    featuredImage {\n      url\n      altText\n      width\n      height\n    }\n    # Need to 4 images, so we can display the productCardLarge component correctly, which requires 4 images\n    images(first: 4) {\n      edges {\n        node {\n          url\n          altText\n          width\n          height\n        }\n      }\n    }\n    variants(first: 1) {\n      nodes {\n        ...CommonProductCardVariant\n      }\n    }\n    priceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    compareAtPriceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    reviews_rating_count: metafield(namespace: "reviews", key:"rating_count") {\n      type\n      id\n      value\n      namespace\n      key\n    }\n    reviews_rating: metafield(namespace: "reviews", key:"rating") {\n      type\n      id\n      value\n      namespace\n      key\n    }\n    outstanding_features: metafield(namespace: "ciseco--product", key:"outstanding_features") {\n      type\n      id\n      value\n      namespace\n      key\n    }\n    okendoStarRatingSnippet: metafield(\n\t\t\tnamespace: "okendo"\n\t\t\tkey: "StarRatingSnippet"\n\t\t) {\n\t\t\tvalue\n\t\t}\n  } \n\n\n': {
    return: PaginatedProductsSearchQuery;
    variables: PaginatedProductsSearchQueryVariables;
  };
  '#graphql\n  query PaginatedProductsSearchForGetDefaultPriceFilter(\n    $country: CountryCode\n    $language: LanguageCode\n    $searchTerm: String!\n  ) @inContext(country: $country, language: $language) {\n    search(\n      first: 0,\n      types: PRODUCT,\n      query: $searchTerm,\n      productFilters: {},\n    ) {\n      productFilters {\n        id\n        label\n        type\n        values {\n          id\n          label\n          count\n          input\n        }\n      }\n    }\n  }\n': {
    return: PaginatedProductsSearchForGetDefaultPriceFilterQuery;
    variables: PaginatedProductsSearchForGetDefaultPriceFilterQueryVariables;
  };
  '#graphql\n  query ProductsByHandles(\n    $country: CountryCode\n    $language: LanguageCode\n    $first: Int\n    $last: Int\n    $startCursor: String\n    $endCursor: String\n    $query: String\n  ) @inContext(country: $country, language: $language) {\n    products(first: $first, last: $last, before: $startCursor, after: $endCursor, query: $query) {\n      nodes {\n        ...CommonProductCard\n      }\n      pageInfo {\n        hasPreviousPage\n        hasNextPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n  #graphql\n  fragment CommonProductCardVariant on ProductVariant {\n    id\n    title\n    availableForSale\n    price {\n      amount\n      currencyCode\n    }\n    image {\n      url\n      altText\n      width\n      height\n    }\n    selectedOptions {\n      name\n      value\n    }\n    product {\n      title\n      handle\n    }\n  }\n\n  fragment CommonProductCard on Product {\n    id\n    title\n    handle\n    publishedAt\n    availableForSale\n    vendor\n    options {\n      name\n      values\n    }\n    featuredImage {\n      url\n      altText\n      width\n      height\n    }\n    # Need to 4 images, so we can display the productCardLarge component correctly, which requires 4 images\n    images(first: 4) {\n      edges {\n        node {\n          url\n          altText\n          width\n          height\n        }\n      }\n    }\n    variants(first: 1) {\n      nodes {\n        ...CommonProductCardVariant\n      }\n    }\n    priceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    compareAtPriceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    reviews_rating_count: metafield(namespace: "reviews", key:"rating_count") {\n      type\n      id\n      value\n      namespace\n      key\n    }\n    reviews_rating: metafield(namespace: "reviews", key:"rating") {\n      type\n      id\n      value\n      namespace\n      key\n    }\n    outstanding_features: metafield(namespace: "ciseco--product", key:"outstanding_features") {\n      type\n      id\n      value\n      namespace\n      key\n    }\n    okendoStarRatingSnippet: metafield(\n\t\t\tnamespace: "okendo"\n\t\t\tkey: "StarRatingSnippet"\n\t\t) {\n\t\t\tvalue\n\t\t}\n  } \n\n': {
    return: ProductsByHandlesQuery;
    variables: ProductsByHandlesQueryVariables;
  };
  '#graphql\n  query sitemaps($urlLimits: Int, $language: LanguageCode)\n  @inContext(language: $language) {\n    products(\n      first: $urlLimits\n      query: "published_status:\'online_store:visible\'"\n    ) {\n      nodes {\n        updatedAt\n        handle\n        onlineStoreUrl\n        title\n        featuredImage {\n          url\n          altText\n        }\n      }\n    }\n    collections(\n      first: $urlLimits\n      query: "published_status:\'online_store:visible\'"\n    ) {\n      nodes {\n        updatedAt\n        handle\n        onlineStoreUrl\n      }\n    }\n    pages(first: $urlLimits, query: "published_status:\'published\'") {\n      nodes {\n        updatedAt\n        handle\n        onlineStoreUrl\n      }\n    }\n  }\n': {
    return: SitemapsQuery;
    variables: SitemapsQueryVariables;
  };
  '#graphql\n  query RouteContent($handle: String!\n    $country: CountryCode\n    $language: LanguageCode\n    $filters: [ProductFilter!]\n    $sortKey: ProductCollectionSortKeys!\n    $reverse: Boolean\n    $first: Int\n    $last: Int\n    $startCursor: String\n    $endCursor: String\n    )\n    @inContext(country: $country, language: $language)\n     {\n    route: metaobject(handle: {type: "ciseco--route", handle: $handle}) {\n      type\n      id\n      title: field(key: "title") {\n        key\n        value\n      }\n      padding_top_px: field(key: "padding_top_px") {\n        type\n        key\n        value\n      }\n      firt_line_on_top: field(key: "firt_line_on_top") {\n        type\n        key\n        value\n      }\n      separation_line_between_sections: field(key: "separation_line_between_sections") {\n        type\n        key\n        value\n      }\n      sections: field(key: "sections") {\n        ...Sections\n      }\n    }\n  }\n  #graphql\n  fragment Sections on MetaobjectField {\n    ... on MetaobjectField {\n      references(first: 20) {\n        nodes {\n          ... on Metaobject {\n            id\n            type\n            ...SectionHero\n            ...SectionHeroSlider\n            ...SectionCollectionsSlider\n            ...SectionProductsSlider\n            ...SectionSteps\n            ...SectionImageWithText\n            ...SectionTabsCollectionsByGroup\n            ...SectionGridProductsAndFilter\n            ...SectionLatestBlog\n            ...SectionClientsSay\n          }\n        }\n      }\n    }\n  }\n  # All section fragments\n  #graphql\n  fragment SectionHero on Metaobject {\n    type\n    hero_item: field(key: "hero_item") {\n      reference {\n          ... on Metaobject {\n            ...HeroItem\n          }\n      }\n    }\n  }\n \n  #graphql\n  fragment SectionHeroSlider on Metaobject {\n    type\n    hero_items: field(key: "hero_items") {\n      references(first: 10) {\n        nodes {\n          ... on Metaobject {\n            ...HeroItem\n          }\n        }\n      }\n    }\n  }\n \n  #graphql\n  fragment SectionCollectionsSlider on Metaobject {\n    type\n    id\n    heading_bold: field(key: "heading_bold") {\n      type\n      key\n      value\n    }\n    heading_light: field(key: "heading_light") {\n      type\n      key\n      value\n    }\n    sub_heading: field(key: "sub_heading") {\n      type\n      key\n      value\n    }\n    button_text: field(key: "button_text") {\n      type\n      key\n      value\n    }\n    collections: field(key: "collections") {\n      references(first: 10) {\n        nodes {\n          ... on Collection {\n            ...CommonCollectionItem\n          }\n        }\n      }\n    }\n  } \n\n  #graphql\n  fragment SectionProductsSlider on Metaobject {\n    type\n    heading_bold: field(key: "heading_bold") {\n      key\n      value\n    }\n    heading_light: field(key: "heading_light") {\n      key\n      value\n    }\n    sub_heading: field(key: "sub_heading") {\n      key\n      value\n    }\n    body: field(key: "body") {\n      key\n      value\n    }\n    style: field(key: "style") {\n      key\n      value\n    }\n\n    collection: field(key: "collection") {\n      type\n      key\n      reference {\n        ... on Collection {\n          id\n          handle\n          title\n          description\n          products(\n            first: 10, \n          ) {\n            nodes {\n              ...CommonProductCard\n            }\n          }\n        }\n      }\n    }\n  }\n\n  #graphql\n  fragment SectionSteps on Metaobject {\n    type\n    title: field(key: "title") {\n      type\n      key\n      value\n    }\n    headings: field(key: "headings") {\n      type\n      key\n      value\n    }\n    labels: field(key: "labels") {\n      type\n      key\n      value\n    }\n    contents: field(key: "contents") {\n      type\n      key\n      value\n    }\n    icons: field(key: "icons") {\n      key\n      type\n      value\n      references(first: 10) {\n        nodes {\n              ...MediaImage\n            }\n        }\n    }\n    style: field(key: "style") {\n      key\n      value\n    }\n  }\n\n  #graphql\n  fragment SectionImageWithText on Metaobject {\n    type\n    title: field(key: "title") {\n      key\n      value\n    }\n    heading: field(key: "heading") {\n      key\n      value\n    }\n    content: field(key: "content") {\n      key\n      value\n    }\n    hide_logo: field(key: "hide_logo") {\n      key\n      value\n    }\n    background_color: field(key: "background_color") {\n      key\n      value\n    }\n    button_1: field(key: "button_1") {\n      ...Link\n    }\n    button_2: field(key: "button_2") {\n      ...Link\n    }\n    image: field(key: "image") {\n      key\n      reference {\n        ... on MediaImage {\n          ...MediaImage\n        }\n      }\n    }\n    features: field(key: "features") {\n      key\n      type\n      value\n    }\n    show_subscribers_input: field(key: "show_subscribers_input") {\n      key\n      value\n    }\n    style: field(key: "style") {\n      key\n      value\n    }\n  }\n\n  #graphql\n  fragment SectionTabsCollectionsByGroup on Metaobject {\n    type\n    heading: field(key: "heading") {\n     type\n     key\n     value\n    }\n    card_style: field(key: "card_style") {\n     type\n     key\n     value\n    }\n    sub_heading: field(key: "sub_heading") {\n     type\n     key\n     value\n    }\n    number_collections_to_show: field(key: "number_collections_to_show") {\n     type\n     key\n     value\n    }\n    background_color: field(key: "background_color") {\n     type\n     key\n     value\n    }\n    collection_groups: field(key: "collection_groups") {\n      references(first: 20) {\n        nodes {\n          ...CollectionGroupItem\n        }\n      }\n    }\n  }\n  #graphql\nfragment CollectionOnGroupItem on Collection {\n    ...CommonCollectionItem\n    products(first: 0) {\n      filters {\n        values {\n          input\n          count\n          label\n        }\n      }\n    }\n  }\n\n  fragment CollectionGroupItem on Metaobject {\n    type\n    id\n    handle\n    title: field(key: "title") {\n     type\n     key\n     value\n    }\n    name: field(key: "name") {\n     type\n     key\n     value\n    }\n    icon_svg: field(key: "icon_svg") {\n     type\n     key\n     value\n    }\n    \n    collections: field(key: "collections") {\n      references(first: 12) {\n        nodes {\n          ... on Collection {\n            ...CollectionOnGroupItem\n          }\n        }\n      }\n    }\n}\n \n  #graphql\n  fragment SectionGridProductsAndFilter on Metaobject {\n    type\n    heading: field(key: "heading") {\n      key\n      value\n    }\n    sub_heading: field(key: "sub_heading") {\n      key\n      value\n    }\n    collection: field(key: "collection") {\n      type\n      key\n      reference {\n\n        ... on Collection {\n          id\n          handle\n          title\n          description\n          sectionGridProductsAndFilterProductsDefaultFilter :products(first: 0, filters : {}) {\n            filters {\n              id\n              label\n              type\n              values {\n                id\n                label\n                count\n                input\n              }\n            }\n          }\n          sectionGridProductsAndFilterProducts :products(\n            first: $first,\n            last: $last,\n            before: $startCursor,\n            after: $endCursor,\n            filters: $filters,\n            sortKey: $sortKey,\n            reverse: $reverse\n          ) {\n            filters {\n              id\n              label\n              type\n              values {\n                id\n                label\n                count\n                input\n              }\n            }\n            nodes {\n              ...CommonProductCard\n            }\n            pageInfo {\n              hasPreviousPage\n              hasNextPage\n              endCursor\n              startCursor\n            }\n          }\n        }\n      }\n    }\n  }\n\n  #graphql\n  fragment SectionLatestBlog on Metaobject {\n    type\n    heading: field(key: "heading") {\n      key\n      value\n    }\n    heading_bold: field(key: "heading_bold") {\n      key\n      value\n    }\n    heading_light: field(key: "heading_light") {\n      key\n      value\n    }\n    background_color: field(key: "background_color") {\n      key\n      value\n    }\n    button_view_all: field(key: "button_view_all") {\n      ...Link\n    }\n\n    number_of_items: field(key: "number_of_items") {\n      key\n      value\n    }\n    blog_slug: field(key: "blog_slug") {\n      key\n      value\n    }\n  }\n\n  #graphql\n  fragment ClientSay on Metaobject {\n    type\n    id\n    handle\n    title: field(key: "title") {\n      type\n      key\n      value\n    }\n    name: field(key: "name") {\n     type\n      key\n      value\n    }\n    stars: field(key: "stars") {\n     type\n      key\n      value\n    }\n    content: field(key: "content") {\n     type\n      key\n      value\n    }\n    image: field(key: "image") {\n      type\n      key\n      reference {\n        ... on MediaImage {\n          image {\n            altText\n            url\n            width\n            height\n          }\n        }\n      }\n    }\n  }\n\n  fragment SectionClientsSay on Metaobject {\n    type\n    heading: field(key: "heading") {\n      key\n      value\n    }\n    sub_heading: field(key: "sub_heading") {\n      key\n      value\n    }\n    clients_say: field(key: "clients_say") {\n      references(first: 10) {\n          nodes {\n            ...on Metaobject {\n              ...ClientSay\n            }\n        }\n       }\n    }\n  }\n\n\n  # All common fragments\n  #graphql\n  fragment CommonProductCardVariant on ProductVariant {\n    id\n    title\n    availableForSale\n    price {\n      amount\n      currencyCode\n    }\n    image {\n      url\n      altText\n      width\n      height\n    }\n    selectedOptions {\n      name\n      value\n    }\n    product {\n      title\n      handle\n    }\n  }\n\n  fragment CommonProductCard on Product {\n    id\n    title\n    handle\n    publishedAt\n    availableForSale\n    vendor\n    options {\n      name\n      values\n    }\n    featuredImage {\n      url\n      altText\n      width\n      height\n    }\n    # Need to 4 images, so we can display the productCardLarge component correctly, which requires 4 images\n    images(first: 4) {\n      edges {\n        node {\n          url\n          altText\n          width\n          height\n        }\n      }\n    }\n    variants(first: 1) {\n      nodes {\n        ...CommonProductCardVariant\n      }\n    }\n    priceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    compareAtPriceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    reviews_rating_count: metafield(namespace: "reviews", key:"rating_count") {\n      type\n      id\n      value\n      namespace\n      key\n    }\n    reviews_rating: metafield(namespace: "reviews", key:"rating") {\n      type\n      id\n      value\n      namespace\n      key\n    }\n    outstanding_features: metafield(namespace: "ciseco--product", key:"outstanding_features") {\n      type\n      id\n      value\n      namespace\n      key\n    }\n    okendoStarRatingSnippet: metafield(\n\t\t\tnamespace: "okendo"\n\t\t\tkey: "StarRatingSnippet"\n\t\t) {\n\t\t\tvalue\n\t\t}\n  } \n\n  #graphql\n  fragment MediaImage on MediaImage {\n    image {\n      altText\n      url\n      width\n      height\n    }\n  }\n\n  #graphql\n  fragment Link on MetaobjectField {\n    ... on MetaobjectField {\n      reference {\n        ...on Metaobject {\n          ...LinkContent\n        }\n      }\n    }\n  }\n\n  fragment LinkContent on Metaobject {\n      href: field(key: "href") {\n        value\n      }\n      target: field(key: "target") {\n        value\n      }\n      text: field(key: "text") {\n        value\n      }\n      icon_svg: field(key: "icon_svg") {\n        value\n      }\n    }\n\n  #graphql\n  fragment CommonCollectionItem on Collection {\n    id\n    title\n    updatedAt\n    description\n    handle\n    image {\n      altText\n      width\n      height\n      url\n    }\n    horizontal_image: metafield(key: "horizontal_image", namespace: "ciseco--collection") {\n      reference {\n        ... on MediaImage {\n          id\n          image {\n            altText\n            height\n            width\n            url\n          }\n        }\n      }\n    }\n    seo {\n      description\n      title\n    }\n  }\n\n  #graphql\n    fragment HeroItem on Metaobject {\n      type\n      heading: field(key: "heading") {\n        value\n      }\n      sub_heading: field(key: "sub_heading") {\n        value\n      }\n      cta_button: field(key: "cta_button") {\n        ...Link\n      }\n      vertical_image: field(key: "vertical_image") {\n        key\n        reference {\n          ... on MediaImage {\n            ...MediaImage\n          }\n        }\n      }\n      horizontal_image: field(key: "horizontal_image") {\n        key\n        reference {\n          ... on MediaImage {\n            ...MediaImage\n          }\n        }\n      }\n  }\n\n\n': {
    return: RouteContentQuery;
    variables: RouteContentQueryVariables;
  };
}

interface GeneratedMutationTypes {
  '#graphql\n  mutation AddSubscriber($password: String = "", $email: String = "") {\n  customerCreate(\n    input: {email: $email, password: $password, acceptsMarketing: true}\n  ) {\n    customer {\n      id\n    }\n    customerUserErrors {\n      message\n      field\n      code\n    }\n  }\n}\n': {
    return: AddSubscriberMutation;
    variables: AddSubscriberMutationVariables;
  };
}

declare module '@shopify/hydrogen' {
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
