"use client";

import {  useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { TimePicker } from "antd";
import { ChevronDown } from "lucide-react";

import { locationService } from "@/services/ClientApiHandler";
import { useCountryCodesStore } from "@/stores/countryCodesStore";
import { useStore } from "@/stores/useStore";
import GlobalDialog from "@/components/shared/GlobalDialog";
import { ReservationPayload } from "@/utils/types";

export default function ReservationForm({ show, className }: { show: boolean; className?: string }) {
  const t = useTranslations("RESERVATION_FORM");
  const router = useRouter();

  const countryCodes = useCountryCodesStore((state) => state.countryCodes);
  const stores = useStore((state) => state.stores);
  const [branchDialogOpen, setBranchDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required(t("name_required")).min(2, t("name_min_chars")),
    phone_code: Yup.string().required(t("country_code_required")),
    phone: Yup.string()
      .required(t("phone_required"))
      .matches(/^\d+$/, t("phone_digits_only"))
      .test("phone-length-min", t("phone_too_short"), function (value) {
        const country = countryCodes.find((c) => c.phone_code === this.parent.phone_code);
        return value ? value.length >= (country?.min_digits || 5) : false;
      })
      .test("phone-length-max", t("phone_too_long"), function (value) {
        const country = countryCodes.find((c) => c.phone_code === this.parent.phone_code);
        return value ? value.length <= (country?.phone_limit || 15) : false;
      }),
    store_id: Yup.string().required(t("select_branch_required")),
    date: Yup.date().required(t("date_required")).min(new Date(), t("date_past_error")),
    timeFrom: Yup.string()
      .required(t("time_from_required"))
      .test("is-before-timeTo", t("time_from_before_to"), function (value) {
        return !value || !this.parent.timeTo || value < this.parent.timeTo;
      }),
    timeTo: Yup.string()
      .required(t("time_to_required"))
      .test("is-after-timeFrom", t("time_to_after_from"), function (value) {
        return !value || !this.parent.timeFrom || value > this.parent.timeFrom;
      }),
    guest_number: Yup.number()
      .required(t("guests_required"))
      .min(1, t("guests_min"))
      .max(20, t("guests_max"))
      .typeError(t("guests_invalid_number")),
  });

  const formatTime = (time: string) => {
    const parsedTime = dayjs(time, "hh:mm A");
    return parsedTime.isValid() ? parsedTime.format("hh:mm A") : time;
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    toast.dismiss();

    const payload: ReservationPayload = {
      name: values.name,
      date: values.date,
      store_id: parseInt(values.store_id, 10),
      phone_code: values.phone_code,
      phone: values.phone,
      from_time: formatTime(values.timeFrom),
      to_time: formatTime(values.timeTo),
      guests_number: Number(values.guest_number),
    };

    try {
      await locationService.makeReservation(payload);
      toast.success(t("reservation_successful"));
      router.push("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || t("reservation_failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={className}>
      {show && (
        <>
          <div className="mb-4 flex items-center">
            <p className="text-text-website-font mx-2 uppercase" data-aos="fade-up">
              {t("make_an_reserve")}
            </p>
            <div className="line border-primary h-0 w-[200px] border-b" data-aos="fade-up" />
          </div>
          <h1
            className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl ltr:text-left rtl:text-right"
            data-aos="fade-up"
          >
            {t("online_reservation")}
          </h1>
        </>
      )}

      <div
        className="w-full rounded-[20px] bg-white/70 bg-[url('/assets/images/reservation.png')] p-8 shadow-xl backdrop-blur-md md:p-12"
        {...(show ? { "data-aos": "fade-up" } : {})}
      >
        <h3 className="font-allura mb-2 text-center text-5xl text-black md:text-4xl">
          {t("reservations")}
        </h3>
        <h1 className="mb-8 text-center text-5xl font-bold text-black md:text-4xl">
          {t("book_a_table")}
        </h1>

        <Formik
          enableReinitialize
          initialValues={{
            name: "",
            phone: "",
            phone_code: countryCodes[0]?.phone_code || "",
            store_id: stores[0]?.id?.toString() || "",
            date: "",
            timeFrom: "",
            timeTo: "",
            guest_number: 1,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, handleBlur, isSubmitting }) => (
            <Form className="reserve-form grid gap-5">
              <Field
                name="name"
                placeholder={t("name_placeholder")}
                className="reserve w-full p-3"
              />
              <ErrorMessage name="name" component="div" className="text-sm text-red-500" />

              <div className="phone-inputs flex gap-1">
                <div className="relative w-26">
                  <select
                    name="phone_code"
                    value={values.phone_code}
                    onChange={(e) => {
                      const code = e.target.value;
                      setFieldValue("phone_code", code);
                    }}
                    onBlur={handleBlur}
                    className="w-full appearance-none rounded-xl border p-3"
                  >
                    {countryCodes.map((country) => (
                      <option key={country.id} value={country.phone_code}>
                        +{country.phone_code}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500">
                    <ChevronDown size={18} />
                  </div>
                </div>

                <Field
                  name="phone"
                  type="tel"
                  placeholder={t("phone_placeholder")}
                  className="w-full rounded-md border p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <ErrorMessage name="phone" component="div" className="text-sm text-red-500" />

              <div className="flex flex-col gap-4 md:flex-row">
                <Field as="select" name="guest_number" className="reserve w-1/2 p-3">
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? t("person") : t("people")}
                    </option>
                  ))}
                </Field>

                <button
                  type="button"
                  className="reserve w-full p-3 text-left"
                  onClick={() => setBranchDialogOpen(true)}
                >
                  {values.store_id
                    ? stores.find((s) => s.id.toString() === values.store_id)?.name
                    : t("select_branch")}
                </button>
              </div>
              <ErrorMessage name="guest_number" component="div" className="text-sm text-red-500" />

              <GlobalDialog
                open={branchDialogOpen}
                onOpenChange={setBranchDialogOpen}
                title={t("branches_address")}
                height="h-[300px]"
              >
                <p className="mb-2">{t("select_your_location")}</p>
                <div className="max-h-60 space-y-2 overflow-y-auto">
                  {stores.map((store) => (
                    <label
                      key={store.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                        values.store_id === store.id.toString()
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="store_id"
                        value={store.id.toString()}
                        checked={values.store_id === store.id.toString()}
                        onChange={() => setFieldValue("store_id", store.id.toString())}
                        className="mt-1"
                      />
                      <div>
                        <h3 className="font-medium">{store.name}</h3>
                        <p className="mt-1 text-sm text-gray-600">{store.location_description}</p>
                      </div>
                    </label>
                  ))}
                  <ErrorMessage name="store_id" component="div" className="text-sm text-red-500" />
                </div>
                <button
                  type="button"
                  onClick={() =>
                    values.store_id
                      ? setBranchDialogOpen(false)
                      : toast.error(t("please_select_a_branch_toast"))
                  }
                  className="rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 mt-3 w-1/2"
                >
                  {t("confirm")}
                </button>
              </GlobalDialog>

              <div className="flex w-full flex-col gap-4 md:flex-row">
                <TimePicker
                  className="time-picker md:w-1/2"
                  use12Hours
                  format="h:mm A"
                  onChange={(time) =>
                    setFieldValue("timeFrom", time ? time.format("h:mm A") : "")
                  }
                  placeholder={t("from_time_placeholder")}
                  value={values.timeFrom ? dayjs(values.timeFrom, "h:mm A") : null}
                />
                <TimePicker
                  className="time-picker md:w-1/2"
                  use12Hours
                  format="h:mm A"
                  onChange={(time) =>
                    setFieldValue("timeTo", time ? time.format("h:mm A") : "")
                  }
                  placeholder={t("to_time_placeholder")}
                  value={values.timeTo ? dayjs(values.timeTo, "h:mm A").toDate() : null}
                />
              </div>
              <ErrorMessage name="timeFrom" component="div" className="text-sm text-red-500" />
              <ErrorMessage name="timeTo" component="div" className="text-sm text-red-500" />

              <Field
                name="date"
                type="date"
                className="reserve w-full rounded-xl border p-3"
                min={new Date().toISOString().split("T")[0]}
              />
              <ErrorMessage name="date" component="div" className="text-sm text-red-500" />

              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="reserve md:w-1/4 rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? t("booking") : t("book_now")}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
