import { fetcher } from "./ClientFetcher";

export const getHomeData = () =>
  fetcher("/home", "Failed to fetch home");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postContactForm = (payload: any) =>
  fetcher("/contact", "Failed to submit form", {
    method: "POST",
    data: payload,
    withAuth: true, 
  });

export const deleteUser = (userId: string) =>
  fetcher(`/users/${userId}`, "Failed to delete user", {
    method: "DELETE",
    withAuth: true,
  });
