import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IoMdClose } from 'react-icons/io';

const GlobalModal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full ${sizeClasses[size]} transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all`}
              >
                {/* ✅ رأس النافذة */}
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-800 dark:text-gray-100"
                  >
                    {title}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 transition"
                  >
                    <IoMdClose className="w-6 h-6" />
                  </button>
                </div>

                {/* ✅ محتوى النافذة */}
                <div>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default GlobalModal;
