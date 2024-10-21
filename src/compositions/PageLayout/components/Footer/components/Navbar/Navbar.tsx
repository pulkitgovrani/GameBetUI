import React from "react";
import { Message } from "@locmod/intl";
import { constants } from "helpers";

import messages from "./messages";

const items = [
  {
    text: messages.nav.docs,
    link: constants.links.docs,
  },
  {
    text: messages.nav.terms,
    link: constants.links.terms,
  },
  {
    text: messages.nav.policy,
    link: constants.links.policy,
  },
  {
    text: messages.nav.faq,
    link: constants.links.faq,
  },
];

const Navbar: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-6 py-4 bg-blue-50 shadow-md">
      {items.map((item, index) => (
        <a
          key={`${item.link}-${index}`}
          href={item.link}
          rel="noreferrer"
          target="_blank"
          className="text-blue-700 font-medium hover:text-blue-900 transition duration-200"
        >
          <Message className="text-caption-13" value={item.text} />
        </a>
      ))}
    </div>
  );
};

export default Navbar;
