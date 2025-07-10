"use client";

import { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addressService } from "@/services/ClientApiHandler";
import toast from "react-hot-toast";
import GoogleMapSelector from "../shared/GoogleMap";
import { useTranslations } from "next-intl"; 

const AddressForm = ({
  isUpdate = false,
  initialData,
  onSuccess,
}: {
  isUpdate?: boolean;
  initialData?: {
    id?: number;
    lat: number;
    lng: number;
    is_default?: boolean;
    desc?: string;
    title?: string;
    building?: number | string;
    floor?: number | string;
    apartment?: number | string;
  };
  onSuccess?: () => void;
}) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    initialData ? { lat: initialData.lat, lng: initialData.lng } : null,
  );
  const searchInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("ADDRESS_FORM"); 

  const validationSchema = Yup.object({
    address: Yup.string().min(3, t("min_characters_error")).required(t("required_field_error")),
    title: Yup.string().min(3, t("min_characters_error")).required(t("required_field_error")),
    building: Yup.number().required(t("required_field_error")),
    floorNo: Yup.number().required(t("required_field_error")),
    apartment: Yup.number().required(t("required_field_error")),
  });

  return (
    <div className="h-full w-full space-y-6 overflow-y-auto rounded-3xl bg-white p-6">
      <h2 className="mb-4 text-xl font-semibold">
        {isUpdate ? t("edit_address_title") : t("add_new_address_title")}
      </h2>

      <Formik
        initialValues={{
          isDefault: initialData?.is_default ?? false,
          address: initialData?.desc ?? "",
          title: initialData?.title ?? "",
          building: initialData?.building ?? "",
          floorNo: initialData?.floor ?? "",
          apartment: initialData?.apartment ?? "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          if (!location) {
            toast.error(t("select_location_error"));
            return;
          }

          const payload = {
            title: values.title,
            lat: location.lat,
            lng: location.lng,
            desc: values.address,
            is_default: values.isDefault,
            building: values.building,
            floor: values.floorNo,
            apartment: values.apartment,
          };

          if (!values.isDefault) delete payload.is_default;

          try {
            if (isUpdate && initialData?.id) {
              await addressService.updateAddress(initialData.id, payload);
              toast.success(t("address_updated_success"));
            } else {
              await addressService.addAddress(payload);
              toast.success(t("address_saved_success"));
              resetForm();
              setLocation(null);
            }
            onSuccess?.(); 
          } catch (error) {
            toast.error(t("failed_to_save_address"));
            console.error(error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="h-full space-y-4">
            <div className="flex items-center gap-2">
              <Field type="checkbox" name="isDefault" className="!size-5" />
              <label htmlFor="isDefault">{t("default_address_label")}</label>
            </div>

            <div>
              <label className="mb-1 block font-medium">{t("address_label")}</label>
              <Field
                innerRef={searchInputRef}
                name="address"
                placeholder={t("address_placeholder")}
                className="w-full rounded border p-2"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <div className="overflow-hidden rounded">
              <GoogleMapSelector
                onLocationSelect={(coords) => {
                  setLocation(coords);
                }}
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">{t("title_label")}</label>
              <Field
                name="title"
                placeholder={t("title_placeholder")}
                className="w-full rounded border p-2"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">{t("building_label")}</label>
              <Field
                name="building"
                type="number"
                className="w-full rounded border p-2"
              />
              <ErrorMessage
                name="building"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block font-medium">{t("floor_label")}</label>
                <Field
                  name="floorNo"
                  type="number"
                  className="w-full rounded border p-2"
                />
                <ErrorMessage
                  name="floorNo"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div>
                <label className="mb-1 block font-medium">{t("apartment_label")}</label>
                <Field
                  name="apartment"
                  type="number"
                  className="w-full rounded border p-2"
                />
                <ErrorMessage
                  name="apartment"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:text-primary hover:border-primary w-full rounded-full py-3 text-white hover:border-2 hover:bg-white"
            >
              {isSubmitting ? t("saving_button") : t("save_button")}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddressForm;