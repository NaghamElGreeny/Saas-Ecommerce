'use client';

import React, { useEffect, useState } from 'react';
import { BrandCountry, getCountryCodes } from '@/services/ClientApiHandler';
import toast from 'react-hot-toast';

type PhoneInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCodeChange?: (code: string) => void;
  errors?: string;
  touched?: boolean;
};

export default function PhoneInput({
  value,
  onChange,
  onCodeChange,
  errors,
  touched,
}: PhoneInputProps) {
  const [countryCodes, setCountryCodes] = useState<BrandCountry[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<BrandCountry | null>(null);

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const codes = await getCountryCodes();
        setCountryCodes(codes);
        setSelectedCountry(codes[0]);
        onCodeChange?.(codes[0].phone_code);
      } catch (err) {
        toast.error('Failed to load country codes');
        console.error(err);
      }
    };

    fetchCodes();
  }, [onCodeChange]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    const country = countryCodes.find((c) => c.phone_code === code) || null;
    setSelectedCountry(country);
    onCodeChange?.(code);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2">
        <div className="relative w-24">
          <select
            className="p-3 border rounded-xl appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            value={selectedCountry?.phone_code || ''}
            onChange={handleCodeChange}
          >
            {countryCodes.map((country) => (
              <option key={country.id} value={country.phone_code}>
                +{country.phone_code}
              </option>
            ))}
          </select>

          {/* Chevron icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <input
          type="tel"
          placeholder="Phone"
          value={value}
          onChange={onChange}
          className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {touched && errors && (
        <div className="text-red-500 text-sm">{errors}</div>
      )}
    </div>
  );
}
