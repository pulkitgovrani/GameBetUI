"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { openModal } from "@locmod/modal";
import { useAccount } from "wagmi";
import { useFreezeBodyScroll } from "hooks";

import { Icon, Logo } from "components/ui";
import { Button, buttonMessages } from "components/inputs";
import Navigation from "compositions/Navigation/Navigation";
import LiveSwitcher from "compositions/LiveSwitcher/LiveSwitcher";
import Controls from "../Controls/Controls";

const Content: React.FC = () => {
  useFreezeBodyScroll();

  return (
    <div className="fixed top-14 bottom-0 left-0 w-[22.5rem] md:w-full bg-white shadow-md overflow-auto no-scrollbar">
      <LiveSwitcher />
      <Navigation className="mt-2" />
    </div>
  );
};

const Header: React.FC = () => {
  const { address } = useAccount();
  const pathname = usePathname();
  const [isVisible, setVisibility] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setVisibility((v) => !v);
  };

  useEffect(() => {
    if (isVisible) {
      const handleOutsideClick = (event: MouseEvent) => {
        const composedPath = event.composedPath();
        if (!composedPath.includes(containerRef.current!)) {
          setVisibility(false);
        }
      };

      document.addEventListener("click", handleOutsideClick, { capture: true });

      return () => {
        document.removeEventListener("click", handleOutsideClick, {
          capture: true,
        });
      };
    }
  }, [isVisible]);

  useEffect(() => {
    setVisibility(false);
  }, [pathname]);

  return (
    <div ref={containerRef} className="py-2 px-5 bg-blue-800 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div onClick={handleClick}>
            <Icon
              className="text-white h-6 w-6 mr-3 cursor-pointer"
              name={isVisible ? "interface/close" : "interface/burger_menu"}
            />
          </div>
          <Logo className="h-4" />
        </div>
        {Boolean(address) ? (
          <Controls />
        ) : (
          <Button
            className="ml-auto"
            title={buttonMessages.connectWallet}
            size={32}
            onClick={() => openModal("ConnectModal")}
          />
        )}
      </div>
      {isVisible && <Content />}
    </div>
  );
};

export default Header;
