"use client";
import React, { useEffect, useState } from "react";
import { ConnectorName, getIconByName } from "wallet";
import { Icon } from "components/ui";

type WalletIconProps = {
  className?: string;
  providedImageSrc?: string;
  name?: string; // Made optional to handle undefined cases
};

const WalletIcon: React.FC<WalletIconProps> = ({
  className,
  providedImageSrc,
  name,
}) => {
  const [fetchedIcon, setIcon] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true); // Loading state for better UX

  // Determine the initial icon based on the wallet name
  let icon: React.ReactElement | null = null;

  if (name === ConnectorName.Injected || name === "MetaMask") {
    icon = (
      <Icon className={`text-blue-600 ${className}`} name="wallets/metamask" />
    );
  } else if (name === ConnectorName.WalletConnect) {
    icon = (
      <Icon
        className={`text-blue-600 ${className}`}
        name="wallets/walletconnect"
      />
    );
  } else if (providedImageSrc) {
    icon = (
      <img
        className={`rounded-full ${className}`}
        src={providedImageSrc}
        alt={`${name} Wallet Icon`}
      />
    );
  }

  // Attempt to get the icon from an external source if not defined
  const getIcon = icon
    ? null
    : getIconByName[name as keyof typeof getIconByName];

  useEffect(() => {
    if (typeof getIcon === "function") {
      (async () => {
        try {
          setLoading(true); // Start loading
          const icon = await getIcon();
          setIcon(icon);
        } catch (error) {
          console.error("Error fetching wallet icon:", error);
        } finally {
          setLoading(false); // End loading
        }
      })();
    }
  }, [getIcon]);

  // Show a loading state or fallback if no icon is available
  if (isLoading) {
    return <div className={`spinner ${className}`} />; // Optional loading spinner
  }

  if (fetchedIcon) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: fetchedIcon }}
      />
    );
  }

  // Fallback if no icon is available
  return icon;
};

export default WalletIcon;
