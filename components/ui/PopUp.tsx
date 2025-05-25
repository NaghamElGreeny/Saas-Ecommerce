// 'use client'
// import React, { useEffect, useState } from 'react';
// import { getPrivacy, getTerms } from '../../../services/ClientApiHandler';

// interface PopupData {
//     id: number;
//     type: string;
//     title: string;
//     description: string;
// }

// export default function Popup() {
//     const [isOpen, setIsOpen] = useState(false);
//     const [popupData, setPopupData] = useState<PopupData | null>(null);
//     const [privacy, setPrivacy] = useState<PopupData | null>(null);
//     const [terms, setTerms] = useState<PopupData | null>(null);
//     useEffect(() => {
//         getPrivacy().then((data: any) => {
//             setPrivacy(data?.privacy);
//         });
//         getTerms().then((data: any) => {
//             setTerms(data?.terms);
//         });
//     }, []);

//     // console.log(privacy)

//     const openPopupWithData = (data: PopupData) => {
//         setPopupData(data);
//         setIsOpen(true);
//     };
//     const closePopup = () => {
//         setIsOpen(false);
//         setPopupData(null);
//     };

//     return (
//         <div className="flex flex-row gap-4">

//             <button
//                 onClick={() =>
//                     terms && openPopupWithData({
//                         id: terms?.id,
//                         type: 'terms',
//                         title: terms?.title,
//                         description: terms?.description
//                     })
//                 }
//             >
//                 <p> {terms?.title} </p>
//             </button>

//             <button
//                 onClick={() =>
//                     privacy && openPopupWithData({
//                         id: privacy?.id,
//                         type: 'privacy',
//                         title: privacy?.title,
//                         description: privacy?.description
//                     })
//                 }
//             >
//                 <p> {privacy?.title} </p>
//             </button>

//             {isOpen && popupData && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5 w-full">
//                     <div className="bg-white dark:bg-darkBg rounded-2xl shadow-xl w-3/4 p-6 relative">
//                         <button
//                             onClick={closePopup}
//                             className=" absolute top-1 left-5 "
//                         >
//                             <p className=' text-red-500 text-4xl font-bold hover:text-red-700'> ×</p>
//                         </button>

//                         <div className="p-4">
//                             <h2 className="text-xl font-bold mb-4 text-primaryFont dark:text-darkFont">{popupData.title}</h2>
//                             <div
//                                 className="text-sm leading-relaxed text-primaryFont dark:text-darkFont overflow-x-auto"
//                                 dangerouslySetInnerHTML={{ __html: popupData.description }}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

