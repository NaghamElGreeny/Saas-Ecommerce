"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
// import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { FaArrowRight, FaPhone } from "react-icons/fa";
import Image from "next/image";
import clsx from "clsx";

// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

import MessageTypeSelect from "../MessageTypeSelect";
import PhoneCodeSelect from "../PhoneCodeSelect";
import { contactUs, locationService } from "@/services/ClientApiHandler";
import { BrandCountry } from "@/utils/types";
import toast from "react-hot-toast";
import { useWebsiteStore } from "@/stores/useWebsiteStore";
import { PhoneNumber } from "@/utils/webSettingsTypes";
import dynamic from "next/dynamic";

// Fix leaflet marker icon
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x.src,
//   iconUrl: markerIcon.src,
//   shadowUrl: markerShadow.src,
// });
interface GeoAddress {
  lat: number;
  lng: number;
  location: string;
}

const ContactForm = () => {
  const [countryCodes, setCountryCodes] = useState<BrandCountry[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<BrandCountry | null>(
    null,
  );
  const { getContact } = useWebsiteStore();
  const phoneNumbers = getContact("phone_number") as PhoneNumber[];
  const firstPhone =
    Array.isArray(phoneNumbers) && phoneNumbers.length > 0
      ? phoneNumbers[0]
      : null;
  const address = getContact("store_address");
  console.log(address);
  function isGeoAddress(value: unknown): value is GeoAddress {
    return (
      typeof value === "object" &&
      value !== null &&
      "lat" in value &&
      "lng" in value &&
      "location" in value
    );
  }

  const LeafletMap = dynamic(() => import("../LeafletMap"), {
    ssr: false, // مهم عشان Leaflet مش شغال على السيرفر
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const codes = await locationService.getCountryCodes();
        setCountryCodes(codes);
        setSelectedCountry(codes[0]);
        formik.setFieldValue("phone_code", codes[0].phone_code);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required("Full Name is required"),
    phone_code: Yup.string().required("Phone code is required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^[0-9]+$/, "Phone must be only numbers")
      .test("len", "Phone number is invalid", function (value) {
        const { phone_code } = this.parent;
        const country = countryCodes.find((c) => c.phone_code === phone_code);

        if (!value || !country || !country.phone_limit) return false;

        return value.length === country.phone_limit;
      }),
    message_type: Yup.string().required("Type of message is required"),
    message: Yup.string().required("Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      full_name: "",
      phone_code: "",
      phone: "",
      message_type: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        type ContactUsResponse = {
          status?: string;
          message?: string;
          messages?: Record<string, string[]>;
        };
        const res = (await contactUs(values)) as ContactUsResponse;

        if (res?.status === "success") {
          toast.success(res.message);
          resetForm();
        } else {
          const mainMessage = res?.message || "Something went wrong.";
          const fieldMessages = res?.messages
            ? Object.values(res.messages).flat().join("\n")
            : "";

          toast.error(`${mainMessage}\n${fieldMessages}`);
        }
      } catch {
        toast.error("Unexpected error occurred. Please try again.");
      }
    },
  });
  return (
    <div className="container mt-10 rounded-lg bg-white">
      <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="space-y-6 p-8">
          <h2 className="text-4xl font-bold">Contact Us</h2>
          <p className="text-gray-500">
            Contact us through the following steps
          </p>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                className={clsx(
                  "w-full !rounded-md !border !border-gray-300 !bg-[var(--website_white_color)] !p-3",
                  formik.touched.full_name && formik.errors.full_name
                    ? "border-red-500"
                    : "border-gray-300",
                )}
                {...formik.getFieldProps("full_name")}
              />
              {formik.touched.full_name && formik.errors.full_name && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.full_name}
                </p>
              )}
            </div>

            {/* Phone Field with Country Code */}
            <div>
              <PhoneCodeSelect
                formik={formik}
                countries={countryCodes}
                selected={selectedCountry}
                onSelect={(country) => {
                  setSelectedCountry(country);
                  formik.setFieldValue("phone_code", country.phone_code);
                  formik.setFieldTouched("phone", false);
                }}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.phone}
                </p>
              )}
            </div>

            {/* Message Type */}
            <div>
              <MessageTypeSelect
                field={formik.getFieldProps("message_type")}
                formik={formik}
              />
              {formik.touched.message_type && formik.errors.message_type && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.message_type}
                </p>
              )}
            </div>
            {/* Message Field */}
            <div>
              <textarea
                name="message"
                rows={6}
                placeholder="Enter your message here"
                className={clsx(
                  "w-full resize-none rounded-md border p-3",
                  formik.touched.message && formik.errors.message
                    ? "border-red-500"
                    : "border-gray-300",
                )}
                {...formik.getFieldProps("message")}
              />
              {formik.touched.message && formik.errors.message && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.message}
                </p>
              )}
            </div>

            <div className="flex w-full justify-end">
              <button
                type="submit"
                className="confirm-btn mt-5 flex items-center justify-center gap-2 rounded-full px-9 py-5"
              >
                Send Message <FaArrowRight />
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Map Placeholder */}
        <div className="ps-8">
          <div className="z-0 h-[350px] rounded-md bg-green-400 lg:h-[725px]">
            {isGeoAddress(address) ? (
              <LeafletMap
                lat={+address.lat}
                lng={+address.lng}
                loc={address.location}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-white">
                Location not available
              </div>
            )}
          </div>
        </div>
        <div className="absolute -top-9 right-1 z-40">
          <div className="phoneContainer bg-primary group flex max-h-[70px] rounded-full p-3 hover:ps-8 hover:pr-4">
            <div className="hidden w-[200px] ps-2 text-white group-hover:block">
              <p className="font-bold">Call Center</p>
              <a
                href={`tel:${firstPhone?.phone_code}${firstPhone?.phone}`}
                className="flex items-center gap-2"
              >
                <Image
                  src={firstPhone?.flag}
                  alt="flag"
                  width={24}
                  height={20}
                  className="h-5 w-6"
                />
                ({firstPhone?.phone_code}) {firstPhone?.phone}
              </a>
            </div>
            <div className="flex h-[47px] w-[47px] items-center justify-center rounded-full bg-white">
              <FaPhone className="text-primary text-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
