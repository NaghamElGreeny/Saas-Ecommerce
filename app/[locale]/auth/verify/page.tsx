'use client';

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { useVerificationStore } from '@/stores/useVerificationStore';

export default function VerifyPage() {
    const [code, setCode] = useState<string[]>(['', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(96);
    const router = useRouter();
    const pathname = usePathname();
    const locale = pathname.split('/')[1];

    const verificationType = useVerificationStore(state => state.verificationType);
    const phone = useVerificationStore(state => state.phone);

    useEffect(() => {
        if (!verificationType || !phone) {
            toast.error("Verification info missing, please try again.");
            router.push(`/${locale}/`); // ارجع للصفحة الرئيسية أو المناسبة
        }
    }, [verificationType, phone, router, locale]);

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

        if (!verificationType) {
            toast.error('Verification type not specified');
            return;
        }

        const fullCode = code.join('');

        let url = '';
        if (verificationType === 'register') {
            url = '/auth/verify_phone';
        } else if (verificationType === 'forgot_password') {
            url = '/auth/verify_forgot_password_code';
        }

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phone,
                    code: fullCode,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                toast.error(errorData.message || 'Verification failed');
                return;
            }

            const data = await res.json();
console.log('Verification response:', data);
            toast.success('Phone verified successfully!');

            // تحديث حالة المستخدم في الـ store أو أي مكان آخر حسب تصميمك
            // مثلاً، ممكن تحط حالة verified في store لو حابب

            router.push(`/${locale}/`);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong');
        }
    };

    return (
        <div className="bg-white flex w-full h-screen overflow-hidden">
            <div className="w-1/2 hidden md:block">
                <Image
                    src="/assets/images/auth-image.png"
                    alt="login"
                    fill
                    className="h-full w-full object-cover"
                    style={{ objectFit: 'cover' }}
                    priority
                />
            </div>

            <div className="bg-red w-full md:w-1/2 relative">
                <div className="rtl:left-3.5 ltr:right-3.5 absolute w-full h-full px-[120px] py-[320px] rounded-2xl z-20 bg-white flex flex-col justify-center">
                        <Image
                            src="/assets/images/mea-logo.png"
                            alt="Logo"
                            width={154}
                            height={115}
                            className="w-[154px] h-[115px]"
                            priority
                        />
                        {/* <img src="/assets/images/mea-logo.png" alt="Logo" className="w-[154px] h-[115px]" /> */}
                    </div>
                    <h2 className="text-xl font-bold mb-4">Enter Verification Code</h2>
                    <p className="text-sm mb-6">We&apos;ve sent a code to your phone number: <strong>{phone}</strong></p>
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
                                Didn&apos;t receive code? <span className="text-blue-600 cursor-pointer" onClick={() => {
                                    toast.success('Code resent!');
                                    setTimeLeft(96);
                                    // هنا ممكن تعمل إعادة إرسال كود بالapi حسب verificationType
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
        // </div>
    );
}
