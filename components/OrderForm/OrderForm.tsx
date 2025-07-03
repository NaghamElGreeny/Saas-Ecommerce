"use client";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { TimePicker } from "antd";
import { ChevronDown, Edit } from "lucide-react";
import { useAddressStore } from "@/stores/addressStore";
import { useStore } from "@/stores/useStore";
import { useCartStore } from "@/stores/cartStore";
import dayjs from "dayjs";
import AddressItem from "../shared/AddressItem";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/authStore";
import { orderService } from "@/services/ClientApiHandler";
import Success from "../Success";
import { useLoyalityStore } from "@/stores/loyalityStore";
import { Spinner } from "../atoms";
import GlobalDialog from "../shared/GlobalDialog";

type OrderFormProps = {
  params: Record<string, string | string[]>;
};

const OrderForm = ({ params }: OrderFormProps) => {
  const { points, fetchLoyality, setUsePoints } = useLoyalityStore();
  const { usePoints } = useLoyalityStore();
  const { addresses, fetchAddresses } = useAddressStore();
  const { stores, selectedStore, setSelectedStore } = useStore();
  const { cart, fetchCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  type UserData = {
    points?: number;
    wallet?: number;
  };
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const cridetPaymet = async (data) => {
    const pay_type = [];
    const total_price = cart.price!.total!;

    if (usePoints) {
      pay_type.push({ credit: total_price - points }, { points: points });
    } else {
      pay_type.push({ credit: total_price });
    }
    const checkoutPayload = {
      ...data,
      cartProducts: cart.data.products,
      total: pay_type.length == 2 ? total_price - (points || 0) : total_price,
    };

    const response = await fetch("/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(checkoutPayload),
    });

    const session = await response.json();

    if (response.ok && session.url) {
      window.location.href = session.url;
    }
  };
  const userData = useAuthStore((s) => s.userData) as UserData;
  console.log("user", userData);

  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [openStoreDialog, setOpenStoreDialog] = useState(false);
  const [selectedDialogAddressId, setSelectedDialogAddressId] = useState<
    number | null
  >(null);

  useEffect(() => {
    fetchAddresses();
  }, []);
  useEffect(() => {
    (async () => {
      if (params.status === "success") {
        try {
          const res = await orderService.confirmOrder({
            ...params,
            pay_type: JSON.stringify([
              { [String(params?.pay_type)]: cart.price.total },
            ]),
          });
          setOpen(true);
          setOrderId(res.data.orderId as string);
          fetchCart();
          setUsePoints(false);
        } catch (error) {
          toast.error(error?.message || "Failed to confirm order");
        }
      }
    })();
  }, []);

  const defaultAddress = addresses.find((a) => a.is_default);

  const validationSchema = Yup.object().shape({
    orderType: Yup.string().required("Order type is required"),
    is_schedule: Yup.boolean(),
    pay_type: Yup.string().required("Payment method is required"),
    selectedAddressId: Yup.number().required("Address is required"),
    selectedStoreId: Yup.number().required("Store is required"),
  });

  const formik = useFormik({
    initialValues: {
      orderType: cart?.data?.order_type || "delivery",
      is_schedule: false,
      order_date: "",
      order_time: "",
      pay_type: "cash",
      selectedAddressId: defaultAddress?.id || null,
      selectedStoreId: selectedStore?.id || null,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      const payload = {
        order_type: values.orderType,
        is_schedule: values.is_schedule ? 1 : 0,
        address_id: selectedAddress.id,
        order_date: values.is_schedule ? values.order_date : undefined,
        order_time: values.is_schedule ? values.order_time : undefined,
        pay_type: usePoints
          ? JSON.stringify([
              { [values.pay_type]: cart.price.total - points },
              { points: points },
            ])
          : JSON.stringify([{ [values.pay_type]: cart.price.total }]),
      };

      try {
        if (values.pay_type === "credit") {
          await cridetPaymet(payload);
          return;
        }
        const res = await orderService.confirmOrder(payload);
        if (res?.status === "success") {
          setOpen(true);
          setOrderId(res.data.id);
          fetchLoyality();
          fetchCart();
          setUsePoints(false);
        }
      } catch (err) {
        console.error("Error confirming order:", err);
        toast.error(err?.message);
      }
    },
    enableReinitialize: true,
  });

  const { values, errors, touched, setFieldValue, handleSubmit } = formik;

  const selectedAddress = addresses.find(
    (a) => a.id === values.selectedAddressId,
  );
  const selectedBranch =
    stores.find((s) => s.id === values.selectedStoreId) || selectedStore;

  const handleTimeChange = (order_time: dayjs.Dayjs | null) => {
    if (order_time) {
      const formatted = order_time.format("h:mm A");
      setFieldValue("order_time", formatted);
    }
  };

  const renderOrderTypeOption = (type: string) => (
    <div key={type} className="w-full">
      <label
        htmlFor={type}
        className="flex h-full cursor-pointer items-center rounded-2xl bg-white px-5 py-4"
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex w-full items-center gap-2">
            <Image
              src={`/assets/icons/${type === "delivery" ? "delivery" : "takeaway"}.svg`}
              alt={type}
              width={32}
              height={32}
            />
            <h3 className="flex-grow capitalize">
              {type === "delivery" ? "Delivery" : "Takeaway"}
            </h3>
          </div>
          <input
            type="radio"
            id={type}
            name="orderType"
            value={type}
            checked={values.orderType === type}
            onChange={() => {
              setFieldValue("orderType", type);
              fetchCart({
                order_type: type,
                address_id: selectedAddress?.id?.toString(),
              });
            }}
            className="h-5 w-5"
          />
        </div>
      </label>
    </div>
  );

  return (
    <>
      {/* Success Dialog */}
      <Success
        open={open}
        onOpenChange={setOpen}
        firstTitle="Go to Order Details"
        firstLink={`order/${orderId}`}
        secondTitle="Continue Shopping"
        secondLink="/checkout"
      />

      <form onSubmit={handleSubmit} className="mx-auto w-full space-y-6 p-6">
        {/* Order Type */}
        <div className="grid grid-cols-1 gap-5 font-semibold md:grid-cols-2">
          {["delivery", "take_away"].map(renderOrderTypeOption)}
        </div>

        {/* Address (if delivery) */}
        {values.orderType === "delivery" && (
          <>
            <h2 className="text-lg font-semibold">Your Shipping Address</h2>
            <div
              onClick={() => {
                setSelectedDialogAddressId(values.selectedAddressId);
                setOpenAddressDialog(true);
              }}
              className="flex cursor-pointer items-center justify-between rounded-lg bg-website-white p-3"
            >
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/images/map.png"
                  alt="map"
                  width={64}
                  height={64}
                  className="rounded-lg"
                />
                <div>
                  <h2 className="font-bold">{selectedAddress?.title}</h2>
                  <p className="text-text-website-font">
                    {selectedAddress?.desc}
                  </p>
                </div>
              </div>
              <Edit className="text-text-website-font" />
            </div>
            {touched.selectedAddressId && errors.selectedAddressId && (
              <p className="text-sm text-red-500">{errors.selectedAddressId}</p>
            )}
          </>
        )}

        {/* Store (if takeaway) */}
        {values.orderType === "take_away" && (
          <>
            <h2 className="text-lg font-semibold">Select Branch</h2>
            <div
              onClick={() => setOpenStoreDialog(true)}
              className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-100 p-3"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={selectedBranch?.image || "/assets/images/store.png"}
                  alt="branch"
                  width={64}
                  height={64}
                  className="rounded-lg h-16"
                />
                <div>
                  <h2 className="font-bold">{selectedBranch?.name}</h2>
                  <p className="text-text-website-font">
                    {selectedBranch?.location_description}
                  </p>
                </div>
              </div>
              <ChevronDown className="text-text-website-font" />
            </div>
            {touched.selectedStoreId && errors.selectedStoreId && (
              <p className="text-sm text-red-500">{errors.selectedStoreId}</p>
            )}
          </>
        )}

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
            <label className="flex items-center gap-2">
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
              className="!w-1/2 rounded-lg !border-none p-3 text-gray-600"
            />

            <TimePicker
              use12Hours
              format="h:mm A"
              onChange={handleTimeChange}
              placeholder="Select Time"
              className="order_time-picker w-1/2 !rounded-lg !border-none !p-3"
            />
          </div>
          {values.is_schedule && (
            <>
              <div className="flex w-full">
                <div className="order_dateerror w-1/2">
                  {" "}
                  {errors.order_date && (
                    <p className="text-sm text-red-500">{errors.order_date}</p>
                  )}
                </div>
                <div className="order_timeerror w-1/2">
                  {errors.order_time && (
                    <p className="text-sm text-red-500">{errors.order_time}</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Payment Method */}
        <div>
          <h2 className="mb-2 text-lg font-semibold">Payment Methods</h2>
          <div className="grid grid-cols-2 gap-4">
            {["credit", "cash"].map((method) => (
              <label
                key={method}
                className="flex cursor-pointer items-center justify-between rounded-2xl  p-4"
              >
                <div className= "flex items-center gap-2 font-semibold rounded-2xl bg-website-white">
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
                  name="pay_type"
                  value={method}
                  checked={values.pay_type === method}
                  onChange={() => setFieldValue("pay_type", method)}
                />
              </label>
            ))}
            {points && points > cart?.price.total ? (
              <label
                key={"points"}
                className="flex cursor-pointer items-center justify-between rounded-2xl  p-4"
              >
                <div className="flex items-center gap-2 font-semibold">
                  <Image
                    src={`/assets/icons/points.svg`}
                    alt={"points"}
                    width={32}
                    height={32}
                  />
                  {/* {method.charAt(0).toUpperCase() + method.slice(1)} */}
                  {points} Points
                </div>
                <input
                  type="radio"
                  name="pay_type"
                  value={"points"}
                  checked={values.pay_type === "points"}
                  onChange={() => setFieldValue("pay_type", "points")}
                />
              </label>
            ) : (
              ""
            )}
          </div>
          {errors.pay_type && (
            <p className="text-sm text-red-500">{errors.pay_type}</p>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary w-1/4 rounded-full py-3 text-white hover:bg-blue-700"
          >
            {isSubmitting ? <Spinner /> : "Confirm"}
          </button>
        </div>

        {/* Address Dialog */}
        <GlobalDialog
          open={openAddressDialog}
          onOpenChange={setOpenAddressDialog}
          title="Select Address"
          footer={
            <button
              className="hover:text-primary hover:border-primary h-10 w-5/6 rounded-full border bg-blue-600 py-2 text-white hover:bg-white"
              onClick={() => {
                if (selectedDialogAddressId) {
                  setFieldValue("selectedAddressId", selectedDialogAddressId);
                  setOpenAddressDialog(false);
                }
              }}
            >
              Confirm
            </button>
          }
        >
          <div className="space-y-4">
            {addresses.map((address) => {
              const isSelected = selectedDialogAddressId === address.id;
              return (
                <div
                  key={address.id}
                  onClick={() => setSelectedDialogAddressId(address.id)}
                  className={`rounded-lg border p-2 transition ${
                    isSelected ? "border-primary bg-blue-50" : "border-gray-200"
                  }`}
                >
                  <AddressItem addr={address} />
                </div>
              );
            })}
          </div>
        </GlobalDialog>

        {/* Store Dialog */}
        <GlobalDialog
          open={openStoreDialog}
          onOpenChange={setOpenStoreDialog}
          title="Select Branch"
          height="!h-fit"
          footer={
            <button
              className="hover:text-primary hover:border-primary h-10 w-5/6 rounded-full border bg-blue-600 py-2 text-white hover:bg-white"
              onClick={() => {
                const selected = stores.find(
                  (s) => s.id === values.selectedStoreId,
                );
                if (selected) setSelectedStore(selected);
                setOpenStoreDialog(false);
              }}
            >
              Confirm
            </button>
          }
        >
          <div className="space-y-4">
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
        </GlobalDialog>
      </form>
    </>
  );
};

export default OrderForm;
