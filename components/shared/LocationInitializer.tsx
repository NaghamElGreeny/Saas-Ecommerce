// "use client";
// import { useEffect } from "react";
// import Cookies from "js-cookie";

// export default function LocationInitializer() {
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       console.warn("Geolocation timeout");
//     }, 5000); // 5 ثواني انتظار بحد أقصى

//     if (!navigator.geolocation) {
//       console.warn("Geolocation not supported");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         clearTimeout(timeout);
//         const lat = position.coords.latitude.toString();
//         const lng = position.coords.longitude.toString();

//         Cookies.set("lat", lat);
//         Cookies.set("lng", lng);
//       },
//       (error) => {
//         clearTimeout(timeout);
//         console.warn("Geolocation error:", error.message);
//       },
//       {
//         enableHighAccuracy: false,
//         timeout: 5000,
//         maximumAge: 0,
//       }
//     );
//   }, []);

//   return null;
// }
