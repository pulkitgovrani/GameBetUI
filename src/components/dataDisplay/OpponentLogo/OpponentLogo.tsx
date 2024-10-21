import React from "react";
import cx from "classnames";
import { FallbackImage } from "components/dataDisplay";

const sizes = [28, 48] as const;

export type LogoSize = (typeof sizes)[number];
export type OpponentLogoBgColor = "grey-20" | "white";

const fallback = "interface/no_opponent";

type OpponentLogoProps = {
  className?: string;
  image?: string | null;
  size?: LogoSize;
  bgColor?: OpponentLogoBgColor;
};

const OpponentLogo: React.FC<OpponentLogoProps> = ({
  className,
  image,
  size = 28,
  bgColor = "grey-20",
}) => {
  const rootClassName = cx(
    "flex items-center justify-center flex-none rounded-full border-2 border-blue-200", // Added border for distinction
    `bg-${bgColor}`,
    className,
    {
      "size-7 p-1": size === 28,
      "size-12 p-2": size === 48,
    }
  );

  return (
    <div className={rootClassName}>
      <FallbackImage
        className="z-10 w-full h-full rounded-full" // Ensured the logo takes full size with rounded corners
        src={image}
        iconFallback={fallback}
        alt="Opponent Logo" // Added alt text for accessibility
      />
    </div>
  );
};

export default OpponentLogo;
