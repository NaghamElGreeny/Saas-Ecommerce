'use client'
import { verifyCode } from "@/services/ClientApiHandler";
import { useVerificationStore } from "@/stores/useVerificationStore";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { set } from "react-hook-form";
import toast from "react-hot-toast";

export default function VerifyCode() {
        const [code, setCode] = useState<string[]>(['', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(96);
    const router = useRouter();
    const pathname = usePathname();
    const locale = pathname.split('/')[1];

    const verificationType = useVerificationStore(state => state.verificationType);
    const phone = useVerificationStore(state => state.phone);
    const phoneCode = useVerificationStore(state => state.phoneCode); 
      const setVerificationData = useVerificationStore((state) => state.setVerificationData);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    const formattedTime = `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`;

    const handleChange = (index: number, value: string) => {
        if (/^\d*$/.test(value) && value.length <= 1) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (value && index < 3) {
                const nextInput = document.getElementById(`code-${index + 1}`) as HTMLInputElement;
                if (nextInput) nextInput.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`) as HTMLInputElement;
            if (prevInput) prevInput.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();



  const fullCode = code.join('');
setVerificationData({
    phoneCode: phoneCode,
    phone: phone,
    verification_code: fullCode,
    verificationType: verificationType,
})
  try {
    const data = await verifyCode({
      phone_code: phoneCode,
      phone:phone,
      verification_code: fullCode,
      reset_code: fullCode,
      verificationType,
    });
    
    console.log('Verification response:', data);
    toast.success('Phone verified successfully!');
    if (verificationType === 'register') {
        router.push(`/${locale}/`)
    } else {
        router.push('/auth/reset-password');
    }
        // router.push(`/${locale}/`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    toast.error(error.message || 'Something went wrong');
  }
};

  return (
    <>
         <h2 className="font-bold lg:text-4xl text-3xl mb-4">Enter Verification Code</h2>
         <p className="text-sub mb-3">
           We&apos;ve sent a code to your phone number: <strong>{phone}</strong>
        </p>
        <form onSubmit={handleSubmit} className="mb-6">
                        <div className="flex justify-center gap-8 w-full mb-8 p-8">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`code-${index}`}
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="size-[88px] text-3xl text-center border-2 text-primary border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                    placeholder="_"
                                />
                            ))}
                        </div>

                        <div className="flex justify-between">
                            <p className="text-center text-gray-500 mb-8">
                                Didn&apos;t receive code?{' '}
                                <span
                                    className="text-blue-600 cursor-pointer"
                                    onClick={() => {
                                        toast.success('Code resent!');
                                        setTimeLeft(96);
                                    }}
                                >
                                    Resend
                                </span>
                            </p>
                            <p className="text-center text-black mb-8">{formattedTime}</p>
                        </div>

                         <button
                            type="submit"
                            className="w-full py-3 mt-2 text-white font-semibold rounded-full transition duration-300 bg-blue-600 hover:bg-blue-700"
                        >
                            Verify
                        </button>
                    </form>

    </>
);
}