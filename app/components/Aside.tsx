import {
  createContext,
  Fragment,
  type ReactNode,
  useContext,
  useState,
} from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import {IconClose} from './Icon';

/**
 * Drawer component that opens on user click.
 * @param heading - string. Shown at the top of the drawer.
 * @param open - boolean state. if true opens the drawer.
 * @param onClose - function should set the open state.
 * @param openFrom - right, left
 * @param children - react children node.
 */
export function Aside({
  heading,
  // open,
  // onClose,
  openFrom = 'right',
  children,
  renderHeading,
  type,
}: {
  heading?: string;
  // open: boolean;
  // onClose: () => void;
  openFrom: 'right' | 'left';
  children: React.ReactNode;
  renderHeading?: () => React.ReactNode;
  type: AsideType;
}) {
  const offScreen = {
    right: 'translate-x-full',
    left: '-translate-x-full',
  };

  const {type: activeType, close} = useAside();
  const open = type === activeType;

  const onClose = close;

  const isHeading = !!heading || renderHeading;

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 left-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={`fixed inset-y-0 flex max-w-full ${
                openFrom === 'right' ? 'right-0' : ''
              }`}
            >
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom={offScreen[openFrom]}
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo={offScreen[openFrom]}
              >
                <DialogPanel className="w-screen max-w-lg text-left align-middle transition-all transform shadow-xl h-screen bg-white overflow-hidden">
                  <div className="flex flex-col h-full px-5 md:px-8">
                    <header
                      className={`flex-shrink-0 flex items-center h-16 md:h-20 border-b border-slate-100 ${
                        isHeading ? 'justify-between' : 'justify-end'
                      }`}
                    >
                      {isHeading && (
                        <DialogTitle>
                          {!!heading && (
                            <span
                              className="text-xl font-semibold"
                              id="cart-contents"
                            >
                              {heading}
                            </span>
                          )}
                          {renderHeading && renderHeading()}
                        </DialogTitle>
                      )}

                      <button
                        type="button"
                        className="p-4 -m-4 transition text-primary hover:text-primary/50"
                        onClick={onClose}
                        data-test="close-cart"
                      >
                        <IconClose aria-label="Close panel" />
                      </button>
                    </header>
                    <div className="flex-1 overflow-hidden">{children}</div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

/* Use for associating arialabelledby with the title*/
Aside.Title = DialogTitle;

export function useDrawer(openDefault = false) {
  const [isOpen, setIsOpen] = useState(openDefault);

  function openDrawer() {
    setIsOpen(true);
  }

  function closeDrawer() {
    setIsOpen(false);
  }

  return {
    isOpen,
    openDrawer,
    closeDrawer,
  };
}

type AsideType = 'search' | 'cart' | 'mobile' | 'closed';
type AsideContextValue = {
  type: AsideType;
  open: (mode: AsideType) => void;
  close: () => void;
};
//
const AsideContext = createContext<AsideContextValue | null>(null);

Aside.Provider = function AsideProvider({children}: {children: ReactNode}) {
  const [type, setType] = useState<AsideType>('closed');

  return (
    <AsideContext.Provider
      value={{
        type,
        open: setType,
        close: () => setType('closed'),
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};

export function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error('useAside must be used within an AsideProvider');
  }
  return aside;
}
