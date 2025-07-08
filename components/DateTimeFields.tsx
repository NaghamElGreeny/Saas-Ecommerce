/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage } from "formik";
import dayjs from "dayjs";
import { TimePicker } from "antd";
import { useTranslations } from "next-intl";

type Props = {
  values: any;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
};

export default function DateTimeFields({ values, setFieldValue }: Props) {
  const t = useTranslations("RESERVATION_FORM");

  return (
    <div className="grid gap-4">
      {/* Date Field */}
      <div>
        <input
          type="date"
          name="date"
          className="reserve w-full rounded-xl border p-3"
          min={new Date().toISOString().split("T")[0]}
          value={values.date}
          onChange={(e) => setFieldValue("date", e.target.value)}
        />
        <ErrorMessage name="date" component="div" className="text-sm text-red-500" />
      </div>

      {/* Time From / To */}
      <div className="flex flex-col gap-4 md:flex-row">
        <TimePicker
          className="md:w-1/2"
          use12Hours
          format="h:mm A"
          onChange={(time) => setFieldValue("timeFrom", time ? time.format("h:mm A") : "")}
          placeholder={t("from_time_placeholder")}
          value={values.timeFrom ? dayjs(values.timeFrom, "h:mm A") : null}
        />
        <TimePicker
          className="md:w-1/2"
          use12Hours
          format="h:mm A"
          onChange={(time) => setFieldValue("timeTo", time ? time.format("h:mm A") : "")}
          placeholder={t("to_time_placeholder")}
          value={values.timeTo ? dayjs(values.timeTo, "h:mm A") : null}
        />
      </div>

      <ErrorMessage name="timeFrom" component="div" className="text-sm text-red-500" />
      <ErrorMessage name="timeTo" component="div" className="text-sm text-red-500" />
    </div>
  );
}
