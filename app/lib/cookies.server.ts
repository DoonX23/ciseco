import {createCookie} from '@shopify/remix-oxygen';

export const wishlistPrefs = createCookie('wishlist-prefs', {
  maxAge: 604_800, // one week
});
