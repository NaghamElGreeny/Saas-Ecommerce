'use client';

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";

export default function VerifyPage() {
    const [code, setCode] = useState<string[]>(['', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(96); // 96 seconds
    const [userPhone, setUserPhone] = useState('');
    const router = useRouter();
    const pathname = usePathname();
    const locale = pathname.split('/')[1];

    useEffect(() => {
        // جلب رقم الهاتف من localStorage
        const userData = localStorage.getItem('userData');
        if (userData) {
            const user = JSON.parse(userData);
            setUserPhone(user.phone);
        }
    }, []);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const fullCode = code.join('');
        console.log('Verification code:', fullCode);

        // كود التحقق الوهمي الصحيح
        const correctCode = "1234";

        if (fullCode === correctCode) {
            toast.success('Phone verified successfully!');

            // تحديث حالة المستخدم في localStorage
            const userData = localStorage.getItem('userData');
            if (userData) {
                const user = JSON.parse(userData);
                user.verified = true;
                localStorage.setItem('userData', JSON.stringify(user));
                localStorage.setItem('token', 'mock-token'); // حفظ التوكن عند التحقق الناجح
            }

            router.push(`/${locale}/`);
        } else {
            toast.error('Invalid verification code. Please try again.');
        }
    };

    return (
        <div className="bg-white flex w-full h-screen overflow-hidden">
            <div className="w-1/2 hidden md:block">
                <img
                    src="/assets/images/auth-image.png"
                    alt="login"
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="bg-red w-full md:w-1/2 relative">
                <div className="rtl:left-3.5 ltr:right-3.5 absolute w-full h-full px-[120px] py-[320px] rounded-2xl z-20 bg-white flex flex-col justify-center">
                    <div className="flex mb-6">
                        <img src="/assets/images/mea-logo.png" alt="Logo" className="w-[154px] h-[115px]" />
                    </div>
                    <h2 className="text-xl font-bold mb-4">Enter Verification Code</h2>
                    <p className="text-sm mb-6">We've sent a code to your phone number: <strong>{userPhone}</strong></p>
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
                                Didn't receive code? <span className="text-blue-600 cursor-pointer" onClick={() => {
                                    toast.success('Code resent!');
                                    setTimeLeft(96);
                                }}>Resend</span>
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
                </div>
            </div>
        </div>
    );
}
