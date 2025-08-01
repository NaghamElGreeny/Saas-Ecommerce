"use client";
import { Menu } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";
import { BrandCountry } from "@/utils/types";
import { FormikProps } from "formik";
type PhoneFormValues = {
  phone: string;
  phone_code: string;
};
type Props = {
  formik: FormikProps<PhoneFormValues>;
  countries: BrandCountry[];
  selected: BrandCountry | null;
  onSelect: (country: BrandCountry) => void;
};

const PhoneCodeSelect: React.FC<Props> = ({
  formik,
  countries,
  selected,
  onSelect,
}) => {
  const phoneError =
    formik.touched.phone && typeof formik.errors.phone === "string"
      ? formik.errors.phone
      : null;

  return (
    <div>
      <div className="flex items-center gap-2">
        {/* Phone Code Selector */}
        <div className="w-24">
          <Menu as="div" className="relative w-full">
            {({ open }) => (
              <>
                <Menu.Button
                  className={clsx(
                    "flex w-full items-center justify-between !rounded-md !border !bg-[var(--website_white_color)] !border-gray-300 !p-3  text-sm font-medium",
                    phoneError ? "border-red-500" : "border-gray-300"
                  )}
                >
                  <span className="flex items-center gap-2 text-black">
                    {selected ? (
                      <>
                        <Image
                          src={selected.flag}
                          alt={selected.name}
                          width={20}
                          height={16}
                          className="rounded-sm"
                        />
                        +{selected.phone_code}
                      </>
                    ) : (
                      <span className="text-gray-400">Code</span>
                    )}
                  </span>
                  {open ? (
                    <ChevronUpIcon className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                  )}
                </Menu.Button>

                <Menu.Items className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-md border border-black/10 bg-white shadow-lg">
                  {countries.map((country) => (
                    <Menu.Item key={country.id} as={Fragment}>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={() => {
                            onSelect(country);
                            formik.setFieldValue("phone_code", country.phone_code);
                          }}
                          className={clsx(
                            "flex w-full items-center gap-3 px-4 py-2 text-sm text-left",
                            active ? "bg-gray-100" : ""
                          )}
                        >
                          <Image
                            src={country.flag}
                            alt={country.name}
                            width={20}
                            height={16}
                            className="rounded-sm"
                          />
                          <span className="ml-auto text-gray-500">+{country.phone_code}</span>
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </>
            )}
          </Menu>
        </div>

        {/* Phone Number Input */}
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          className={clsx(
            "flex-1 !rounded-md !border !p-3 !bg-[var(--website_white_color)] !border-gray-300",
            phoneError ? "border-red-500" : "border-gray-300"
          )}
          {...formik.getFieldProps("phone")}
        />
      </div>

      {/* Phone Error */}
      {/* {phoneError && (
        <p className="mt-1 text-sm text-red-500">{phoneError}</p>
      )} */}
    </div>
  );
};

export default PhoneCodeSelect;
