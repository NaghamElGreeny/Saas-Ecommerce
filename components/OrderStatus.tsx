"use client";
import { Check, Clock } from "lucide-react";
import clsx from "clsx";

type Status = {
  key: string;
  value: string;
  status: "done" | "in_progress" | "pending";
};

interface OrderStatusStepperProps {
  statusList: Status[];
}

export default function OrderStatusStepper({
  statusList,
}: OrderStatusStepperProps) {
  return (
 <div className="relative flex items-center justify-between px-4 pt-8">
    
     

      {statusList.map((step, index) => {
        const isDone = step.status === "done"||"completed";
        const isInProgress = step.status === "in_progress";

        return (
          <div key={index} className="relative z-10 flex flex-col items-center w-full">
            {/* خط ملون بين النقط */}
            {index !== statusList.length - 1 && (
              <div
                className={clsx(
                  "absolute top-5 left-[62%] h-0.5 z-10",
                  (statusList[index + 1].status === "done" ||
                    statusList[index + 1].status === "in_progress")
                    ? "bg-primary"
                    : "bg-gray-300"
                )}
                style={{
                  width: "75%",
                  transform: "translateX(0%)",
                }}
              />
            )}

            {/* دائرة الحالة */}
            <div
              className={clsx(
                "h-9 w-9 rounded-full flex items-center justify-center border-2",
                isDone
                  ? "bg-primary text-white border-primary"
                  : isInProgress
                  ? "bg-white text-primary border-primary"
                  : "bg-white text-gray-400 border-gray-300"
              )}
            >
              {isDone ? <Check size={20} /> : <Clock size={20} />}
            </div>

            {/* اسم الحالة */}
            <span
              className={clsx(
                "mt-2 text-xs font-medium text-center",
                isDone || isInProgress ? "text-primary" : "text-gray-400"
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
