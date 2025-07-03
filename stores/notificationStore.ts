"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";
import { notificationService } from "@/services/ClientApiHandler";

type Notification = {
  id: string;
  image: string | null;
  title: string;
  body: string;
  notify_id: number;
  notify_type: string;
  read_at: string | null;
  time_ago: string;
};

type NotificationStore = {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;

  fetchNotifications: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
};

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      loading: false,
      error: null,

      fetchNotifications: async () => {
        set({ loading: true, error: null });

        try {
          const res = await notificationService.getNotifications();

          set({
            notifications: res.data,
            unreadCount: res.unread_count,
            loading: false,
          });
        } catch (error) {
          set({
            error: error?.message || "فشل في تحميل الإشعارات",
            loading: false,
          });
        }
      },

      deleteNotification: async (id: string) => {
        try {
          await notificationService.deleteNotification(id);

          set({
            notifications: get().notifications.filter((n) => n.id !== id),
          });

          toast.success("تم حذف الإشعار بنجاح");
        } catch (error) {
          set({
            error: error?.message || "فشل في حذف الإشعار",
          });

          toast.error("حدث خطأ أثناء حذف الإشعار");
        }
      },
    }),
    {
      name: "notification-storage",
      partialize: (state) => ({
        notifications: state.notifications,
        unreadCount: state.unreadCount,
      }),
    },
  ),
);
