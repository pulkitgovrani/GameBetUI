"use client";
import { useCallback, useEffect, type MouseEventHandler } from "react";
import { createPortal } from "react-dom";
import { useFreezeBodyScroll } from "hooks";
import cx from "classnames";

import { Overlay } from "components/layout";
import { Icon } from "components/ui";

import s from "./PlainModal.module.scss";

export type PlainModalProps = {
  className?: string;
  contentClassName?: string;
  containerClassName?: string;
  overlayClosable?: boolean;
  withCloseButton?: boolean;
  closeModal: (withOnClose?: boolean) => void;
};

const PlainModal: React.CFC<PlainModalProps> = ({
  children,
  className,
  contentClassName,
  containerClassName,
  overlayClosable = true,
  withCloseButton = true,
  closeModal,
}) => {
  useFreezeBodyScroll();

  const handleOverlayClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (overlayClosable) {
        closeModal(true);
      }
      event.stopPropagation();
    },
    [overlayClosable, closeModal]
  );

  const handleCloseButtonClick = useCallback(() => {
    closeModal(true);
  }, [closeModal]);

  const handleModalClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.stopPropagation();
    },
    []
  );

  const rootClassName = cx(
    s.container,
    containerClassName,
    "flex w-full mb:absolute mb:left-0 mb:flex-col mb:justify-end mb:h-full ds:items-center ds:justify-center ds:min-h-full m-auto"
  );

  const modalClassName = cx(
    className,
    "relative bg-white shadow-lg border border-gray-200 w-full font-medium flex flex-col",
    "mb:max-h-full rounded-lg ds:max-w-md ds:rounded-md"
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        closeModal(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <div className={rootClassName}>
        <div
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          className={modalClassName}
          onClick={handleModalClick}
        >
          {withCloseButton && (
            <button
              className="absolute top-4 right-4 p-2 z-40 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-600 hover:text-gray-800"
              onClick={handleCloseButtonClick}
              aria-label="Close modal"
            >
              <Icon className="size-4" name="interface/close" />
            </button>
          )}
          <div
            className={cx(contentClassName, "py-6 px-4 flex-1 overflow-y-auto")}
          >
            {children}
          </div>
        </div>
      </div>
    </Overlay>,
    document.getElementById("modals")!
  );
};

export default PlainModal;
