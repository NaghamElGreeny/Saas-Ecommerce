'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';
import { ChevronDown, X } from 'lucide-react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

import { useStore } from '@/stores/useStore';

type LocationSelectorProps = {
  active?: boolean;
};

export default function LocationSelector({ active = false }: LocationSelectorProps) {
  const { stores, selectedStore, setSelectedStore } = useStore();


  const [open, setOpen] = useState(false);
  const [tempSelectedId, setTempSelectedId] = useState<number | null>(null);

  // Load stores and set selected one
  useEffect(() => {
    const init = async () => {
      const storeIdFromCookie = Cookies.get('store_id');
      const hasSelectedBefore = Cookies.get('store_selected_once');

      // const data =  await fetchStores();
      const data =  stores;
      
      // Auto-select first store if no selection
      if (!storeIdFromCookie && !hasSelectedBefore && data.length > 0) {
        const first = data[0];
        setSelectedStore(first);
        setTempSelectedId(first.id);
        Cookies.set('store_id', String(first.id));
        Cookies.set('store_selected_once', 'true');
      }
      // Restore selection from cookie
      if (storeIdFromCookie && !selectedStore) {
        const matched = data.find((s) => String(s.id) === storeIdFromCookie);
        if (matched) {
          setSelectedStore(matched);
          setTempSelectedId(matched.id);
        }
      }

      if (active) setOpen(true);
    };

    init().catch(() => {
      toast.error('Failed to load stores');
    });
  }, [active, selectedStore, setSelectedStore,stores]);

  const handleConfirm = () => {
    const selected = stores.find((s) => s.id === tempSelectedId);
    if (!selected) return;

    setSelectedStore(selected);
    Cookies.set('store_id', String(selected.id));
    setOpen(false);
  };

  return (
    <>
      {/* Trigger */}
      <div
        className=" items-center space-x-3 cursor-pointer hidden 2xl:flex"
        onClick={() => setOpen(true)}
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
          <div className="flex items-center space-x-1">
            <span className="text-sm text-gray-400 truncate max-w-[160px]">
              {selectedStore?.location_description || ''}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px]" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-xl font-semibold">Select Store</Dialog.Title>
              <button onClick={() => setOpen(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Store List */}
            <div className="space-y-4 max-h-72 overflow-y-auto">
              {stores.map((store) => (
                <div
                  key={store.id}
                  onClick={() => setTempSelectedId(store.id)}
                  className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition ${
                    tempSelectedId === store.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={store.image}
                      alt={store.name}
                      width={60}
                      height={60}
                      className="rounded object-cover w-14 h-14"
                    />
                    <div>
                      <h3 className="font-semibold">{store.name}</h3>
                      <p className="text-sm text-blue-600">{store.location_description}</p>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      tempSelectedId === store.id ? 'border-blue-600' : 'border-gray-400'
                    }`}
                  >
                    {tempSelectedId === store.id && (
                      <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleConfirm}
              className="mt-6 w-full py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Confirm
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
