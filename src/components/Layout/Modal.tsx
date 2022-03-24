import { useRef, Fragment, PropsWithChildren } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'

import { CloseIcon } from './Icons'

type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  image?: string
  preventCloseOnClickOutside?: boolean
  className?: string
}

const Modal = ({
  children,
  open,
  onClose,
  title,
  image,
  preventCloseOnClickOutside,
  className,
}: PropsWithChildren<ModalProps>) => {
  const closeRef = useRef<HTMLDivElement>(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-50 inset-0 overflow-y-auto"
        initialFocus={closeRef}
        open={open}
        onClose={preventCloseOnClickOutside ? () => {} : onClose}
      >
        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block align-middle h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={clsx(
                'inline-block align-middle overflow-hidden text-left max-w-3xl m-6 xs:m-4 bg-white shadow-xl transform transition-all relative breakWord',
                className
              )}
            >
              <div
                className="absolute top-2.5 right-2.5 text-dark-blue cursor-pointer"
                ref={closeRef}
                onClick={onClose}
              >
                <CloseIcon className="w-6 h-6" />
              </div>
              {image && <img src={`/${image}`} alt="" className="mx-auto mt-8" />}
              <Dialog.Title
                as="h3"
                className="px-8 pt-8 pb-0 text-3xl sm:text-2xl sm:text-center font-bold text-dark-blue"
              >
                {title}
              </Dialog.Title>
              <div className="p-8">{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal
