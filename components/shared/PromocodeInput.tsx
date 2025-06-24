
// // import { useState } from 'react';

// // export default function PromoCodeInput() {
// //   const [promoCode, setPromoCode] = useState('');
// //   const [isApplied, setIsApplied] = useState(false);

// //   const handleApply = () => {
// //     if (promoCode.trim()) {
// //       setIsApplied(true);
// //       // Here you would typically call an API to validate the promo code
// //       console.log('Promo code applied:', promoCode);
// //     }
// //   };

// //   const handleRemove = () => {
// //     setIsApplied(false);
// //     setPromoCode('');
// //     // Here you would typically remove the promo code effects
// //     console.log('Promo code removed');
// //   };

// //   return (
// //     <div className="w-full max-w-md">
// //       <label htmlFor="promo-code" className="block text-sm font-medium text-gray-700 mb-1">
// //         Promo Code
// //       </label>
// //       {isApplied ? (
// //         <div className="flex items-center justify-between p-3 bg-green-50 rounded-md border border-green-200">
// //           <span className="text-green-800 font-medium">{promoCode} applied</span>
// //           <button
// //             onClick={handleRemove}
// //             className="text-green-600 hover:text-green-800 text-sm font-medium"
// //           >
// //             Remove
// //           </button>
// //         </div>
// //       ) : (
// //         <div className="flex rounded-md shadow-sm">
// //           <input
// //             type="text"
// //             id="promo-code"
// //             value={promoCode}
// //             onChange={(e) => setPromoCode(e.target.value)}
// //             placeholder="Enter promo code"
// //             className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// //           />
// //           <button
// //             onClick={handleApply}
// //             disabled={!promoCode.trim()}
// //             className={`px-4 py-2 rounded-r-md border border-l-0 text-sm font-medium ${
// //               promoCode.trim()
// //                 ? 'bg-blue-600 text-white hover:bg-blue-700 border-blue-600'
// //                 : 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300'
// //             }`}
// //           >
// //             Apply
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


// import React, { useState } from "react";
// import Image from "next/image";
// // import { Input } from "@/components/ui/input"; // لو عندك كومبوننت جاهز
// import { useCartStore } from "@/stores/cartStore";
// import { applyCoupon } from "@/services/ClientApiHandler"; // هنعملها كمان
// import { Loader } from "lucide-react";

// export default function PromoCodeInput() {
//   const [code, setCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { fetchCart } = useCartStore();

//   const handleApply = async () => {
//     if (!code) return;
//     setLoading(true);
//     try {
//     const res=  await applyCoupon(code); 
//       await fetchCart(); 
//       setCode("");
//       console.log('code response',res)
//     } catch (err) {
//       console.error("Failed to apply coupon", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mb-4 w-full p-5">
//       <h2 className="text-xl font-bold mb-2">Promo Code</h2>
//       <div className="flex items-center justify-between rounded-2xl bg-gray-100 px-4 py-3">
//           <Image src="/assets/icons/promocode.svg" alt="promo" width={35} height={35} className="me-2" />
//           <input
//             type="text"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             placeholder="Enter Promo Code"
//             className="w-full h-10 bg-transparent  outline-none placeholder:text-gray-400"
//           />
       
//         <button
//           disabled={loading}
//           onClick={handleApply}
//           className="text-primary font-semibold "
//         >
//           {loading ? <Loader /> : "Apply"}
//         </button>
//       </div>
//       </div>
    
//   );
// }
import React, { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/stores/cartStore";
import { applyCoupon } from "@/services/ClientApiHandler";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

export default function PromoCodeInput() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { cart, fetchCart ,setCart} = useCartStore();
  const [isApplied, setIsApplied] = useState(false);

  const handleApply = async () => {
    if (!code.trim()) return;
    setLoading(true);
    try {
      const res = await applyCoupon(code);
      if (res.status === "success") {
        setCart(res)
        // await fetchCart();
        setIsApplied(true);
        toast.success("Coupon applied successfully");
      } else {
        toast.error(res.message || "Failed to apply coupon");
      }
    } catch (err) {
      console.error("Failed to apply coupon", err);
      toast.error("Failed to apply coupon");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    try {
      // You might need an API to remove coupon, or just refetch cart without coupon
      await fetchCart(); // This should fetch cart without coupon if you pass empty coupon code
      setIsApplied(false);
      setCode("");
      toast.success("Coupon removed");
    } catch (err) {
      console.error("Failed to remove coupon", err);
      toast.error("Failed to remove coupon");
    }
  };

  return (
    <div className="mb-4 w-full p-5">
      <h2 className="text-xl font-bold mb-2">Promo Code</h2>
      {isApplied ? (
        <div className="flex items-center justify-between rounded-2xl px-4 py-3 border border-green-200">
          <div className="flex items-center">
    <svg
              className="me-2 bg-white text-green-500  border-green-500 rounded-full"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="9" fill="white" stroke="#22C55E" strokeWidth="2" />
              <path
                d="M6 10.5L9 13.5L14 8.5"
                stroke="#22C55E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <h2 className=" font-medium">{cart?.coupon_code} <br />
              <span className="text-gray-400">-{cart?.price.coupon_price}</span>
            </h2>
          </div>
          <button
            onClick={handleRemove}
            className="text-red-600 hover:text-red-800 font-semibold"
            disabled={loading}
          >
            {loading ? <Loader className="animate-spin" /> : "Remove"}
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-2xl bg-gray-100 px-4 py-3">
          <Image 
            src="/assets/icons/promocode.svg" 
            alt="promo" 
            width={35} 
            height={35} 
            className="me-2" 
          />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter Promo Code"
            className="w-full h-10 bg-transparent outline-none placeholder:text-gray-400"
          />
          <button
            disabled={loading || !code.trim()}
            onClick={handleApply}
            className="text-primary font-semibold"
          >
            {loading ? <Loader className="animate-spin" /> : "Apply"}
          </button>
        </div>
      )}
    </div>
  );
}