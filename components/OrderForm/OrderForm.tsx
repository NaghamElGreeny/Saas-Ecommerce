"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { ChevronDown, Edit } from "lucide-react";
import { useAddressStore } from "@/stores/addressStore";
import { useStore } from "@/stores/useStore";
import { useCartStore } from "@/stores/cartStore";
import AddressItem from "../shared/AddressItem";
import toast from "react-hot-toast";
// import { useAuthStore } from "@/stores/authStore";
import { orderService } from "@/services/ClientApiHandler";
import Success from "../Success";
import { useLoyalityStore } from "@/stores/loyalityStore";
import GlobalDialog from "../shared/GlobalDialog";
import ScheduleSelector from "./ScheduleSelector";
import OrderTypeSelector from "./OrderTypeSelector";
import { useTranslations } from "next-intl";
import { Spinner } from "../atoms/UI/Spinner";

type OrderFormProps = {
  params: Record<string, string | string[]>;
};

const OrderForm = ({ params }: OrderFormProps) => {
  const t = useTranslations("ORDER_FORM");
  const tGlobalDialog = useTranslations("GLOBAL_DIALOG");

  const { points, fetchLoyality, setUsePoints } = useLoyalityStore();
  const { usePoints } = useLoyalityStore();
  const { addresses, fetchAddresses } = useAddressStore();
  const { stores, selectedStore, setSelectedStore } = useStore();
  const { cart, fetchCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
  // const userData = useAuthStore((s) => s.userData) as UserData;

  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [openStoreDialog, setOpenStoreDialog] = useState(false);
  const [selectedDialogAddressId, setSelectedDialogAddressId] = useState<
    number | null
  >(null);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);
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
          toast.error(error?.message || t('failed_to_confirm_order'));
        }
      }
    })();
  }, [params, cart?.price?.total, fetchCart, setUsePoints, t]);

  const defaultAddress = addresses.find((a) => a.is_default);

  const validationSchema = Yup.object().shape({
    orderType: Yup.string().required(t('order_type_required')),
    is_schedule: Yup.boolean(),
    pay_type: Yup.string().required(t('payment_method_required')),
    selectedAddressId: Yup.number().required(t('address_required')),
    selectedStoreId: Yup.number().required(t('store_required')),
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
        address_id: selectedAddress?.id,
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
        toast.error(err?.message || t('failed_to_confirm_order'));
      } finally {
        setIsSubmitting(false);
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

  return (
    <>
      <Success
        open={open}
        onOpenChange={setOpen}
        firstTitle={t('go_to_order_details')}
        firstLink={`order/${orderId}`}
        secondTitle={t('continue_shopping')}
        secondLink="/checkout"
      />

      <form onSubmit={handleSubmit} className="mx-auto w-full space-y-6 p-6">
        <OrderTypeSelector
          value={values.orderType}
          onChange={(type: string) => {
            setFieldValue("orderType", type);
            fetchCart({
              order_type: type,
              address_id: selectedAddress?.id?.toString(),
            });
          }}
        />

        {values.orderType === "delivery" && (
          <>
            <h2 className="text-lg font-semibold">{t('your_shipping_address')}</h2>
            <div
              onClick={() => {
                setSelectedDialogAddressId(values.selectedAddressId);
                setOpenAddressDialog(true);
              }}
              className="flex cursor-pointer items-center justify-between rounded-2xl bg-website-white p-3"
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

        {values.orderType === "take_away" && (
          <>
            <h2 className="text-lg font-semibold">{t('select_branch')}</h2>
            <div
              onClick={() => setOpenStoreDialog(true)}
              className="flex cursor-pointer items-center justify-between rounded-2xl bg-gray-100 p-3"
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

        <ScheduleSelector
          values={values}
          errors={errors}
          setFieldValue={setFieldValue}
        />

        <div>
          <h2 className="mb-2 text-lg font-semibold">{t('payment_methods')}</h2>
          <div className="grid grid-cols-2 gap-4">
            {["credit", "cash"].map((method) => (
              <label
                key={method}
                className="flex cursor-pointer items-center justify-between rounded-2xl p-4"
              >
                <div className="flex items-center gap-2 font-semibold rounded-2xl bg-website-white">
                  <Image
                    src={`/assets/icons/${method}.svg`}
                    alt={method}
                    width={32}
                    height={32}
                  />
                  {method === "credit" ? t('credit_method') : t('cash_method')}
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
                className="flex cursor-pointer items-center justify-between rounded-2xl p-4"
              >
                <div className="flex items-center gap-2 font-semibold">
                  <Image
                    src={`/assets/icons/points.svg`}
                    alt={"points"}
                    width={32}
                    height={32}
                  />
                  {t('points_method', { points: points })}
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

        <div className="flex justify-end">
          <button
            type="submit"
            className={`confirm-btn ${isSubmitting ?'!bg-white':''} w-1/4 rounded-full py-3 `}
          >
            {isSubmitting ? <Spinner variant="primary"/> : t('confirm_button')}
          </button>
        </div>

        <GlobalDialog
          open={openAddressDialog}
          onOpenChange={setOpenAddressDialog}
          title={t('select_address')}
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
              {tGlobalDialog('confirm_button')}
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

        <GlobalDialog
          open={openStoreDialog}
          onOpenChange={setOpenStoreDialog}
          title={t('select_branch')}
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
              {tGlobalDialog('confirm_button')}
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