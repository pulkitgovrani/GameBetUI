"use client";

import React from "react";
import cx from "classnames";

import { Media } from "components/layout";
import MobileBetslipButton from "compositions/MobileBetslipButton/MobileBetslipButton";
import { LeftSidebar, RightSidebar, Header } from "./components";

import ns from "./Narrow.module.scss";
import ws from "./Wide.module.scss";

const Content: React.CFC = ({ children }) => {
  const rootClassName = cx(
    "h-full flex flex-col wd:flex-row min-h-screen mx-auto wd:px-2 wd:pb-2",
    ws.root
  );
  const mainClassName = cx(
    ns.main,
    ws.main,
    "mx-auto flex-1 w-full wd:h-auto",
    {
      [ws.withRightSidebar]: true,
    }
  );
  const sidebarClassName = "sticky top-0 z-[100] shrink-0 no-scrollbar";

  return (
    <div className={rootClassName}>
      {/* Left Sidebar */}
      <Media
        className={cx(
          "h-screen bg-blue-800 text-white",
          ws.leftSidebar,
          sidebarClassName,
          "pr-2 overflow-auto"
        )}
        wide
      >
        <LeftSidebar />
      </Media>

      {/* Mobile Header */}
      <Media
        className="sticky top-0 z-[100] bg-blue-800 text-white"
        narrow
        mobile
      >
        <Header />
      </Media>

      {/* Main Content Area */}
      <main className={mainClassName}>
        {/* Optional Search Block */}
        <Media className="h-16 bg-blue-600" wide />
        <div className="flex flex-col bg-white border border-blue-300 rounded-lg px-2 min-h-[calc(100vh_-_4.5rem)]">
          {children}
        </div>
      </main>

      {/* Right Sidebar */}
      <Media
        className={cx(
          "h-[calc(100vh_-_0.5rem)] bg-blue-800 text-white",
          ws.rightSidebar,
          sidebarClassName
        )}
        wide
      >
        <RightSidebar />
      </Media>

      {/* Mobile Betslip Button */}
      <Media narrow mobile>
        <MobileBetslipButton />
      </Media>
    </div>
  );
};

export default Content;
