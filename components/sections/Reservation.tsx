"use client";
import { Space, TimePicker } from "antd";
import dayjs from "dayjs";
import {
  BrandCountry,
  getCountryCodes,
  getStores,
  makeReservation,
  ReservationPayload,
  Store,
} from "@/services/ClientApiHandler";
import { useFormik } from "formik";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { time } from 'console';

export default function ReservationForm({
  show,
  className,
}: {
  show: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [countryCodes, setCountryCodes] = useState<BrandCountry[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<BrandCountry | null>(
    null,
  );
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const codes = await getCountryCodes();
        const stores = await getStores();
        setCountryCodes(codes);
        setStores(stores);
        setSelectedCountry(codes[0]);
        setSelectedStore(stores[0]);
        formik.setFieldValue("phone_code", codes[0].phone_code);
        // formik.setFieldValue('branch', stores[0].name);
      } catch (err) {
        toast.error("Failed to load country codes and stores");
        console.error(err);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      phone_code: "",
      store_id: "",
      date: "",
      timeFrom: "",
      timeTo: "",
      guest_number: 1,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters"),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^\d+$/, "Phone number must contain only digits")
        .test("phone-length", "Phone number is too short", function (value) {
          const country = countryCodes.find(
            (c) => c.phone_code === this.parent.phone_code,
          );
          return value ? value.length >= (country?.min_digits || 5) : false;
        })
        .test("phone-length", "Phone number is too long", function (value) {
          const country = countryCodes.find(
            (c) => c.phone_code === this.parent.phone_code,
          );
          return value ? value.length <= (country?.phone_limit || 15) : false;
        }),
      phone_code: Yup.string().required("Country code is required"),
      //   store_id: Yup.string().required("Please select a branch"),
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
    }),
    onSubmit: async (values) => {
      setLoading(true);
      toast.dismiss();

      try {
        // Format the time with AM/PM
        const formatTime = (time: string) => {
          if (!time) return "";

          // Parse the time string with dayjs to ensure consistent formatting
          const timeFormat = "hh:mm A";
          const parsedTime = dayjs(time, timeFormat);

          if (parsedTime.isValid()) {
            // Return in "h:i A" format (e.g., "2:30 PM")
            return parsedTime.format("hh:mm A").replace("mm", "i");
          }

          // Fallback to original time if parsing fails
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

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const data = await makeReservation(payload);
        toast.success("Reservation successful!");
        router.push("/");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error(err);
        toast.error(err?.response?.data?.message || "Reservation failed");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    const country = countryCodes.find(
      (c: BrandCountry) => c.phone_code === code,
    );
    setSelectedCountry(country || null);
    formik.setFieldValue("phone_code", code);
  };

  const handleTimeFromChange = (time: dayjs.Dayjs | null) => {
    if (time) {
      const formattedTime = time.format("h:mm A");
      formik.setFieldValue("timeFrom", formattedTime);
    }
  };

  const handleTimeToChange = (time: dayjs.Dayjs | null) => {
    if (time) {
      const formattedTime = time.format("h:mm A");
      formik.setFieldValue("timeTo", formattedTime);
    }
  };

  return (
    <div className={`${className}`}>
      {show ? (
        <>
          <div className={`mb-4 flex w-full items-center`}>
            <p className={`text-primary mx-2 uppercase`}>Make an Reserve</p>
            <div className="line border-primary h-0 w-[200px] border-b"></div>
          </div>
          <h1
            className={`mb-4 text-4xl leading-tight font-bold text-gray-900 md:text-5xl ltr:text-left rtl:text-right`}
          >
            Online Reservation
          </h1>
        </>
      ) : (
        ""
      )}

      {/* Form Box */}
      <div className="w-full rounded-[20px] bg-white/70 bg-[url('/assets/images/reservation.png')] p-8 shadow-xl backdrop-blur-md md:p-12">
        <h3 className="font-allura mb-2 text-center text-5xl text-black md:text-4xl">
          reservations
        </h3>
        <h1 className="mb-8 text-center text-5xl font-bold text-black md:text-4xl">
          Book a Table
        </h1>

        <form
          onSubmit={formik.handleSubmit}
          className="reserve-form grid gap-5"
        >
          <input
            type="text"
            placeholder="Name"
            {...formik.getFieldProps("name")}
            className="reserve w-full p-3"
          />

          <div className="phone-inputs flex gap-1">
            {/* Select with Chevron */}
            <div className="relative w-26">
              <select
                className="w-full appearance-none rounded-xl border p-3"
                value={formik.values.phone_code}
                onChange={handleCountryChange}
                onBlur={formik.handleBlur}
                name="phone_code"
              >
                {countryCodes.map((country) => (
                  <option key={country.id} value={country.phone_code}>
                    +{country.phone_code}
                  </option>
                ))}
              </select>
              {/* Chevron Icon */}
              <div
                className={`pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500`}
              >
                <ChevronDown size={18} />
              </div>
            </div>

            {/* Phone Input */}
            <input
              type="tel"
              placeholder="Phone"
              className="w-full rounded-md border p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              {...formik.getFieldProps("phone")}
            />
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <select
              {...formik.getFieldProps("guest_number")}
              className="reserve w-1/2 p-3"
              name="guest_number"
            >
              <option value="No. of guests">No. of guests</option>
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="3">3 People</option>
              <option value="4+">4+ People</option>
            </select>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button type="button" className="reserve w-full p-3 text-left">
                  {formik.values.store_id
                    ? stores.find((s) => s.id === formik.values.store_id)?.name
                    : "Select Branch"}
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Branches Address</DialogTitle>
                  <DialogDescription>
                    Please, Select your location{" "}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                  {stores.map((store) => (
                    <label
                      key={store.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                        formik.values.store_id === store.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="store_id"
                        value={store.id}
                        checked={formik.values.store_id === store.id}
                        onChange={() =>
                          formik.setFieldValue("store_id", store.id)
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
                  {formik.touched.store_id && formik.errors.store_id && (
                    <div className="text-sm text-red-500">
                      {formik.errors.store_id}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (formik.values.store_id) {
                      setOpen(false);
                    } else {
                      toast.error("Please select a branch");
                    }
                  }}
                  className="rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Confirm
                </button>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex w-full flex-col gap-4 md:flex-row">
            <TimePicker
              use12Hours
              format="h:mm A"
              onChange={handleTimeFromChange}
              placeholder="From Time"
              className="time-picker w-1/2"
            />
            <TimePicker
              use12Hours
              format="h:mm A"
              onChange={handleTimeToChange}
              placeholder="To Time"
              className="time-picker w-1/2"
            />
          </div>

          <input
            type="date"
            {...formik.getFieldProps("date")}
            className="reserve w-full p-3"
          />

          <button
            type="submit"
            className="mr-5 w-[230px] rounded-full bg-blue-500 py-5 font-medium text-white transition hover:bg-blue-600"
            disabled={loading}
            // onClick={() => {
            //   console.log(formik.values);
            // }}
          >
            {loading ? "Booking..." : "Book a Table"}
          </button>
        </form>
      </div>
    </div>
  );
}
