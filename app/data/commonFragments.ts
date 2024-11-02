export const ADD_SUBSCRIBER_MUTATION = `#graphql
  mutation AddSubscriber($password: String = "", $email: String = "") {
  customerCreate(
    input: {email: $email, password: $password, acceptsMarketing: true}
  ) {
    customer {
      id
    }
    customerUserErrors {
      message
      field
      code
    }
  }
}
`;
export const MEDIA_IMAGE_FRAGMENT = `#graphql
  fragment MediaImage on MediaImage {
    image {
      altText
      url
      width
      height
    }
  }
`;

export const LINK_FRAGMENT = `#graphql
  fragment Link on MetaobjectField {
    ... on MetaobjectField {
      reference {
        ...on Metaobject {
          ...LinkContent
        }
      }
    }
  }

  fragment LinkContent on Metaobject {
      href: field(key: "href") {
        value
      }
      target: field(key: "target") {
        value
      }
      text: field(key: "text") {
        value
      }
      icon_svg: field(key: "icon_svg") {
        value
      }
    }
`;

const OKENDO_PRODUCT_STAR_RATING_FRAGMENT = `#graphql
	fragment OkendoStarRatingSnippet on Product {
		okendoStarRatingSnippet: metafield(
			namespace: "okendo"
			key: "StarRatingSnippet"
		) {
			value
		}
	}
` as const;

const OKENDO_PRODUCT_REVIEWS_FRAGMENT = `#graphql
	fragment OkendoReviewsSnippet on Product {
		okendoReviewsSnippet: metafield(
			namespace: "okendo"
			key: "ReviewsWidgetSnippet"
		) {
			value
		}
	}
` as const;

// Using this fragment in all queries that need to display a product card item
export const COMMON_PRODUCT_CARD_FRAGMENT = `#graphql
  fragment CommonProductCardVariant on ProductVariant {
    id
    title
    availableForSale
    price {
      amount
      currencyCode
    }
    image {
      url
      altText
      width
      height
    }
    selectedOptions {
      name
      value
    }
    product {
      title
      handle
    }
  }

  fragment CommonProductCard on Product {
    id
    title
    handle
    publishedAt
    availableForSale
    vendor
    options {
      name
      values
    }
    featuredImage {
      url
      altText
      width
      height
    }
    # Need to 4 images, so we can display the productCardLarge component correctly, which requires 4 images
    images(first: 4) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 1) {
      nodes {
        ...CommonProductCardVariant
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    reviews_rating_count: metafield(namespace: "reviews", key:"rating_count") {
      type
      id
      value
      namespace
      key
    }
    reviews_rating: metafield(namespace: "reviews", key:"rating") {
      type
      id
      value
      namespace
      key
    }
    outstanding_features: metafield(namespace: "ciseco--product", key:"outstanding_features") {
      type
      id
      value
      namespace
      key
    }
    okendoStarRatingSnippet: metafield(
			namespace: "okendo"
			key: "StarRatingSnippet"
		) {
			value
		}
  } 
`;
//

export const COMMON_COLLECTION_ITEM_FRAGMENT = `#graphql
  fragment CommonCollectionItem on Collection {
    id
    title
    updatedAt
    description
    handle
    image {
      altText
      width
      height
      url
    }
    horizontal_image: metafield(key: "horizontal_image", namespace: "ciseco--collection") {
      reference {
        ... on MediaImage {
          id
          image {
            altText
            height
            width
            url
          }
        }
      }
    }
    seo {
      description
      title
    }
  }
`;
