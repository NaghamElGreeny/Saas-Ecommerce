'use client';

import { useForm } from 'react-hook-form';

type FormData = {
    name: string;
    phone: string;
    persons: string;
    branch: string;
    timeFrom: string;
    timeTo: string;
    date: string;
};

export default function ReservationForm() {
    const { register, handleSubmit, reset } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log('Form Data:', data);
        alert('Reservation submitted!');
        reset();
    };

    return (
        <div className="relative bg-[#f5f1ee] min-h-screen flex items-center justify-center px-4">
            {/* Decorations */}
            <img src="/left-plate.png" alt="" className="absolute top-1/4 left-0 w-28 md:w-40" />
            <img src="/right-plate.png" alt="" className="absolute top-1/4 right-0 w-28 md:w-40" />
            <img src="/bottom-plate.png" alt="" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 md:w-44" />
            <img src="/top-plate.png" alt="" className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 md:w-28" />

            {/* Form Box */}
            <div className="bg-white/70 backdrop-blur-md p-8 md:p-12 rounded-[20px] shadow-xl w-full max-w-2xl">
                <h3 className="text-center text-lg italic text-gray-600 mb-2">reservations</h3>
                <h1 className="text-center text-3xl md:text-4xl font-bold mb-8 text-black">Book a Table</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
                    <input
                        type="text"
                        placeholder="Name"
                        {...register('name')}
                        className="border border-gray-300 rounded-md p-3 w-full"
                    />
                    <input
                        type="tel"
                        placeholder="Phone"
                        {...register('phone')}
                        className="border border-gray-300 rounded-md p-3 w-full"
                    />

                    <div className="flex flex-col md:flex-row gap-4">
                        <select {...register('persons')} className="border border-gray-300 rounded-md p-3 w-full">
                            <option value="1">1 Person</option>
                            <option value="2">2 People</option>
                            <option value="3">3 People</option>
                            <option value="4+">4+ People</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Branch"
                            {...register('branch')}
                            className="border border-gray-300 rounded-md p-3 w-full"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <input type="time" {...register('timeFrom')} className="border border-gray-300 rounded-md p-3 w-full" />
                        <input type="time" {...register('timeTo')} className="border border-gray-300 rounded-md p-3 w-full" />
                    </div>

                    <input type="date" {...register('date')} className="border border-gray-300 rounded-md p-3 w-full" />

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md mt-4 w-full font-medium transition"
                    >
                        Book a Table
                    </button>
                </form>
            </div>
        </div>
    );
}