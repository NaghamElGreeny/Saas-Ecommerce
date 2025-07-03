"use client";

import { TimePicker } from "antd";
import dayjs from "dayjs";
import { BrandCountry, ReservationPayload } from "@/utils/types";
import { locationService } from "@/services/ClientApiHandler";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

import GlobalDialog from "@/components/shared/GlobalDialog";
import { useCountryCodesStore } from "@/stores/countryCodesStore";
import { useStore } from "@/stores/useStore";

export default function ReservationForm({
  show,
  className,
}: {
  show: boolean;
  className?: string;
}) {
  const router = useRouter();

  const countryCodes = useCountryCodesStore((state) => state.countryCodes);
  const fetchCountryCodes = useCountryCodesStore(
    (state) => state.fetchCountryCodes,
  );

  const stores = useStore((state) => state.stores);
  const fetchStores = useStore((state) => state.fetchStores);

  const [branchDialogOpen, setBranchDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState<BrandCountry | null>(
    null,
  );

  useEffect(() => {
    fetchCountryCodes();
    fetchStores();
  }, []);

  useEffect(() => {
    if (countryCodes.length > 0) setSelectedCountry(countryCodes[0]);
  }, [countryCodes]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^\d+$/, "Phone number must contain only digits")
      .test("phone-length-min", "Phone number is too short", function (value) {
        const country = countryCodes.find(
          (c) => c.phone_code === this.parent.phone_code,
        );
        return value ? value.length >= (country?.min_digits || 5) : false;
      })
      .test("phone-length-max", "Phone number is too long", function (value) {
        const country = countryCodes.find(
          (c) => c.phone_code === this.parent.phone_code,
        );
        return value ? value.length <= (country?.phone_limit || 15) : false;
      }),
    phone_code: Yup.string().required("Country code is required"),
    store_id: Yup.string().required("Please select a branch"),
    date: Yup.date()
      .required("Date is required")
      .min(new Date(), "Date cannot be in the past"),
    timeFrom: Yup.string()
      .required("Start time is required")
      .test(
        "is-before-timeTo",
        "Start time must be before end time",
        function (value) {
          return !value || !this.parent.timeTo || value < this.parent.timeTo;
        },
      ),
    timeTo: Yup.string()
      .required("End time is required")
      .test(
        "is-after-timeFrom",
        "End time must be after start time",
        function (value) {
          return (
            !value || !this.parent.timeFrom || value > this.parent.timeFrom
          );
        },
      ),
    guest_number: Yup.number()
      .required("Number of guests is required")
      .min(1, "Must be at least 1 guest")
      .max(20, "Maximum 20 guests allowed")
      .typeError("Please enter a valid number"),
  });

  const handleTimeFromChange = (
    time: dayjs.Dayjs | null,
    formikSetFieldValue: any,
  ) => {
    if (time) {
      const formattedTime = time.format("h:mm A");
      formikSetFieldValue("timeFrom", formattedTime);
    }
  };

  const handleTimeToChange = (
    time: dayjs.Dayjs | null,
    formikSetFieldValue: any,
  ) => {
    if (time) {
      const formattedTime = time.format("h:mm A");
      formikSetFieldValue("timeTo", formattedTime);
    }
  };

  return (
    <div className={className}>
      {show && (
        <>
          <div className="mb-4 flex w-full items-center">
            <p
              className="text-text-website-font mx-2 uppercase"
              data-aos="fade-up"
            >
              Make an Reserve
            </p>
            <div
              className="line border-primary h-0 w-[200px] border-b"
              data-aos="fade-up"
            />
          </div>
          <h1
            data-aos="fade-up"
            className="mb-4 text-4xl leading-tight font-bold text-gray-900 md:text-5xl ltr:text-left rtl:text-right"
          >
            Online Reservation
          </h1>
        </>
      )}

      <div
        className="w-full rounded-[20px] bg-white/70 bg-[url('/assets/images/reservation.png')] p-8 shadow-xl backdrop-blur-md md:p-12"
        {...(show ? { "data-aos": "fade-up" } : {})}
      >
        <h3 className="font-allura mb-2 text-center text-5xl text-black md:text-4xl">
          reservations
        </h3>
        <h1 className="mb-8 text-center text-5xl font-bold text-black md:text-4xl">
          Book a Table
        </h1>

        <Formik
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
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setLoading(true);
            toast.dismiss();

            try {
              const formatTime = (time: string) => {
                if (!time) return "";
                const timeFormat = "hh:mm A";
                const parsedTime = dayjs(time, timeFormat);
                if (parsedTime.isValid()) {
                  return parsedTime.format("hh:mm A");
                }
                return time;
              };

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

              await locationService.makeReservation(payload);
              toast.success("Reservation successful!");
              router.push("/");
            } catch (err) {
              console.error(err);
              toast.error(err?.response?.data?.message || "Reservation failed");
            } finally {
              setLoading(false);
              setSubmitting(false);
            }
          }}
        >
          {({ values, setFieldValue, handleBlur, isSubmitting }) => (
            <Form className="reserve-form grid gap-5">
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className="reserve w-full p-3"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-sm text-red-500"
              />

              <div className="phone-inputs flex gap-1">
                <div className="relative w-26">
                  <select
                    name="phone_code"
                    value={values.phone_code}
                    onChange={(e) => {
                      setFieldValue("phone_code", e.target.value);
                      const selected = countryCodes.find(
                        (c) => c.phone_code === e.target.value,
                      );
                      setSelectedCountry(selected || null);
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
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  className="w-full rounded-md border p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <ErrorMessage
                name="phone"
                component="div"
                className="text-sm text-red-500"
              />

              <div className="flex flex-col gap-4 md:flex-row">
                <Field
                  as="select"
                  name="guest_number"
                  className="reserve w-1/2 p-3"
                >
                  <option value={1}>1 Person</option>
                  <option value={2}>2 People</option>
                  <option value={3}>3 People</option>
                  <option value={4}>4+ People</option>
                </Field>
                <ErrorMessage
                  name="guest_number"
                  component="div"
                  className="text-sm text-red-500"
                />

                {/* Branch Selection Dialog */}
                <GlobalDialog
                  open={branchDialogOpen}
                  onOpenChange={setBranchDialogOpen}
                  title="Branches Address"
                >
                  <p className="mb-2">Please, Select your location</p>
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
                          onChange={() =>
                            setFieldValue("store_id", store.id.toString())
                          }
                          className="mt-1"
                        />
                        <div>
                          <h3 className="font-medium">{store.name}</h3>
                          <p className="mt-1 text-sm text-gray-600">
                            {store.location_description}
                          </p>
                        </div>
                      </label>
                    ))}
                    <ErrorMessage
                      name="store_id"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (values.store_id) {
                        setBranchDialogOpen(false);
                      } else {
                        toast.error("Please select a branch");
                      }
                    }}
                    className="rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  >
                    Confirm
                  </button>
                </GlobalDialog>

                {/* Button to open branch dialog */}
                <button
                  type="button"
                  className="reserve w-full p-3 text-left"
                  onClick={() => setBranchDialogOpen(true)}
                >
                  {values.store_id
                    ? stores.find((s) => s.id.toString() === values.store_id)
                        ?.name
                    : "Select Branch"}
                </button>
              </div>

              <div className="flex w-full flex-col gap-4 md:flex-row">
                <TimePicker
                  className="time-picker w-1/2"
                  use12Hours
                  format="h:mm A"
                  onChange={(time) => handleTimeFromChange(time, setFieldValue)}
                  placeholder="From Time"
                  value={
                    values.timeFrom ? dayjs(values.timeFrom, "h:mm A") : null
                  }
                />
                <TimePicker
                  className="time-picker w-1/2"
                  use12Hours
                  format="h:mm A"
                  onChange={(time) => handleTimeToChange(time, setFieldValue)}
                  placeholder="To Time"
                  value={values.timeTo ? dayjs(values.timeTo, "h:mm A") : null}
                />
              </div>
              <ErrorMessage
                name="timeFrom"
                component="div"
                className="text-sm text-red-500"
              />
              <ErrorMessage
                name="timeTo"
                component="div"
                className="text-sm text-red-500"
              />

              <Field
                type="date"
                name="date"
                className="reserve w-full rounded-xl border p-3"
                min={new Date().toISOString().split("T")[0]}
              />
              <ErrorMessage
                name="date"
                component="div"
                className="text-sm text-red-500"
              />

              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="reserve rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Booking..." : "Book Now"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
