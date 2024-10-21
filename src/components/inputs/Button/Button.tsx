"use client";

import React, { forwardRef } from "react";
import { Message } from "@locmod/intl";
import cx from "classnames";
import { ButtonBase } from "components/inputs";
import type { ButtonBaseProps } from "components/inputs";
import { Icon } from "components/ui";
import type { IconName } from "components/ui";

const iconSizes = {
  32: 4,
  40: 5,
} as const;

export const sizes = [32, 40] as const;
export const styles = ["primary", "secondary", "tertiary"] as const;

export type ButtonSize = (typeof sizes)[number];
export type ButtonStyle = (typeof styles)[number];

export type ButtonProps = ButtonBaseProps &
  OnlyOne<
    {
      children: React.ReactNode | undefined;
      title?: string | Intl.Message;
      leftIcon?: IconName;
      rightIcon?: IconName;
      rightNode?: React.ReactElement;
      size: ButtonSize;
      style?: ButtonStyle;
      html?: boolean;
      dataTestId?: string;
    },
    "children" | "title"
  >;

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      children,
      className,
      title,
      size,
      html,
      style = "primary",
      loading,
      disabled,
      leftIcon,
      rightIcon,
      rightNode,
      ...rest
    } = props;

    // If loading, show spinner as right icon
    const effectiveRightIcon = loading ? "interface/spinner" : rightIcon;

    const rootClassName = cx(
      className,
      "flex items-center justify-center whitespace-nowrap uppercase font-bold transition-all border rounded-sm",
      "text-center align-top cursor-pointer select-none disabled:cursor-not-allowed disabled:transition-none",
      {
        "text-caption-14 h-10 px-4": size === 40,
        "text-caption-13 h-8 px-3": size === 32,
        // Primary Style
        "border-white/20 bg-blue-600 text-white": style === "primary",
        "hover:bg-blue-700": style === "primary",
        "disabled:text-grey-20 disabled:bg-gray-300":
          style === "primary" || style === "secondary",
        // Secondary Style
        "border-white/20 bg-gray-200 text-gray-900": style === "secondary",
        "hover:bg-gray-300": style === "secondary",
        // Tertiary Style
        "border-gray-300 bg-transparent text-gray-600": style === "tertiary",
        "hover:text-blue-500": style === "tertiary",
        "disabled:text-gray-200": style === "tertiary",
      }
    );

    const contentClassName = cx("relative flex items-center justify-between");
    const content = title ? <Message value={title} html={html} /> : children;
    const iconSize = iconSizes[size];

    return (
      <ButtonBase
        ref={ref}
        className={rootClassName}
        loading={loading}
        disabled={disabled || loading}
        {...rest}
      >
        <div className={contentClassName}>
          {leftIcon && (
            <Icon className={cx("mr-2", `size-${iconSize}`)} name={leftIcon} />
          )}
          {content}
          {effectiveRightIcon && (
            <Icon
              className={cx("ml-2", `size-${iconSize}`)}
              name={effectiveRightIcon}
            />
          )}
          {rightNode}
        </div>
      </ButtonBase>
    );
  }
);

export default Button;
