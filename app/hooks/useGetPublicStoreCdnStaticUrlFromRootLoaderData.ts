import {useRouteLoaderData} from '@remix-run/react';
import type {RootLoader} from '~/root';

export const useGetPublicStoreCdnStaticUrlFromRootLoaderData = () => {
  const rootLoaderData = useRouteLoaderData<RootLoader>('root');

  const publicStoreCdnStaticUrl = rootLoaderData?.publicStoreCdnStaticUrl;
  const imgFormat = rootLoaderData?.publicImageFormatForProductOption;

  const getImageWithCdnUrlByName = (imageName: string, format = imgFormat) => {
    return `${publicStoreCdnStaticUrl}${imageName}.${format}`;
  };

  return {
    publicStoreCdnStaticUrl,
    imgFormat,
    getImageWithCdnUrlByName,
  };
};
