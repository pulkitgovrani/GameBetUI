"use client";

import React, { useMemo } from "react";
import { useOddsView } from "contexts";
import cx from "classnames";

type OddsValueProps = {
  className?: string;
  odds: string | number;
};

const OddsValue: React.FC<OddsValueProps> = ({ className, odds }) => {
  const { oddsView, formatViewValue } = useOddsView();

  const formattedValue = useMemo(() => {
    if (!odds) {
      return "--";
    }
    return formatViewValue(odds);
  }, [oddsView, odds]);

  const containerClassName = cx("p-2 rounded-md border", className, {
    "border-blue-500 bg-white text-blue-800": odds,
    "border-gray-300 bg-gray-100 text-gray-500": !odds,
  });

  return <div className={containerClassName}>{formattedValue}</div>;
};

export default OddsValue;
