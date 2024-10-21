import React from "react";
import { Logo } from "components/ui";
import Navbar from "./components/Navbar/Navbar";
import Copy from "./components/Copy/Copy";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white p-6 shadow-md">
      <div className="flex flex-col items-center justify-between md:flex-row md:items-center mb-4 border-b border-gray-200 pb-4">
        <Logo className="h-6 mb-4 md:mb-0" />
        <Navbar />
      </div>
      <div className="mt-3 text-center">
        <Copy />
      </div>
    </footer>
  );
};

export default Footer;
