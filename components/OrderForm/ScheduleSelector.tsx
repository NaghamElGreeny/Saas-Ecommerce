"use client";
import React from "react";
import { TimePicker } from "antd"; // لو بتستخدم antd
import type { FormikErrors } from "formik"; // لو بتستخدم Formik
import dayjs from "dayjs";

interface ScheduleSelectorProps {
  values: {
    is_schedule: boolean;
    order_date: string;
    order_time: string;
  };
  errors: FormikErrors<{
    is_schedule: boolean;
    order_date: string;
    order_time: string;
  }>;
  setFieldValue: (field: string, value: boolean | string) => void;
}

export default function ScheduleSelector({
  values,
  errors,
  setFieldValue,
}: ScheduleSelectorProps) {

  const handleTimeChange = (order_time: dayjs.Dayjs | null) => {
    if (order_time) {
      const formatted = order_time.format("h:mm A");
      setFieldValue("order_time", formatted);
    }
  };
  return (
    <div className="mt-5 flex flex-col gap-5 font-semibold">
      {/* Schedule Time */}
      <div>
        <div className="mb-2 flex gap-4 font-medium">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="is_schedule"
              checked={!values.is_schedule}
              onChange={() => setFieldValue("is_schedule", false)}
            />
            Order Now
          </label>
          <label className="flex items-center gap-2 ">
            <input
              type="radio"
              name="is_schedule"
              checked={values.is_schedule}
              onChange={() => setFieldValue("is_schedule", true)}
            />
            Schedule Order
          </label>
        </div>

        <div className="flex gap-4">
          <input
            type="date"
            value={values.order_date}
            onChange={(e) => setFieldValue("order_date", e.target.value)}
            className="!w-1/2 rounded-2xl !border-none p-3 text-gray-600"
            disabled={!values.is_schedule}
          />

          <TimePicker
            use12Hours
            format="h:mm A"
            onChange={handleTimeChange}
            placeholder="Select Time"
            className="order_time-picker w-1/2 !rounded-2xl !border-none !p-3"
            disabled={!values.is_schedule}
          />
        </div>

        <div className="flex w-full">
          <div className="order_dateerror w-1/2">
            {values.is_schedule && errors.order_date && (
              <p className="text-sm text-red-500">{errors.order_date}</p>
            )}
          </div>
          <div className="order_timeerror w-1/2">
            {values.is_schedule && errors.order_time && (
              <p className="text-sm text-red-500">{errors.order_time}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
