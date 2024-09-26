"use client"
import { API_URL } from "@/conf/ApiUrl";
import { toast } from "@/hooks/use-toast";
import { userAuthStore } from "@/store/authStore";
import axios from "axios";

const { token } = userAuthStore.getState();
export const bookmarkProperty = async (propertyId: string, userId: string) => {
  try {
    await axios.put(
      `${API_URL}/api/properties/bookmark/${propertyId}/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast({
      title: "SUCCESS",
      description: "This property is bookmarked successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
export const deletePostHandler = async (propertyId: string) => {
  try {
    await axios.delete(
      `${API_URL}/api/properties/delete/${propertyId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast({
      title: "SUCCESS",
      description: "Listing deleted successfully",
    })
  } catch (error) {
    toast({
      title: "FAILURE",
      description: "Error deleting listing",
    })
    console.log(error);
  }
};