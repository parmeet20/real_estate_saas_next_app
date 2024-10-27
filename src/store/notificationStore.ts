import {create} from "zustand"
import { User, userAuthStore } from "./authStore";
import axios from "axios";
import { API_URL } from "@/conf/ApiUrl";
export interface INotification{
    id:string;
    notification:string;
    user:User;
}
interface NotificationState{
    notifications: INotification[]|null;
    getAllNotifications:(userId:string)=>void;
    clearNotifications:(userId:string)=>void;
}
const {token} = userAuthStore.getState();
export const notificationStore = create<NotificationState>((set)=>({
    notifications:[],
    getAllNotifications:async(userId:string)=>{
        try {
            const res =  await axios.get(`${API_URL}/api/notifications/all/${userId}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            set({notifications:res.data});
        } catch (error) {
            console.log("error fetching notitications",error);
        }
    },
    clearNotifications:async(userId:string)=>{
        try {
            await axios.delete(`${API_URL}/api/notifications/clear/${userId}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            set({notifications:[]});
        } catch (error) {
            console.log("error fetching notitications",error);
        }
    }
}))