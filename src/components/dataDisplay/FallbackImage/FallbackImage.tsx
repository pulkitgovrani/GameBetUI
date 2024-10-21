import React, { useRef, useEffect, useState } from "react";
import cx from "classnames";
import { Icon } from "components/ui";
import type { IconName } from "components/ui";

type FallbackImageProps = {
  className?: string;
  src?: string | null;
  fallback?: string;
  iconFallback?: string;
  alt?: string;
};

const FallbackImage: React.FC<FallbackImageProps> = (props) => {
  const { className, src, fallback, iconFallback, alt } = props;
  const [isFallbackIcon, setFallbackIcon] = useState(!src);

  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleError = () => {
      if (iconFallback) {
        setFallbackIcon(true);
      } else if (ref.current && fallback) {
        ref.current.src = fallback;
      }
    };

    if (!src) {
      handleError();
      return;
    }

    const img = new window.Image();

    img.onerror = () => {
      if (ref.current) {
        handleError();
      }
    };

    img.src = src;
  }, [src]);

  return (
    <div className={cx("flex justify-center items-center", className)}>
      {isFallbackIcon ? (
        <Icon className="text-gray-60" name={iconFallback as IconName} />
      ) : (
        <img
          ref={ref}
          className="rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
          src={src!}
          alt={alt}
        />
      )}
    </div>
  );
};

export default FallbackImage;
