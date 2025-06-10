'use client';
import { useEffect, useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import Image from 'next/image';
import { getStores } from '@/services/ClientApiHandler';
import toast from 'react-hot-toast';
import { Store } from '@/services/ClientApiHandler';

export default function LocationSelector(active: { active?: boolean }) {
    const [open, setOpen] = useState(active ? active : false);
    const [selectedStore, setSelectedStore] = useState<Store | null>(null);
const [stores, setStores] = useState([]);

 
    useEffect(() => {
        const fetchStores = async () => {
            try {
                const stores = await getStores();
                setStores(stores);
                // setSelectedStore(stores[0]); // default selected store
            } catch (err) {
                toast.error('Failed to load stores');
                console.error(err);
            }
        };
 
        fetchStores();
         }, []);
    

    return (
        <>
            {/* Trigger */}
            <div
                className="flex flex-row items-center space-x-3 cursor-pointer sm:flex-col"

            >
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                        src="/assets/images/abushakra.png"
                        alt="Abu Shakra Logo"
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-black">Abu Shakra</span>
                    <div className="flex items-center space-x-1" onClick={() => setOpen(true)}>
                        <span className="text-sm text-gray-400 truncate max-w-[160px]">
                            {selectedStore ? selectedStore.location_description : ''}
                        </span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />

                    </div>
                </div>
            </div>

            {/* Popup */}
            {open && (
                <div className="space-y-4 fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl relative">

                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-black"
                            onClick={() => setOpen(false)}
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h2 className="text-lg font-bold mb-4">Select Store</h2>

                        <div className="space-y-2">
                            {stores.map((store) => (
                                <div
                                    key={store.id}
                                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedStore?.id === store.id
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:bg-gray-50'
                                        }`}
                                    onClick={() => setSelectedStore(store)}
                                >
                                    <h3 className="font-medium">{store.name}</h3>
                                    <p className="text-gray-600 text-sm mt-1">{store.location_description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Display selected location */}
                    {/* {selectedStore && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-medium">Selected Location:</h3>
                            <p className="text-gray-600 mt-1">{selectedStore.location}</p>
                        </div>
                    )} */}
                </div>
            )}
        </>
    );
}
