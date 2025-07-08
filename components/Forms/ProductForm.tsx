"use client";

import { Formik, Form, Field } from "formik";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { cartService } from "@/services/ClientApiHandler";
import ModifierSection from "@/components/Modifiers";
import { Textarea } from "@/components/ui/textarea";
import { Modifier } from "@/utils/types";
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import Success from "../Success";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { Spinner } from "../atoms";

const ProductForm = ({
  productId,
  modifiers,
}: {
  productId: number;
  modifiers: Modifier[];
}) => {
  const getModifiersResultRef = useRef<
    () =>
      | {
          item_modifier_id: number;
          sub_modifier_id: number;
          quantity: number;
        }[]
      | null
  >(null);

  const [open, setOpen] = useState(false);
  const storeid = Cookies.get("store_id");
  const { cart, fetchCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const t = useTranslations("cart");
  const initialValues = {
    store_id: parseInt(storeid || "1"),
    product_id: productId,
    quantity: 1,
    note: "",
    sub_modifiers: [],
  };

  const handleSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    try {
      const sub_modifiers = getModifiersResultRef.current?.() ?? [];

      const payload = {
        store_id: values.store_id,
        product_id: values.product_id,
        quantity: values.quantity,
        note: values.note,
        sub_modifiers,
      };

      console.log("payload", payload);
      await cartService.addToCart(payload);
      fetchCart();
      setOpen(true);
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";
      if (typeof error === "object" && error !== null) {
        if (
          "response" in error &&
          typeof (error as { response?: { data?: { message?: string } } })
            .response === "object" &&
          (error as { response?: { data?: { message?: string } } }).response !==
            null
        ) {
          const err = error as {
            response?: { data?: { message?: string } };
            message?: string;
          };
          errorMessage =
            err.response?.data?.message || err.message || errorMessage;
        } else if ("message" in error) {
          const err = error as { message?: string };
          errorMessage = err.message || errorMessage;
        }
      }

      toast.error(errorMessage, {
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Success Dialog */}
      <Success
        open={open}
        onOpenChange={setOpen}
        firstTitle="Go to Checkout"
        firstLink="/checkout"
        secondTitle="Continue Shopping"
        secondLink="/"
      />

      {/* Formik Form */}
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form>
            {/* Note */}
            <div className="note mb-6 w-full">
              <h3 className="mb-6 text-2xl font-bold">{t( "note_label")}</h3>
              <Field
                as={Textarea}
                name="note"
                placeholder={t("note_placeholder")}
                className="!h-20"
              />
            </div>

            {/* Modifiers */}
            <ModifierSection
              modifiers={modifiers}
              onGetCurrentResult={(fn) => {
                getModifiersResultRef.current = fn;
              }}
            />

            {/* Quantity & Submit */}
            <div className="p-6">
              <div className="flex h-12 items-center justify-end gap-2">
                <div className="bg-bg flex h-full items-center space-x-3 rounded-2xl">
                  <button
                    type="button"
                    onClick={() =>
                      setFieldValue(
                        "quantity",
                        Math.max(1, values.quantity - 1),
                      )
                    }
                    className="flex h-8 w-8 cursor-pointer items-center justify-center hover:bg-gray-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-medium">{values.quantity}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFieldValue("quantity", values.quantity + 1)
                    }
                    className="text-text-website-font flex h-8 w-8 cursor-pointer items-center justify-center hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  type="submit"
                  className="cartadd h-full gap-1 rounded-md !px-2 !py-1 md:w-[410px] md:gap-3 md:px-5 md:py-4"
                >
                  {loading ? (
                    <span className="animate-pulse">
                      <Spinner variant="primary" />
                    </span>
                  ) : (
                    <>
                      <ShoppingBag size={20} />
                      <p>{t("add-to-cart")}</p>
                      <p className="text-[22px] font-bold">
                        {cart?.price.total}{" "}
                        <span className="ms-1 text-[14px] font-thin">
                          {cart?.currency}
                        </span>{" "}
                      </p>
                    </>
                  )}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ProductForm;
