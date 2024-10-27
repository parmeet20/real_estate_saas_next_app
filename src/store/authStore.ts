import { API_URL } from "@/conf/ApiUrl";
import axios from "axios";
import { create } from "zustand"
export interface User {
    id: string;
    email: string;
    profileImage: string;
    contactNumber: string;
}
interface AuthState {
    token: string | null;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    fetchUser: () => Promise<void>;
}
export const userAuthStore = create<AuthState>((set, get) => ({
    token: typeof window !== undefined ? localStorage.getItem("jwt") : null,
    user: null,
    login: async (email: string, password: string) => {
        try {
            const res = await axios.post(`${API_URL}/auth/signing`, { email, password });
            const { message, status } = res.data;
            if (status && typeof window !== undefined) {
                localStorage.setItem("jwt", message);
                set({ token: message });
                await get().fetchUser();
            }
        } catch (error) {
            console.log(error);
        }
    },
    logout: () => {
        if (typeof window !== undefined) {
            localStorage.removeItem("jwt");
            set({ token: null, user: null })
        }
    },
    fetchUser: async () => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null;
        if (!token) {
            set({ user: null });
            return;
        }

        try {
            const response = await axios.get(`${API_URL}/auth/getemail`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            set({ user: response.data });
        } catch (error) {
            console.error('Fetch user error:', error);
            set({ user: null });
        }
    },
}))