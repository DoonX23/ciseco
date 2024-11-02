import {type FC, Fragment, type ReactNode, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {
  ExclamationTriangleIcon,
  HashtagIcon,
  LifebuoyIcon,
  ClockIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import {Link} from '../Link';
import Input from '../MyInput';
import {Form, useParams} from '@remix-run/react';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

interface Props {}

const SearchModal: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [rawQuery, setRawQuery] = useState('a');
  const params = useParams();

  return (
    <>
      <Form
        method="get"
        action={params.locale ? `/${params.locale}/search` : '/search'}
        className="relative group"
      >
        <Input
          placeholder="Search items"
          className="pr-5 md:pr-10 !w-40 md:!w-full group-hover:border-slate-300 !rounded-full"
          sizeClass="h-[40px] ps-4 py-2.5"
          type="search"
          name="q"
        />
        <button
          type="submit"
          className="absolute top-1/2 -translate-y-1/2 right-3 text-neutral-500 dark:text-neutral-400"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 22L20 20"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </Form>

      <Transition.Root
        show={open}
        as={Fragment}
        afterLeave={() => setRawQuery('a')}
        appear
      >
        <Dialog
          as="div"
          className="relative z-[99]"
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-100"
            >
              <Dialog.Panel
                className="block mx-auto max-w-2xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
                as="form"
                onSubmit={(e: any) => {
                  e.preventDefault();
                  setOpen(false);
                }}
              >
                {/* <Combobox
                  onChange={(item: any) => {
                    // router.push(item.href);
                    setOpen(false);
                  }}
                  name="searchpallet"
                >
                  <div className="relative">
                    <MagnifyingGlassIcon
                      className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <Combobox.Input
                      className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                      placeholder="Search..."
                      onChange={(event) => setRawQuery(event.target.value)}
                    />
                  </div>

                  <Combobox.Options
                    static
                    className="max-h-80 scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2"
                  >
                    {[1, 1, 11].length > 0 && (
                      <li>
                        <h2 className="text-xs font-semibold text-gray-900">
                          Posts
                        </h2>
                        <ul className="-mx-4 mt-2 text-sm text-gray-700">
                          {[1, 1, 11].map((post, index) => (
                            <Combobox.Option
                              key={index}
                              value={post}
                              className={({active}) =>
                                classNames(
                                  'flex select-none items-center px-4 py-2',
                                  active && 'bg-indigo-600 text-white',
                                )
                              }
                            >
                              {({active}) => (
                                <>
                                  <ClockIcon
                                    className={classNames(
                                      'h-6 w-6 flex-none',
                                      active ? 'text-white' : 'text-gray-400',
                                    )}
                                    aria-hidden="true"
                                  />
                                  <span className="ms-3 flex-auto truncate">
                                    {'post.title'}
                                  </span>
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </ul>
                      </li>
                    )}
                  </Combobox.Options>

                  {rawQuery === '?' && (
                    <div className="py-14 px-6 text-center text-sm sm:px-14">
                      <LifebuoyIcon
                        className="mx-auto h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                      <p className="mt-4 font-semibold text-gray-900">
                        Help with searching
                      </p>
                      <p className="mt-2 text-gray-500">
                        Use this tool to quickly search for users and projects
                        across our entire platform. You can also use the search
                        modifiers found in the footer below to limit the results
                        to just users or projects.
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center bg-gray-50 py-2.5 px-4 text-xs text-gray-700">
                    Type{' '}
                    <kbd
                      className={classNames(
                        'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                        rawQuery.startsWith('#')
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-gray-400 text-gray-900',
                      )}
                    >
                      #
                    </kbd>{' '}
                    <span className="sm:hidden">for projects,</span>
                    <span className="hidden sm:inline">
                      to access projects,
                    </span>
                    <kbd
                      className={classNames(
                        'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                        rawQuery.startsWith('>')
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-gray-400 text-gray-900',
                      )}
                    >
                      &gt;
                    </kbd>{' '}
                    for users,{' '}
                    <kbd
                      className={classNames(
                        'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                        rawQuery === '?'
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-gray-400 text-gray-900',
                      )}
                    >
                      ?
                    </kbd>{' '}
                    for help, or{' '}
                    <Link
                      to={'/search'}
                      className="mx-1 flex h-5 px-1.5 items-center justify-center rounded border bg-white sm:mx-2 border-primary-600 text-neutral-900"
                      onClick={() => setOpen(false)}
                    >
                      Go to search page
                    </Link>{' '}
                  </div>
                </Combobox> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default SearchModal;
