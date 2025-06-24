"use client";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TimePicker } from "antd";
import { ChevronDown, Edit } from "lucide-react";
import { useAddressStore } from "@/stores/addressStore";
import { useStore } from "@/stores/useStore";
import dayjs from "dayjs";
import AddressItem from "../shared/AddressItem";

const OrderForm = () => {
  const { addresses, fetchAddresses } = useAddressStore();
  const { stores, selectedStore, setSelectedStore } = useStore();

  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [openStoreDialog, setOpenStoreDialog] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const defaultAddress = addresses.find((address) => address.is_default);

  const formik = useFormik({
    initialValues: {
      orderType: "delivery",
      schedule: false,
      date: "",
      time: "",
      paymentMethod: "cash",
      selectedAddressId: defaultAddress?.id || null,
      selectedStoreId: selectedStore?.id || null,
    },
    onSubmit: (values) => {
      console.log("Form Submitted", values);
    },
  });

  const { values, setFieldValue, handleSubmit } = formik;

  const handleTimeChange = (time: dayjs.Dayjs | null) => {
    if (time) {
      const formattedTime = time.format("h:mm A");
      setFieldValue("time", formattedTime);
    }
  };

  const selectedAddress = addresses.find(
    (address) => address.id === values.selectedAddressId,
  );
  const selectedBranch =
    stores.find((store) => store.id === values.selectedStoreId) ||
    selectedStore;

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full space-y-6 p-6">
      {/* Order Type: Delivery or Takeaway */}
      <div className="grid grid-cols-1 gap-5 font-semibold md:grid-cols-2">
        {["delivery", "takeaway"].map((type) => (
          <div key={type} className="w-full">
            <div className="flex items-center rounded-xl bg-white">
              <label
                htmlFor={type}
                className="flex w-full items-center justify-between gap-2 px-5 py-4"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={`/assets/icons/${type}.svg`}
                    alt={type}
                    width={32}
                    height={32}
                    className="text-primary size-8"
                  />
                  <h3 className="capitalize">{type}</h3>
                </div>
                <input
                  type="radio"
                  id={type}
                  name="orderType"
                  value={type}
                  checked={values.orderType === type}
                  onChange={() => setFieldValue("orderType", type)}
                  className="h-5 w-5"
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Address Section */}
      {values.orderType === "delivery" && (
        <>
          <h2 className="text-lg font-semibold">Your Shipping Address</h2>
          <div
            onClick={() => setOpenAddressDialog(true)}
            className="bg-scndbg flex cursor-pointer items-center justify-between rounded-lg p-3"
          >
            <div className="flex items-center gap-2">
              <Image
                src="/assets/images/map.png"
                alt="map"
                width={24}
                height={24}
                className="h-16 w-16 rounded-lg"
              />
              <div>
                <h2 className="font-bold">{selectedAddress?.title}</h2>
                <p className="text-primary">{selectedAddress?.desc}</p>
              </div>
            </div>
            <Edit className="text-primary" />
          </div>
        </>
      )}

      {/* Store Section */}
      {values.orderType === "takeaway" && (
        <>
          <h2 className="text-lg font-semibold">Select Branch</h2>
          <div
            onClick={() => setOpenStoreDialog(true)}
            className="bg-scndbg flex cursor-pointer items-center justify-between rounded-lg p-3"
          >
            <div className="flex items-center gap-2">
              <Image
                src={selectedBranch?.image || "/assets/images/store.png"}
                alt="branch"
                width={24}
                height={24}
                className="h-16 w-16 rounded-lg"
              />
              <div>
                <h2 className="font-bold">{selectedBranch?.name}</h2>
                <p className="text-primary">
                  {selectedBranch?.location_description}
                </p>
              </div>
            </div>
            <ChevronDown className="text-primary" />
          </div>
        </>
      )}

      {/* Time Selection */}
      <div>
        <div className="mb-2 flex gap-4 w-full">
          <label className="flex items-center gap-2 font-medium">
            <input
              type="radio"
              name="schedule"
              checked={!values.schedule}
              onChange={() => setFieldValue("schedule", false)}
              className="!w-fit"
            />
            Order Now
          </label>
          <label className="flex items-center gap-2 font-medium">
            <input
              type="radio"
              name="schedule"
              checked={values.schedule}
              onChange={() => setFieldValue("schedule", true)}
              className="!w-fit"
            />
            Schedule Order
          </label>
        </div>
        <div className="flex w-full gap-4">
          <input
            type="date"
            disabled={!values.schedule}
            className="!w-1/2 rounded-lg !border-none p-3 text-gray-600"
            value={values.date}
            onChange={(e) => setFieldValue("date", e.target.value)}
          />

          <TimePicker
            use12Hours
            format="h:mm A"
            onChange={handleTimeChange}
            placeholder="From Time"
            className="time-picker w-1/2 !rounded-lg border-none !p-3"
          />
        </div>
      </div>

      {/* Payment Methods */}
      <div>
        <h2 className="mb-2 text-lg font-semibold">Payment Methods</h2>
        <div className="grid grid-cols-2 gap-4">
          {["card", "cash"].map((method) => (
            <label
              key={method}
              className="flex cursor-pointer items-center justify-between rounded-xl border p-4"
            >
              <div className="flex items-center gap-2 font-semibold">
                <Image
                  src={`/assets/icons/${method}.svg`}
                  alt={method}
                  width={32}
                  height={32}
                  className="size-8"
                />
                {method.charAt(0).toUpperCase() + method.slice(1)}
              </div>
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={values.paymentMethod === method}
                onChange={() => setFieldValue("paymentMethod", method)}
                className="h-5 w-5"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-primary w-1/4 rounded-full py-3 text-white hover:bg-blue-700"
        >
          Confirm
        </button>
      </div>

      {/* Address Dialog */}
      <Dialog open={openAddressDialog} onOpenChange={setOpenAddressDialog}>
        <DialogContent className="max-w-md">
          <h2 className="mb-4 text-lg font-bold">Select Address</h2>
          <div className="max-h-72 space-y-4 overflow-y-auto">
            {addresses.map((address) => (
              // <div
              //   key={address.id}
              //   onClick={() => setFieldValue("selectedAddressId", address.id)}
              //   className={`cursor-pointer rounded-lg border p-4 ${
              //     address.id === values.selectedAddressId
              //       ? "border-blue-500 bg-blue-50"
              //       : "hover:bg-gray-100"
              //   }`}
              // >
              //   <h3 className="font-semibold">{address.title}</h3>
              //   <p className="text-sm text-gray-600">{address.desc}</p>
              // </div>
              <AddressItem key={address.id} addr={address}/>
            ))}
          </div>
          <button
            className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-white"
            onClick={() => setOpenAddressDialog(false)}
          >
            Confirm
          </button>
        </DialogContent>
      </Dialog>

      {/* Store Dialog */}
      <Dialog open={openStoreDialog} onOpenChange={setOpenStoreDialog}>
        <DialogContent className="max-w-md">
          <h2 className="mb-4 text-lg font-bold">Select Branch</h2>
          <div className="max-h-72 space-y-4 overflow-y-auto">
            {stores.map((store) => (
              <div
                key={store.id}
                onClick={() => setFieldValue("selectedStoreId", store.id)}
                className={`cursor-pointer rounded-lg border p-4 ${
                  store.id === values.selectedStoreId
                    ? "border-blue-500 bg-blue-50"
                    : "hover:bg-gray-100"
                }`}
              >
                <h3 className="font-semibold">{store.name}</h3>
                <p className="text-sm text-gray-600">
                  {store.location_description}
                </p>
              </div>
            ))}
          </div>
          <button
            className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-white"
            onClick={() => {
              const selected = stores.find(
                (s) => s.id === values.selectedStoreId,
              );
              if (selected) setSelectedStore(selected); // تحديث الجلوبال ستور
              setOpenStoreDialog(false);
            }}
          >
            Confirm
          </button>
        </DialogContent>
      </Dialog>
    </form>
  );
};

export default OrderForm;
