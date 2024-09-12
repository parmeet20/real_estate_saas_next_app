import { API_URL } from "@/conf/ApiUrl";
import axios from "axios";
import { create } from "zustand";
import { User, userAuthStore } from "@/store/authStore"; // Import the userAuthStore
// PropertyType enum
export enum PropertyType {
    HOUSE = "HOUSE",
    RENT = "RENT",
    CONDO = "CONDO",
    STUDIO = "STUDIO",
    APARTMENT = "APARTMENT"
}

// CreatePropertyDto interface
export interface Property {
    id: string;
    propertyType: PropertyType;
    title: string;
    owner: User;
    description?: string;
    city: string;
    address: string;
    latitude: string;
    longitude: string;
    utilities: string[];
    images: string[];
    petAllowed: boolean;
    smokingAllowed: boolean;
    price: number;
    area: number;
    busDistance: number;
    schoolDistance: number;
    bedroom: number;
    bathroom: number;
}

interface PropertyState {
    properties: Property[] | [];
    property: Property | null;
    fetchProperties: () => Promise<void>;
    getPropertyById: (id: string) => Promise<void>;
    getUserProperties: (userId: string) => Promise<void>;
}
const token = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null;
export const propertyStore = create<PropertyState>((set) => ({
    properties: [],
    property: null,

    fetchProperties: async () => {
        try {
            const res = await axios.get(`${API_URL}/api/properties/all`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ properties: res.data });
        } catch (error) {
            set({ properties: [], property: null });
        }
    },

    getPropertyById: async (id: string) => {
        const { token } = userAuthStore.getState();
        try {
            const res = await axios.get(`${API_URL}/api/properties/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ property: res.data });
        } catch (error) {
            console.log(error);
            set({ property: null });
        }
    },

    getUserProperties: async (userId: string) => {
        const { token } = userAuthStore.getState();
        try {
            const res = await axios.get(`${API_URL}/api/properties/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ properties: res.data });
        } catch (error) {

        }
    }
}));
