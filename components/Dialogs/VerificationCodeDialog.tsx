import { useState } from "react";
import { Button } from "../atoms";

import toast from "react-hot-toast";
import { userService } from "@/services/ClientApiHandler";


interface Props {
  newPhone: { phone: string; phone_code: string } | null;
  onClose: () => void;
}

const VerificationCodeDialog = ({ newPhone, onClose }: Props) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleInputChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto focus next
      if (value && index < 3) {
        const next = document.getElementById(`code-${index + 1}`);
        next?.focus();
      }
    }
  };

  const handleSubmit = async () => {
    if (code.some((c) => c === "")) {
      toast.error("Please enter the full code");
      return;
    }

    try {
      setIsSubmitting(true);
      const finalCode = code.join("");
      const payload = {
        phone: newPhone?.phone || "",
        phone_code: newPhone?.phone_code || "",
        verification_code: finalCode,
      };
      await userService.updatePhone(payload);
        toast.success("Phone updated successfully");
      onClose();
    } catch (error) {
      const msg = error?.response?.data?.message || "Verification failed";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 mt-6">
      <div className="flex justify-between gap-2">
        {code.map((digit, index) => (
          <input
            key={index}
            id={`code-${index}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className="w-14 h-14 rounded-xl text-center text-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ))}
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full"
        loading={isSubmitting}
      >
        Verify
      </Button>
    </div>
  );
};

export default VerificationCodeDialog;
