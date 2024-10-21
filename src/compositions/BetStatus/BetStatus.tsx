import React, { useMemo } from "react";
import {
  getBetStatus,
  type GraphBetStatus,
  type GameQuery,
  BetStatus as TBetStatus,
} from "@azuro-org/toolkit";
import { Message } from "@locmod/intl";
import cx from "classnames";
import { Icon, LiveDot, type IconName } from "components/ui";
import messages from "./messages";

type Data = Record<
  TBetStatus,
  {
    icon: IconName | React.ReactElement;
    title: Intl.Message;
    color: string;
  }
>;

const statusData: Data = {
  [TBetStatus.Accepted]: {
    icon: "interface/accepted",
    title: messages[TBetStatus.Accepted],
    color: "text-blue-500",
  },
  [TBetStatus.Live]: {
    icon: <LiveDot />,
    title: messages[TBetStatus.Live],
    color: "text-blue-400",
  },
  [TBetStatus.Canceled]: {
    icon: "interface/declined",
    title: messages[TBetStatus.Canceled],
    color: "text-gray-500",
  },
  [TBetStatus.PendingResolution]: {
    icon: "interface/pending",
    title: messages[TBetStatus.PendingResolution],
    color: "text-blue-600",
  },
  [TBetStatus.Resolved]: {
    icon: "interface/win",
    title: messages[TBetStatus.Resolved],
    color: "text-green-500",
  },
};

type BetStatusProps = {
  graphBetStatus: GraphBetStatus;
  games: Pick<GameQuery["games"][0], "status" | "startsAt">[];
  isLiveBet: boolean;
  isWin: boolean | null;
  isLose: boolean | null;
};

const BetStatus: React.FC<BetStatusProps> = ({
  graphBetStatus,
  games,
  isLiveBet,
  isWin,
  isLose,
}) => {
  const betStatus = useMemo(() => {
    return getBetStatus({
      graphStatus: graphBetStatus,
      games,
      isLiveBet,
    });
  }, [graphBetStatus, games, isLiveBet]);

  let { icon, title, color } = statusData[betStatus];

  if (betStatus === TBetStatus.Resolved) {
    icon = isWin ? "interface/win" : "interface/lose";
    title = isWin ? messages.win : messages.lose;
    color = isWin ? "text-green-500" : "text-red-500";
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className={cx("flex items-center", color)}>
        <div className="mr-2">
          {typeof icon === "string" ? (
            <Icon className="size-5" name={icon as IconName} />
          ) : (
            icon
          )}
        </div>
        <div>
          <Message className="text-caption-13 font-medium" value={title} />
        </div>
      </div>
    </div>
  );
};

export default BetStatus;
