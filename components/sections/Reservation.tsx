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
        <div className="container-custom w-[80%] relative min-h-screen flex flex-col  justify-center my-5">

            <div className={`flex items-center w-full mb-4`}>
                <p className={`text-primary uppercase mx-2`} >Make an Reserve</p>
                <div className="line border-b border-primary w-[200px] h-0"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight rtl:text-right ltr:text-left">
                Online Reservation
            </h1>

            {/* Form Box */}
            <div className="bg-white/70 backdrop-blur-md bg-[url('/assets/images/reservation.png')] p-8 md:p-12 rounded-[20px] shadow-xl w-full">
                <h3 className="text-center text-5xl md:text-4xl text-black mb-2 font-allura">reservations</h3>
                <h1 className="text-center text-5xl md:text-4xl  font-bold mb-8 text-black">Book a Table</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
                    <input
                        type="text"
                        placeholder="Name"
                        {...register('name')}
                        className="reserve p-3 w-full"
                    />
                    <input
                        type="tel"
                        placeholder="Phone"
                        {...register('phone')}
                        className="reserve p-3 w-full"
                    />

                    <div className="flex flex-col md:flex-row gap-4">
                        <select {...register('persons')} className="reserve p-3 w-full">
                            <option value="1">1 Person</option>
                            <option value="2">2 People</option>
                            <option value="3">3 People</option>
                            <option value="4+">4+ People</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Branch"
                            {...register('branch')}
                            className="reserve  p-3 w-full"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <input type="time" {...register('timeFrom')} className="reserve p-3 w-full" />
                        <input type="time" {...register('timeTo')} className="reserve p-3 w-full" />
                    </div>

                    <input type="date" {...register('date')} className="reserve p-3 w-full" />

                    <button
                        type="submit"
                        className="bg-blue-500 w-[20%] rounded-full hover:bg-blue-600 text-white py-5  font-medium transition mr-5"
                    >
                        Book a Table
                    </button>
                </form>
            </div>
        </div>
    );
}