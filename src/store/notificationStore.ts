import { create } from "zustand";
import { User } from "./authStore";
import axios from "axios";
import { API_URL } from "@/conf/ApiUrl";
import Cookies from "js-cookie";

export interface INotification {
    id: string;
    notification: string;
    user: User;
}

interface NotificationState {
    notifications: INotification[] | null;
    getAllNotifications: (userId: string) => void;
    clearNotifications: (userId: string) => void;
}

export const notificationStore = create<NotificationState>((set) => ({
    notifications: [],
    
    getAllNotifications: async (userId: string) => {
        const token = Cookies.get("jwt"); // Retrieve the token from cookies
        try {
            const res = await axios.get(`${API_URL}/api/notifications/all/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ notifications: res.data });
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    },
    
    clearNotifications: async (userId: string) => {
        const token = Cookies.get("jwt"); // Retrieve the token from cookies
        try {
            await axios.delete(`${API_URL}/api/notifications/clear/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ notifications: [] });
        } catch (error) {
            console.error("Error clearing notifications:", error);
        }
    },
}));
