"use client";
import React, { useRef, useState } from "react";
import {
  useFloating,
  useInteractions,
  useHover,
  useClick,
  useDismiss,
  offset,
  shift,
  arrow,
  flip,
  autoUpdate,
  safePolygon,
} from "@floating-ui/react-dom-interactions";
import type { Placement } from "@floating-ui/react-dom-interactions";
import { Message } from "@locmod/intl";
import cx from "classnames";
import { useMedia, useDevice } from "contexts";
import { Icon } from "components/ui";

type TooltipProps = {
  children: React.ReactElement;
  title?: string | Intl.Message;
  text?: string | Intl.Message;
  content?: React.ReactElement;
  width?: number; // sets specific tooltip width (use only for small text content)
  placement?: Placement;
  mobPlacement?: Placement;
  isInteractive?: boolean; // prevents tooltip from closing to allow user interaction with the content
};

const Tooltip: React.FC<TooltipProps> = ({
  children,
  title,
  text,
  content,
  width,
  placement: defaultPlacement = "bottom",
  mobPlacement,
  isInteractive,
}) => {
  const { isMobileDevice } = useDevice();
  const { isMobileView } = useMedia();
  const [isVisible, setVisibility] = useState(false);
  const arrowRef = useRef<HTMLDivElement | null>(null);

  // Determine mobile placement
  if (mobPlacement && isMobileView) {
    defaultPlacement = mobPlacement;
  }

  // Cross-axis offset calculation
  const crossAxis = ["top-start", "bottom-start"].includes(defaultPlacement)
    ? -12
    : ["top-end", "bottom-end"].includes(defaultPlacement)
    ? 12
    : 0;

  const {
    x,
    y,
    reference,
    floating,
    placement,
    strategy,
    context,
    middlewareData,
  } = useFloating({
    open: isVisible,
    onOpenChange: setVisibility,
    placement: defaultPlacement,
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({ mainAxis: 10, crossAxis }),
      shift({ padding: 10 }),
      arrow({ element: arrowRef }),
      flip(),
    ],
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      restMs: 10,
      handleClose: isInteractive ? safePolygon({ restMs: 10 }) : null,
      enabled: !isMobileDevice,
    }),
    useClick(context, { enabled: isMobileDevice }),
    useDismiss(context),
  ]);

  // Tooltip and arrow styles
  const tooltipClassNames = cx(
    "z-50 w-fit p-3 bg-white rounded-md text-gray-700 border border-gray-300",
    "-sm:max-w-[95vw] sm:max-w-[20rem]"
  );
  const arrowClassNames = cx("absolute w-4 h-2 bg-white", {
    "top-[99%]": placement.startsWith("top"),
    "bottom-[99%] rotate-180": placement.startsWith("bottom"),
  });

  const floatingProps = getFloatingProps({
    ref: floating,
    className: tooltipClassNames,
    style: {
      position: strategy,
      top: y ?? 0,
      left: x ?? 0,
      width,
    },
  });

  const referenceProps = getReferenceProps({
    ref: reference,
    ...children.props,
  });

  // Arrow position
  const { arrow: { x: arrowX } = {} } = middlewareData;
  const arrowStyle = { left: arrowX };

  return (
    <>
      {isVisible && (
        <div ref={floating} {...floatingProps}>
          <div ref={arrowRef} className={arrowClassNames} style={arrowStyle}>
            <Icon className="w-4 h-2" name="interface/arrow_tooltip" />
          </div>
          {title && (
            <Message className="mb-2 font-semibold" value={title} html />
          )}
          {text && (
            <Message
              value={text}
              className="text-body-14-p font-medium whitespace-normal"
              html
            />
          )}
          {content}
        </div>
      )}
      {React.cloneElement(children, referenceProps)}
    </>
  );
};

export default React.memo(Tooltip);
