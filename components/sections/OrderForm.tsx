"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdEdit } from "react-icons/md";
import clsx from "clsx";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TimePicker } from "antd";
import { useStore } from "@/stores/useStore";
const OrderForm = () => {
  // const currentBranch=useStore
  const formik = useFormik({
    initialValues: {
      orderType: "delivery",
      schedule: false,
      date: "",
      time: "",
      paymentMethod: "cash",
    },
    //     validationSchema: Yup.object({
    //   date: Yup.string().when('schedule', (schedule: boolean, schema) =>
    //     schedule ? schema.required('Date is required') : schema
    //   ),
    //   time: Yup.string().when('schedule', (schedule: boolean, schema) =>
    //     schedule ? schema.required('Time is required') : schema
    //   ),
    // }),

    onSubmit: (values) => {
      console.log("Form Submitted", values);
    },
  });

  const { values, setFieldValue, handleSubmit } = formik;
  const handleTimeChange = (time: dayjs.Dayjs | null) => {
    if (time) {
      const formattedTime = time.format("h:mm A");
      formik.setFieldValue("timeFrom", formattedTime);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full space-y-6 p-6">
      <div className="mt-5 grid grid-cols-1 gap-5 font-semibold md:grid-cols-2">
        {/* Delivery Option */}
        <div className="w-full">
          <div className="items-between flex rounded-xl bg-white">
            <label
              htmlFor="delivery"
              className="flex w-full items-center justify-between gap-2 px-5 py-4"
            >
              <div className="label flex items-center gap-2">
                {" "}
                <Image
                  src="/assets/icons/delivery.svg"
                  alt="takeaway"
                  width={32}
                  height={32}
                  className="text-primary size-8"
                />
                <h3> Delivery</h3>
              </div>
              <input
                type="radio"
                id="delivery"
                name="orderType"
                value="delivery"
                checked={values.orderType === "delivery"}
                onChange={() => setFieldValue("orderType", "delivery")}
                className="end-0 h-5 !w-5"
              />
            </label>
          </div>
        </div>

        {/* Takeaway Option */}
        <div className="w-full">
          <div className="flex items-center rounded-xl bg-white">
            <label
              htmlFor="takeaway"
              className="flex w-full items-center justify-between gap-2 px-5 py-4"
            >
              <div className="label flex items-center gap-2">
                {" "}
                <Image
                  src="/assets/icons/takeaway.svg"
                  alt="takeaway"
                  width={32}
                  height={32}
                  className="text-primary size-8"
                />
                <h3> Takeaway</h3>
              </div>
              <input
                type="radio"
                id="takeaway"
                name="orderType"
                value="takeaway"
                checked={values.orderType === "takeaway"}
                onChange={() => setFieldValue("orderType", "takeaway")}
                className="ms-auto h-5 !w-5"
              />
            </label>
          </div>
        </div>
      </div>
      {/* Address Section */}
      <div>
        <h2 className="mb-2 text-lg font-semibold">Your Shipping Address</h2>
        <div className="bg-scndbg flex items-center justify-between rounded-lg p-3">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/images/map.png"
              alt="map"
              width={24}
              height={24}
              className="text-primary h-16 w-16 rounded-lg"
            />
            <div className="info">
              <h2 className="font-bold">Location name</h2>
              <p className="text-primary">location</p>
            </div>
          </div>

          <button
            type="button"
            className="location-branch text-primary text-xl"
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <path
                d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm17.71-10.04a1.003 1.003 0 0 0 0-1.42l-2.5-2.5a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Order Time */}
      <div>
        <div className="mb-2 flex w-full gap-4">
          <label className="flex  items-center gap-2 font-medium text-blue-600">
            <input
              type="radio"
              name="schedule"
              checked={!values.schedule}
              onChange={() => setFieldValue("schedule", false)}
              className="!w-5"
            />
            Order Now
          </label>
          <label className="flex items-center gap-2 font-medium">
            <input
              type="radio"
              name="schedule"
              checked={values.schedule}
              onChange={() => setFieldValue("schedule", true)}
               className="!w-5"
            />
            Schedule Order
          </label>
        </div>
        <div className="flex gap-4 w-full">
   
     <input
            type="date"
            disabled={!values.schedule}
            className="!w-1/2 rounded-lg p-3 text-gray-600 !border-none"
            value={values.date}
            onChange={(e) => setFieldValue("date", e.target.value)}
          />
       
               <TimePicker
                        use12Hours
                        format="h:mm A"
                        onChange={handleTimeChange}
                        placeholder="From Time"
                        className="time-picker w-1/2 !rounded-lg !p-3 border-none"
                      />
        </div>
      </div>

      {/* Payment Method */}
      <div className="w-full">
        <h2 className="mb-2 text-lg font-semibold">Payment Methods</h2>
        <div className="mx-auto grid w-full grid-cols-2 gap-4">
          <label className="flex cursor-pointer items-center justify-between rounded-xl border p-4">
            <div className="flex items-center gap-2 font-semibold">
              <Image
                src="/assets/icons/card.svg"
                alt="takeaway"
                width={32}
                height={32}
                className="text-primary size-8"
              />

              {/* <span className="text-gray-800">Card</span> */} Card
            </div>

            <input
              type="radio"
              name="option"
              value="1"
              className="ms-auto h-5 !w-5"
            />
          </label>

          <label className="flex cursor-pointer items-center justify-between rounded-xl border p-4">
            <div className="flex items-center justify-between gap-2 font-semibold">
              <Image
                src="/assets/icons/cash.svg"
                alt="takeaway"
                width={32}
                height={32}
                className="text-primary size-8"
              />
     Cash
            </div>
            <input
              type="radio"
              name="option"
              value="2"
              className="start-5 h-5 !w-5"
            />
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="btn flex w-full justify-end">
        <button
          type="submit"
          className="bg-primary end-0 flex h-12 w-1/4 items-center justify-center rounded-full py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default OrderForm;
