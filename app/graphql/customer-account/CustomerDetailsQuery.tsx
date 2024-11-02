const ADDRESS_PARTIAL_FRAGMENT = `#graphql
  fragment AddressPartial on CustomerAddress {
      id
      formatted
      firstName
      lastName
      company
      address1
      address2
      territoryCode
      zoneCode
      city
      zip
      phoneNumber
      country
    }
`;

const CUSTOMER_FRAGMENT = `#graphql
${ADDRESS_PARTIAL_FRAGMENT}
  fragment OrderCard on Order {
    id
    number
    processedAt
    financialStatus
    fulfillments(first: 1) {
      nodes {
        status
      }
    }
    totalPrice {
      amount
      currencyCode
    }
    lineItems(first: 2) {
      edges {
        node {
          title
          image {
            altText
            height
            url
            width
          }
        }
      }
    }
  }
  fragment CustomerDetails on Customer {
    firstName
    lastName
    phoneNumber {
      phoneNumber
    }
    emailAddress {
      emailAddress
    }
    defaultAddress {
      ...AddressPartial
    }
    addresses(first: 6) {
      edges {
        node {
          ...AddressPartial
        }
      }
    }
    orders(first: 250, sortKey: PROCESSED_AT, reverse: true) {
      edges {
        node {
          ...OrderCard
        }
      }
    }
  }
`;

// NOTE: https://shopify.dev/docs/api/customer/latest/queries/customer
export const CUSTOMER_DETAILS_QUERY = `#graphql
  query CustomerDetails {
    customer {
      ...CustomerDetails
    }
  }
  ${CUSTOMER_FRAGMENT}
`;

// NOTE: https://shopify.dev/docs/api/customer/latest/queries/customer
export const CUSTOMER_SHORT_DETAILS_QUERY = `#graphql
  query CustomerShortDetails {
    customer {
      firstName
      lastName
      phoneNumber {
        phoneNumber
      }
      emailAddress {
        emailAddress
      }
      defaultAddress {
        ...AddressPartial
      }
    }
  }
  ${ADDRESS_PARTIAL_FRAGMENT}
`;
