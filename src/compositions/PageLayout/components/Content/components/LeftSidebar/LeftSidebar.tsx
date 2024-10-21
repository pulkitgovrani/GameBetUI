"use client";

import React from "react";
import { Logo } from "components/ui";
import Navigation from "compositions/Navigation/Navigation";
import LiveSwitcher from "compositions/LiveSwitcher/LiveSwitcher";

const LeftSidebar: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-5 sticky top-0 bg-blue-100">
        <Logo className="h-6" />
      </div>
      <div className="overflow-auto flex-grow no-scrollbar">
        <LiveSwitcher />
        <Navigation className="mt-2" />
      </div>
    </div>
  );
};

export default LeftSidebar;
