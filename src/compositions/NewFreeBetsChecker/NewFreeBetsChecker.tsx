import type React from "react";
import { useEffect } from "react";
import { openModal } from "@locmod/modal";
import localStorage from "@locmod/local-storage";
import { useDetailedBetslip } from "@azuro-org/sdk";

const NewFreeBetsChecker: React.FC = () => {
  const { freeBets } = useDetailedBetslip();

  useEffect(() => {
    const showFreeBets = async () => {
      if (freeBets?.length) {
        for (const freeBet of freeBets) {
          const uniqueId = `${freeBet.contractAddress}_${freeBet.id}`;
          const storageName = `bonus-${uniqueId}`;
          const wasShown = localStorage.getItem<boolean>(storageName);

          if (wasShown) {
            continue;
          }

          // Show the modal for the free bet
          await new Promise<void>((resolve) => {
            openModal("NewFreeBetModal", {
              freeBet,
              onClose: () => {
                resolve();
                localStorage.setItem(storageName, true);
              },
            });
          });
        }
      }
    };

    showFreeBets();
  }, [freeBets]);

  return null;
};

export default NewFreeBetsChecker;
