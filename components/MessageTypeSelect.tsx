"use client";
import { Menu } from "@headlessui/react";
import { Fragment } from "react";
import { FieldInputProps, FormikProps } from "formik";
import clsx from "clsx";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

type Option = {
  value: string;
  label: string;
};

type Props = {
  field: FieldInputProps<string>;
  formik: FormikProps<any>;
  label?: string;
};

const options: Option[] = [
  { value: "complaint", label: "Complaint" },
  { value: "suggestion", label: "Suggestion" },
  { value: "inquiry", label: "Inquiry" },
  { value: "other", label: "Other" },
];

const MessageTypeSelect: React.FC<Props> = ({
  field,
  formik,
  label = "Choose Type Of Message",
}) => {
  const selected = options.find((o) => o.value === field.value);
  const error = formik.touched[field.name] && formik.errors[field.name];

  const handleSelect = (value: string) => {
    formik.setFieldTouched(field.name, true);
    formik.setFieldValue(field.name, value);
  };

  return (
    <div className="w-full">
      <Menu as="div" className="relative w-full">
        {({ open }) => (
          <>
            <Menu.Button
               onClick={() => formik.setFieldTouched(field.name, true)}
              className={clsx(
                "flex w-full items-center justify-between !rounded-md border !p-3 !bg-[var(--website_white_color)] !border-gray-300 text-sm font-medium",
                error ? "border-red-500" : "border-gray-300"
              )}
            >
              <span
                className={clsx(
                  selected ? "text-black" : "text-gray-400"
                )}
              >
                {selected ? selected.label : label}
              </span>
              {open ? (
                <ChevronUpIcon className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDownIcon className="h-4 w-4 text-gray-500" />
              )}
            </Menu.Button>

            <Menu.Items className="absolute z-40 mt-2 max-h-60 w-full origin-top-right overflow-y-auto rounded-md border-[.5px] border-black/10 bg-white shadow-lg focus:outline-none">
              {options.map((option) => (
                <Menu.Item key={option.value} as={Fragment}>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={() => handleSelect(option.value)}
                      className={clsx(
                        "block w-full px-4 py-3 text-left text-sm border-b-[.5px] border-black/10",
                        active ? "bg-gray-100 text-black" : "text-gray-800"
                      )}
                    >
                      {option.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </>
        )}
      </Menu>

      {/* {error && (
        <p className="mt-1 text-sm text-red-500">
          {typeof formik.errors.message_type === "string"
            ? formik.errors.message_type
            : "Invalid input"}
        </p>
      )} */}
    </div>
  );
};


export default MessageTypeSelect;
