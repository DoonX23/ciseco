import React, {type FC} from 'react';
import {Image} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import {type ArticleFragment} from 'storefrontapi.generated';

export interface BlogCard12Props {
  className?: string;
  post: ArticleFragment;
}

const BlogCard12: FC<BlogCard12Props> = ({className = 'h-full', post}) => {
  if (!post) return null;
  return (
    <div className={`nc-Card12 group relative flex flex-col ${className}`}>
      {post.image && (
        <Link
          to={'/news/' + post.handle}
          className="block flex-shrink-0 flex-grow relative w-full h-0 aspect-w-4 aspect-h-3 rounded-3xl overflow-hidden mb-8"
        >
          <Image
            data={post.image}
            className="absolute inset-0 object-cover w-full h-full hover:opacity-80 transition-opacity"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </Link>
      )}
      <div className="pr-10 flex flex-col">
        <h2
          className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 transition-colors text-lg sm:text-2xl`}
        >
          <Link
            to={'/news/' + post.handle}
            className="line-clamp-2 capitalize"
            title={post.title || 'title'}
          >
            {post.title || ''}
          </Link>
        </h2>
        <span className="hidden sm:block mt-4 text-slate-500 dark:text-slate-400 leading-6">
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
    </div>
  );
};

export default BlogCard12;
