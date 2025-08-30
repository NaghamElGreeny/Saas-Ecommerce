/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Clock } from "lucide-react";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { generateNumbers } from "@/helper/functions";
import { useField } from "formik";

// ================== TimePicker Component ==================
const TimePicker = ({
  value,
  onChange,
  placeholder,
  disabled,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}) => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState({
    hours: "06",
    minutes: "00",
    period: "PM",
  });

  useEffect(() => {
    if (value) {
      const parts = value.split(" ");
      const timePart = parts[0];
      const period = parts[1] || "PM";
      const [hours, minutes] = timePart.split(":");

      setTime({
        hours: hours.padStart(2, "0"),
        minutes: minutes.padStart(2, "0"),
        period: period,
      });
    } else {
      setTime({
        hours: "06",
        minutes: "00",
        period: "PM",
      });
    }
  }, [value]);

  const handleTimeChange = (type: keyof typeof time, val: string) => {
    setTime((prev) => ({ ...prev, [type]: val }));
  };

  const handleConfirm = () => {
    onChange(`${time.hours}:${time.minutes} ${time.period}`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={"time-picker flex cursor-pointer justify-between !px-0 " + className}
          disabled={disabled}
        >
          <span>{value || placeholder || t("LABELS.selectTime")}</span>
          <Clock className="h-4 w-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-bg w-fit rounded-2xl border-0 shadow-xl">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-center text-xl font-semibold text-gray-800">
            {t("LABELS.selectTime")}
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-center gap-1">
          <ScrollableTimeColumn
            items={generateNumbers(1, 12).map((n) =>
              String(n).padStart(2, "0")
            )}
            value={time.hours}
            onChange={(val) => handleTimeChange("hours", val)}
          />
          <div className="px-1 text-2xl font-light text-gray-400">:</div>
          <ScrollableTimeColumn
            items={generateNumbers(0, 59).map((n) =>
              String(n).padStart(2, "0")
            )}
            value={time.minutes}
            onChange={(val) => handleTimeChange("minutes", val)}
          />

          <div className="w-4"></div>
          <ScrollableTimeColumn
            items={["AM", "PM"]}
            value={time.period}
            onChange={(val) => handleTimeChange("period", val)}
          />
        </div>

        <div className="flex justify-end w-full gap-4 px-4">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="!h-10 cursor-pointer"
          >
            {t("LABELS.cancel")}
          </Button>
          <Button
            onClick={handleConfirm}
            className="!h-10 px-6 rounded-xl cursor-pointer"
          >
            {t("LABELS.ok")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ================== Scrollable Column ==================
const ScrollableTimeColumn = ({
  items,
  value,
  onChange,
}: {
  items: string[];
  value: string;
  onChange: (value: string) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemHeight = 40;
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (containerRef.current && !isScrolling) {
      const index = items.findIndex((item) => item === value);
      if (index !== -1) {
        const scrollTop = index * itemHeight;
        containerRef.current.scrollTop = scrollTop;
      }
    }
  }, [value, items, isScrolling]);

  const handleScroll = () => {
    if (containerRef.current) {
      setIsScrolling(true);
      const scrollTop = containerRef.current.scrollTop;
      const index = Math.round(scrollTop / itemHeight);
      const clampedIndex = Math.max(0, Math.min(items.length - 1, index));

      if (items[clampedIndex] !== value) {
        onChange(items[clampedIndex]);
      }

      clearTimeout((containerRef.current as any).scrollTimeout);
      (containerRef.current as any).scrollTimeout = setTimeout(
        () => setIsScrolling(false),
        200
      );
    }
  };

  return (
    <div className="relative h-32 w-20">
      <div
        ref={containerRef}
        className="scrollbar-hide h-full overflow-y-scroll"
        onScroll={handleScroll}
        style={{
          scrollSnapType: "y mandatory",
          paddingTop: `${itemHeight}px`,
          paddingBottom: `${itemHeight}px`,
        }}
      >
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className={cn(
              "relative z-30 flex items-center justify-center transition-all duration-200",
              value === item
                ? "text-lg font-medium text-text"
                : "text-base text-sub"
            )}
            style={{
              height: `${itemHeight}px`,
              scrollSnapAlign: "center",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

// ================== TimePickerField with Formik ==================
function TimePickerField({
  name,
  label,
  className,
  placeholder,
  disabled,
}: {
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}) {
  const [field, meta, helpers] = useField(name);

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <TimePicker
        value={field.value || ""}
        onChange={(val) => helpers.setValue(val)}
        placeholder={placeholder}
        disabled={disabled}
        className={className}
      />
      {meta.touched && meta.error ? (
        <div className="text-sm text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
}

export { TimePicker, TimePickerField };
