import {ArrowLeftIcon} from '@heroicons/react/24/solid';
import {Link} from './Link';
import PageHeader from './PageHeader';

export function PageAccoutLayout({
  children,
  breadcrumbText,
}: {
  children: React.ReactNode;
  breadcrumbText: string;
}) {
  return (
    <div className={`py-10 lg:pb-28 lg:pt-20`}>
      <div className="container space-y-24 lg:space-y-32">
        <div className="max-w-screen-lg mx-auto space-y-10 lg:space-y-16">
          <PageHeader
            title={breadcrumbText}
            hasBreadcrumb={true}
            breadcrumbText={breadcrumbText}
            prevbreadcrumb={{
              title: 'Account',
              href: '/account',
            }}
          />
          <main>{children}</main>
          <div>
            <Link
              to="/account"
              className="hover:text-slate-900 hover:underline flex items-center text-sm font-medium"
            >
              <ArrowLeftIcon className="h-5 w-5 inline-block mr-2" />
              Back to Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
