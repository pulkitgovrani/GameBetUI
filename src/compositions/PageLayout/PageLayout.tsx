"use client";

import React from "react";
import { GlobalModalsRegistrar } from "compositions/modals";
import { Content, Footer } from "./components";

const PageLayout: React.CFC = (props) => {
  const { children } = props;

  return (
    <>
      <Content>
        <div className="flex-1 bg-gray-50 text-gray-800 p-4">{children}</div>
        <Footer />
        <GlobalModalsRegistrar />
      </Content>
      <div id="modals" />
    </>
  );
};

export default PageLayout;
