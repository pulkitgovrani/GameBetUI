import React from "react";
import cx from "classnames";
import { FallbackImage } from "components/dataDisplay";
import countryMap from "./utils/countryMaps";

const fallbackIcon = "interface/no_flag";

type FlagProps = {
  className?: string;
  country: string;
};

const Flag: React.FC<FlagProps> = ({ className, country }) => {
  const countryCode = country ? countryMap[country.toLowerCase()] : null;
  let src;
  let fallbackSrc;

  if (countryCode) {
    src = `https://content.bookmaker.xyz/countries/rc_${country
      .toLowerCase()
      .replace(/\s/g, "_")}.png`;
    fallbackSrc = `https://flagicons.lipis.dev/flags/4x3/${countryCode}.svg`;
  }

  return (
    <div className={cx("flex items-center justify-center", className)}>
      <FallbackImage
        className={cx(
          "w-6 h-6 rounded-md border border-blue-300 shadow-sm",
          className
        )}
        src={src}
        fallback={fallbackSrc}
        iconFallback={countryCode || fallbackIcon}
        alt={`${country} flag`}
      />
    </div>
  );
};

export default Flag;
