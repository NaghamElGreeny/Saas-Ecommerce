"use client";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TimePicker } from "antd";
import { ChevronDown, Edit } from "lucide-react";
import { useAddressStore } from "@/stores/addressStore";
import { useStore } from "@/stores/useStore";
import { useCartStore } from "@/stores/cartStore"; // Import cart store
import dayjs from "dayjs";
import AddressItem from "../shared/AddressItem";
import toast from "react-hot-toast";
// import { updateCartOrderType } from "@/services/ClientApiHandler"; // API service to update order type

const OrderForm = () => {
  const { addresses, fetchAddresses } = useAddressStore();
  const { stores, selectedStore, setSelectedStore } = useStore();
  const { cart, fetchCart } = useCartStore(); // Get cart from store

  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [openStoreDialog, setOpenStoreDialog] = useState(false);
  const [selectedDialogAddressId, setSelectedDialogAddressId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const defaultAddress = addresses.find((address) => address.is_default);

  const validationSchema = Yup.object().shape({
    orderType: Yup.string().oneOf(["delivery", "takeaway"]).required("Order type is required"),
    schedule: Yup.boolean(),
    date: Yup.string().when("schedule", {
      is: true,
      then: Yup.string().required("Date is required when scheduling"),
      otherwise: Yup.string().notRequired(),
    }),
    time: Yup.string().when("schedule", {
      is: true,
      then: Yup.string().required("Time is required when scheduling"),
      otherwise: Yup.string().notRequired(),
    }),
    paymentMethod: Yup.string().oneOf(["cash", "card"]).required("Payment method is required"),
    selectedAddressId: Yup.number().when("orderType", {
      is: "delivery",
      then: Yup.number().required("Address is required for delivery"),
      otherwise: Yup.number().nullable(),
    }),
    selectedStoreId: Yup.number().when("orderType", {
      is: "takeaway",
      then: Yup.number().required("Store is required for takeaway"),
      otherwise: Yup.number().nullable(),
    }),
  });

  const formik = useFormik({
    initialValues: {
      orderType: cart?.data?.order_type || "delivery", 
      schedule: false,
      date: "",
      time: "",
      paymentMethod: "cash",
      selectedAddressId: defaultAddress?.id || null,
      selectedStoreId: selectedStore?.id || null,
    },
    validationSchema,
    onSubmit: (values) => {
      try {
        
          toast.success('order confirmed');
      console.log("Form Submitted", values);
      } catch {
        
      }
    
    },
    enableReinitialize: true, 
  });

  const { values, errors, touched, setFieldValue, handleSubmit } = formik;

  const handleTimeChange = (time: dayjs.Dayjs | null) => {
    if (time) {
      const formattedTime = time.format("h:mm A");
      setFieldValue("time", formattedTime);
    }
  };

  const selectedAddress = addresses.find(
    (address) => address.id === values.selectedAddressId
  );
  const selectedBranch =
    stores.find((store) => store.id === values.selectedStoreId) ||
    selectedStore;

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full space-y-6 p-6">
      {/* Order Type */}
   <div className="grid grid-cols-1 gap-5 font-semibold md:grid-cols-2">
  {["delivery", "take_away"].map((type) => (
    <div key={type} className="w-full">
      <div className="flex items-center h-full rounded-xl bg-white"> {/* Added h-full */}
        <label
          htmlFor={type}
          className="flex w-full items-center justify-between gap-2 px-5 py-4"
        >
          <div className="flex items-center gap-2 w-full"> {/* Added w-full */}
            <Image
              src={`/assets/icons/${type==="delivery"?'delivery':'takeaway'}.svg`}
              alt={type}
              width={32}
              height={32}
              className="flex-shrink-0" // Prevent image from shrinking
            />
            <h3 className="capitalize flex-grow">{type==="delivery"?'delivery':'Takeaway'}</h3> {/* Added flex-grow */}
          </div>
          <input
            type="radio"
            id={type}
            name="orderType"
            value={type}
            checked={values.orderType === type}
            onChange={() => {
              setFieldValue("orderType", type)
              fetchCart({order_type:type,address_id:selectedAddress?.id.toString()})
            }}
            className="h-5 w-5 flex-shrink-0" 
          />
        </label>
      </div>
    </div>
  ))}
</div>

      {/* Address */}
      {values.orderType === "delivery" && (
        <>
          <h2 className="text-lg font-semibold">Your Shipping Address</h2>
          <div
            onClick={() => {
              setSelectedDialogAddressId(values.selectedAddressId);
              setOpenAddressDialog(true);
            }}
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
          {errors.selectedAddressId && touched.selectedAddressId && (
            <p className="text-sm text-red-500">{errors.selectedAddressId}</p>
          )}
        </>
      )}

      {/* Store */}
      {values.orderType === "take_away" && (
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
          {errors.selectedStoreId && touched.selectedStoreId && (
            <p className="text-sm text-red-500">{errors.selectedStoreId}</p>
          )}
        </>
      )}

      {/* Time */}
      <div>
        <div className="mb-2 flex w-full gap-4">
          <label className="flex items-center gap-2 font-medium">
            <input
              type="radio"
              name="schedule"
              checked={!values.schedule}
              onChange={() => setFieldValue("schedule", false)}
            />
            Order Now
          </label>
          <label className="flex items-center gap-2 font-medium">
            <input
              type="radio"
              name="schedule"
              checked={values.schedule}
              onChange={() => setFieldValue("schedule", true)}
            />
            Schedule Order
          </label>
        </div>
        <div className="flex w-full gap-4">
          <input
            type="date"
            disabled={!values.schedule}
            value={values.date}
            onChange={(e) => setFieldValue("date", e.target.value)}
            className="!w-1/2 rounded-lg !border-none p-3 text-gray-600"
          />
          <TimePicker
            use12Hours
            format="h:mm A"
            onChange={handleTimeChange}
            placeholder="From Time"
            className="time-picker w-1/2 !rounded-lg border-none !p-3"
          />
        </div>
        {values.schedule && errors.date && (
          <p className="text-sm text-red-500">{errors.date}</p>
        )}
        {values.schedule && errors.time && (
          <p className="text-sm text-red-500">{errors.time}</p>
        )}
      </div>

      {/* Payment */}
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
                />
                {method.charAt(0).toUpperCase() + method.slice(1)}
              </div>
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={values.paymentMethod === method}
                onChange={() => setFieldValue("paymentMethod", method)}
              />
            </label>
          ))}
        </div>
        {errors.paymentMethod && (
          <p className="text-sm text-red-500">{errors.paymentMethod}</p>
        )}
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
            {addresses.map((address) => {
              const isSelected = selectedDialogAddressId === address.id;
              return (
                <div
                  key={address.id}
                  onClick={() => setSelectedDialogAddressId(address.id)}
                  className={`rounded-lg border transition ${
                    isSelected ? "border-primary bg-blue-50" : "border-gray-200"
                  }`}
                >
                  <AddressItem addr={address} />
                </div>
              );
            })}
          </div>
          <button
            className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-white"
            onClick={() => {
              if (selectedDialogAddressId) {
                setFieldValue("selectedAddressId", selectedDialogAddressId);
                setOpenAddressDialog(false);
              }
            }}
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
                (s) => s.id === values.selectedStoreId
              );
              if (selected) setSelectedStore(selected);
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
