import {type FC} from 'react';
import LangDropdown from './LangDropdown';
import AvatarDropdown from './AvatarDropdown';
import TemplatesDropdown from './TemplatesDropdown';
import Logo from '../Logo';
import CartBtn from './CartBtn';
import {MagnifyingGlassIcon} from '../Icons/MyIcons';
import clsx from 'clsx';
import {Bars3Icon} from '@heroicons/react/24/outline';
import {Link} from '../Link';
import {useAside} from '../Aside';

export interface Props {
  className?: string;
  isHome?: boolean;
}

const MainNav: FC<Props> = ({className = '', isHome}) => {
  const {type: activeType, close, open} = useAside();

  return (
    <div
      className={clsx(
        className,
        'nc-MainNav2 relative z-10 bg-white dark:bg-slate-900',
        isHome ? '' : 'border-b border-slate-200/70',
      )}
    >
      <div className="container">
        <div className="h-16 sm:h-20 flex justify-between">
          <div className="flex items-center md:hidden flex-1">
            <button
              className="flex items-center justify-start pr-1 h-10 sm:h-12"
              onClick={() => open('mobile')}
              type="button"
            >
              <Bars3Icon className="w-6 h-6" aria-hidden="true" />
            </button>

            <Link
              to="/search"
              className="flex w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 focus:outline-none items-center justify-center"
            >
              <MagnifyingGlassIcon />
            </Link>
          </div>

          <div className="flex lg:flex-1 items-center gap-x-3 sm:gap-x-8">
            <Logo />

            <div className="hidden md:block h-8 border-s border-slate-200 dark:border-slate-700"></div>

            <div className="hidden md:block flex-grow max-w-xs">
              <TemplatesDropdown />
            </div>
          </div>

          <div className="flex-1 flex items-center justify-end ">
            <LangDropdown className="hidden md:block" />
            <Link
              to={'/search'}
              className="hidden lg:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none items-center justify-center"
            >
              <MagnifyingGlassIcon />
            </Link>
            <AvatarDropdown />
            <CartBtn openCart={() => open('cart')} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav;
