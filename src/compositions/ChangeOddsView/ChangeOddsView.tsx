"use client";

import React from "react";
import cx from "classnames";
import { Menu } from "@headlessui/react";
import { Message } from "@locmod/intl";
import { Dropdown } from "components/inputs";
import { Icon } from "components/ui";
import { useOddsView, oddsViews, type OddsView } from "contexts";

const Content: React.FC = () => {
  const { oddsView, setOddsView } = useOddsView();

  return (
    <div className="bg-white shadow-md rounded-md border border-gray-200 p-2 w-52">
      {Object.keys(oddsViews).map((value) => {
        const title = oddsViews[value];
        const isActive = value === oddsView;

        const oddClassName = cx(
          "py-2 px-3 rounded-md cursor-pointer w-full text-left",
          {
            "text-gray-900 bg-blue-100": isActive,
            "text-gray-600 hover:bg-blue-50 hover:text-gray-900": !isActive,
          }
        );

        return (
          <Menu.Item key={value}>
            <button
              className={oddClassName}
              onClick={() => setOddsView(value as OddsView)}
            >
              <Message className="text-caption-13 font-medium" value={title} />
            </button>
          </Menu.Item>
        );
      })}
    </div>
  );
};

const ChangeOddsView: React.FC = () => {
  return (
    <Dropdown
      buttonClassName="h-5"
      content={<Content />}
      placement="bottomRight"
    >
      <div>
        <Icon
          className="size-5 text-gray-600 hover:text-gray-900"
          name="interface/settings"
        />
      </div>
    </Dropdown>
  );
};

export default ChangeOddsView;
