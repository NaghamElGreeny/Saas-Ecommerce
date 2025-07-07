"use client";

import clsx from "clsx";
import Image from "next/image";

type StatusType = "done" | "in_progress" | "pending";

type Status = {
  key: string;
  value: string;
  status: StatusType;
  icon: string;
};

interface OrderStatusStepperProps {
  orderType: "delivery" | "pickup";
  statusList: Status[];
}

export default function OrderStatusStepper({
  orderType,
  statusList,
}: OrderStatusStepperProps) {
  const displayedSteps =
    orderType === "delivery" ? statusList : statusList.slice(0, 3);

  return (
    <div className="relative flex items-center justify-between px-6 pt-8">
      {displayedSteps.map((step, index) => {
        const isDone = step.status === "done";
        const isInProgress = step.status === "in_progress";

        return (
          <div
            key={step.key}
            className="relative z-10 flex w-full flex-col items-center"
          >
            {/* lines */}
            {index !== statusList.length - 1 && (
              <div
                className={clsx(
                  "absolute top-5 left-[62%] rtl:right-[62%] z-10 h-0.5",
                  statusList[index + 1].status === "done" ||
                    statusList[index + 1].status === "in_progress"
                    ? "bg-primary"
                    : "bg-gray-300",
                )}
                style={{
                  width: "75%",
                  transform: "translateX(0%)",
                }}
              />
            )}

            {/* icon */}
            <div
              className={clsx(
                "flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white",
                isDone
                  ? "border-primary"
                  : isInProgress
                    ? "border-primary"
                    : "border-gray-300",
              )}
            >
              <Image
                src={step.icon}
                alt={step.value}
                width={24}
                height={24}
                className={clsx(
                  isDone || isInProgress ? "opacity-100" : "opacity-50",
                )}
              />
            </div>

            {/* status name */}
            <span
              className={clsx(
                "mt-2 text-center text-xs font-medium",
                isDone || isInProgress
                  ? "text-text-website-font"
                  : "text-gray-400",
              )}
            >
              {step.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}
