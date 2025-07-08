import { Country } from "@/stores/authStore";
import { Field, ErrorMessage } from "formik";
import { ChevronDown } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ContactInfoFields({ values, setFieldValue, handleBlur, countryCodes }: any) {
  return (
    <>
      <Field name="name" placeholder="Name" className="reserve w-full p-3" />
      <ErrorMessage name="name" component="div" className="text-sm text-red-500" />

      <div className="flex gap-2">
        <div className="relative w-28">
          <select
            name="phone_code"
            value={values.phone_code}
            onChange={(e) => setFieldValue("phone_code", e.target.value)}
            onBlur={handleBlur}
            className="w-full rounded-xl border p-3"
          >
            {countryCodes.map((c: Country) => (
              <option key={c.id} value={c.phone_code}>
                +{c.phone_code}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500">
            <ChevronDown size={18} />
          </div>
        </div>

        <Field
          name="phone"
          type="tel"
          placeholder="Phone"
          className="w-full rounded-md border p-3"
        />
      </div>
      <ErrorMessage name="phone" component="div" className="text-sm text-red-500" />
    </>
  );
}
