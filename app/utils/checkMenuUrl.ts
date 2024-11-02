function checkMenuUrl(
  menuUrl: string,
  publicStoreDomain: string,
  primaryDomainUrl: string,
) {
  const url =
    menuUrl.includes('myshopify.com') ||
    menuUrl.includes(publicStoreDomain) ||
    menuUrl.includes(primaryDomainUrl)
      ? new URL(menuUrl).pathname
      : menuUrl;
  const isExternal = !url.startsWith('/');

  return {
    url,
    isExternal,
  };
}
