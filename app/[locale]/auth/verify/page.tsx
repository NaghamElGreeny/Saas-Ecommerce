'use client';

export default function VerifyPage() {
    return (
        <div className="bg-white  flex w-full h-screen overflow-hidden">
            <div className="w-1/2 hidden md:block">
                <img
                    src="/assets/images/auth-image.png"
                    alt="login"
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="bg-red w-full md:w-1/2 relative">
                <div className="rtl:left-3.5 ltr:right-3.5 absolute w-full h-full p-8 rounded-2xl z-20 bg-white flex flex-col  justify-center">                <h2 className="text-xl font-bold mb-4">Enter Verification Code</h2>
                    <p className="text-sm mb-6">We've sent a code to your phone number.</p>
                    <form className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Enter 4-digit code"
                            className="border p-2 rounded-md"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                        >
                            Verify
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
