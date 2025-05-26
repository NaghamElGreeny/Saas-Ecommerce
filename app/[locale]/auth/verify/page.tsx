'use client';

export default function VerifyPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="bg-white text-black p-8 rounded-xl w-full max-w-md shadow-lg">
                <h2 className="text-xl font-bold mb-4">Enter Verification Code</h2>
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
    );
}
