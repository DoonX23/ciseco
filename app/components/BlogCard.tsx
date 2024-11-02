import React, {type FC} from 'react';
import type {ArticleFragment} from 'storefrontapi.generated';
import {Link} from './Link';
import {Image} from '@shopify/hydrogen';

export interface Props {
  className?: string;
  post: ArticleFragment;
}

export const BlogCard: FC<Props> = ({post, className = ''}) => {
  return (
    <article
      className={`flex flex-col items-start justify-between ${className}`}
    >
      <div className="relative w-full">
        <Link
          to={'/news/' + post.handle}
          className="block aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
        >
          {!!post.image && (
            <Image
              data={post.image}
              className="rounded-2xl bg-gray-100 object-cover w-full h-full hover:opacity-80 transition-opacity"
            />
          )}
        </Link>
      </div>
      <div className="max-w-xl">
        <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-x-4 text-xs">
          <time className="text-gray-500">
            {new Date(post.publishedAt).toDateString()}
          </time>
          {!!post.tags[0] && (
            <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 ">
              {post.tags[0]}
            </span>
          )}
          {!!post.tags[1] && (
            <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 ">
              {post.tags[1]}
            </span>
          )}
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <Link to={'/news/' + post.handle}>
              <span className="absolute inset-0" />
              {post.title}
            </Link>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
            {post.excerpt}
          </p>
        </div>
      </div>
    </article>
  );
};
