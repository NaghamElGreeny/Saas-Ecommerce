import { fetcher } from "./ClientFetcher";

export const getHomeData = () =>
  fetcher("/home", "Failed to fetch home");

export const postContactForm = (payload: any) =>
  fetcher("/contact", "Failed to submit form", {
    method: "POST",
    data: payload,
    withAuth: true, // لو محتاج توكن
  });

export const deleteUser = (userId: string) =>
  fetcher(`/users/${userId}`, "Failed to delete user", {
    method: "DELETE",
    withAuth: true,
  });
