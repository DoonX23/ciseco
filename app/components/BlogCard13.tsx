import React, {type FC} from 'react';
import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {type ArticleFragment} from 'storefrontapi.generated';

export interface BlogCard13Props {
  className?: string;
  post: ArticleFragment;
}

const BlogCard13: FC<BlogCard13Props> = ({className = 'w-full', post}) => {
  if (!post) return null;
  return (
    <div
      className={`nc-Card13 relative flex justify-between gap-3 md:gap-5 ${className}`}
      data-nc-id="Card13"
    >
      <div className="flex flex-col py-2">
        <h2 className={`nc-card-title block font-semibold text-base`}>
          <Link to={'/news/' + post.handle} className="line-clamp-2 capitalize">
            {post.title || 'title'}
          </Link>
        </h2>
        <span className="hidden sm:block my-3 text-slate-500 dark:text-slate-400 leading-6">
          <span className="line-clamp-2">{post.excerpt || ''}</span>
        </span>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm">
          <time className="text-gray-500">
            {new Date(post.publishedAt).toDateString()}
          </time>
          {!!post.tags[0] && (
            <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 ">
              {post.tags[0]}
            </span>
          )}
        </div>
      </div>

      {post.image && (
        <Link
          to={'/news/' + post.handle}
          className={`block relative flex-shrink-0 w-2/5 sm:w-1/3 hover:opacity-80 transition-opacity`}
        >
          <div className="aspect-[1/1]">
            <Image
              data={post.image}
              className="object-cover w-full h-full rounded-xl sm:rounded-3xl"
              sizes="400px"
            />
          </div>
        </Link>
      )}
    </div>
  );
};

export default BlogCard13;
