"use client";
import { useState } from "react";
import { CreditCard, DollarSign } from "lucide-react";

interface Props {
  selectedMethod: string;
  onSelect: (method: string) => void;
}

const paymentMethods = [
  { id: "card", label: "بطاقة بنكية", icon: CreditCard },
  { id: "cash", label: "نقدًا عند الاستلام", icon: DollarSign },
];

const PaymentMethodSelector = ({ selectedMethod, onSelect }: Props) => {
  const [selected, setSelected] = useState(selectedMethod);

  const handleSelect = (method: string) => {
    setSelected(method);
    onSelect(method);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold">طريقة الدفع</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {paymentMethods.map(({ id, label, icon: Icon }) => (
          <div
            key={id}
            onClick={() => handleSelect(id)}
            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition hover:shadow-sm ${
              selected === id ? "border-primary bg-blue-50" : "border-gray-200"
            }`}
          >
            <Icon className="text-blue-600" />
            <span className="font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
