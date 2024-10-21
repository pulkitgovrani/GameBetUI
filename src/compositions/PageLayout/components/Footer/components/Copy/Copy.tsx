import React from "react";
import { constants } from "helpers";

const currentYear = new Date().getFullYear();

const Copy: React.FC = () => {
  return (
    <div className="text-blue-800 text-center py-4 bg-white shadow-md">
      <p className="text-caption-12 text-gray-600">{`© ${currentYear} ${constants.companyName}`}</p>
    </div>
  );
};

export default Copy;
