import { ErrorMessage } from "formik";
import GlobalDialog from "@/components/shared/GlobalDialog";
import { useState } from "react";
import toast from "react-hot-toast";
import { Store } from "@/utils/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BranchGuestSelector({ values, setFieldValue, stores }: any) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex gap-4">
        <select
          name="guest_number"
          className="reserve w-1/2 p-3"
          onChange={(e) => setFieldValue("guest_number", e.target.value)}
          value={values.guest_number}
        >
          {[...Array(10).keys()].map((n) => (
            <option key={n + 1} value={n + 1}>
              {n + 1}
            </option>
          ))}
        </select>

        <button type="button" className="reserve w-full p-3 text-left" onClick={() => setOpen(true)}>
          {stores.find((s: Store) => s.id.toString() === values.store_id)?.name || "Select Branch"}
        </button>
      </div>

      <ErrorMessage name="guest_number" component="div" className="text-sm text-red-500" />

      <GlobalDialog open={open} onOpenChange={setOpen} title="Branches" height="h-[300px]">
        <div className="space-y-2">
          {stores.map((store: Store) => (
            <label
              key={store.id}
              className={`flex cursor-pointer items-start gap-3 border p-4 rounded-lg ${
                values.store_id === store.id.toString() ? "border-blue-500 bg-blue-50" : "border-gray-200"
              }`}
            >
              <input
                type="radio"
                name="store_id"
                value={store.id}
                checked={values.store_id === store.id.toString()}
                onChange={() => setFieldValue("store_id", store.id.toString())}
                className="mt-1"
              />
              <div>
                <h3 className="font-medium">{store.name}</h3>
                <p className="text-sm text-gray-600">{store.location_description}</p>
              </div>
            </label>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            values.store_id ? setOpen(false) : toast.error("Please select a branch.")
          }
          className="mt-3 w-1/2 rounded-full bg-blue-500 px-4 py-2 text-white"
        >
          Confirm
        </button>
      </GlobalDialog>
    </>
  );
}
