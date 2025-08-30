
export const generateNumbers = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) =>
        (start + i).toString().padStart(2, "0"),
    );
};
export const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

// export function transformData(data: WebsiteData): TransformedWebsiteData {
//   const transformedData: Partial<TransformedWebsiteData> = {};

//   for (const category in data) {
//     if (Object.prototype.hasOwnProperty.call(data, category)) {
//       const items = data[category as keyof WebsiteData];

//       if (Array.isArray(items) && items.every(item => typeof item === 'object' && item !== null && 'key' in item && 'value' in item)) {
//         const transformedCategory: Record<string, any> = {};
//         for (const item of items as KeyValueItem[]) {
//           transformedCategory[item.key] = item.value;
//         }
//         transformedData[category as keyof TransformedWebsiteData] = transformedCategory as any;
//       } else {
//         transformedData[category as keyof TransformedWebsiteData] = items as any;
//       }
//     }
//   }
//   return transformedData as TransformedWebsiteData;
// }