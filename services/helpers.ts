/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleResponse = async <T>(promise: Promise<{ data: any }>): Promise<T> => {
  try {
    const response = await promise;
    return response.data.data || response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Something went wrong");
  }
};
// export const handleError = (error: any): string => {
//   if (error.response) {
//     return error.response.data?.message || "An error occurred";
//   } else if (error.request) {
//     return "No response received from the server";
//   } else {
//     return error.message || "An unexpected error occurred";
//   }
// };