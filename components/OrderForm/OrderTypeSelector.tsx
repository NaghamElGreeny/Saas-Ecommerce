"use client";
import Image from "next/image";

const OrderTypeSelector = ({ value, onChange }) => {
  const orderTypes = ["delivery", "take_away"];

  return (
    <div className="grid grid-cols-2 gap-5 font-semibold ">
      {orderTypes.map((type) => (
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
                  className="w-8 h-8"
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
                checked={value === type}
                onChange={() => onChange(type)}
                className="h-5 w-5"
              />
            </div>
          </label>
        </div>
      ))}
    </div>
  );
};

export default OrderTypeSelector;