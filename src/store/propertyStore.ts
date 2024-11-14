import { API_URL } from "@/conf/ApiUrl";
import axios from "axios";
import { create } from "zustand";
import { User, userAuthStore } from "@/store/authStore";
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
    bookedBy: User[];
    usersBookmarks: User[],
}

interface PropertyState {
    properties: Property[] | [];
    property: Property | null;
    fetchProperties: () => Promise<void>;
    fetchFilteredProperties: (query: FilterParams) => Promise<void>;
    fetchSearchedProperties: (query: FilterParams) => Promise<void>;
    getPropertyById: (id: string) => Promise<void>;
    getUserProperties: (userId: string) => Promise<void>;
}

export interface FilterParams {
    bedroom?: boolean;
    latest?: boolean;
    bathroom?: boolean;
    area?: boolean;
    price?: boolean;
    busDistance?: boolean;
    schoolDistance?: boolean;
    country?: string;
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
    fetchSearchedProperties:async(query:FilterParams)=>{
        const { token } = userAuthStore.getState();
        try {
            const queryParams = new URLSearchParams();
            if (query.country?.length != 0) queryParams.append('country', query.country ? query.country : "");
            const res = await axios.get(`${API_URL}/api/properties/search?${queryParams.toString()}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ properties: res.data });
        } catch (error) {
            set({ properties: [], property: null });
        }
    },
    fetchFilteredProperties: async (query: FilterParams) => {
        const { token } = userAuthStore.getState();
        try {
            const queryParams = new URLSearchParams();
            if (query.area) queryParams.append('query', 'area');
            if (query.price) queryParams.append('query', 'price');
            if (query.bathroom) queryParams.append('query', 'bathroom');
            if (query.bedroom) queryParams.append('query', 'bedroom');
            if (query.busDistance) queryParams.append('query', 'busDistance');
            if (query.schoolDistance) queryParams.append('query', 'schoolDistance');
            if (query.latest) queryParams.append('query', 'createdAt');
            const res = await axios.get(`${API_URL}/api/properties/all?${queryParams.toString()}`, {
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
