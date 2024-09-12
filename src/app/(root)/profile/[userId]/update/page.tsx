"use client";
import PageNotFound from "@/components/PageNotFound";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { API_URL } from "@/conf/ApiUrl";
import { toast } from "@/hooks/use-toast";
import { userAuthStore } from "@/store/authStore";
import axios from "axios";
import React, { useState } from "react";

const UpdateProfilePage = () => {
  const { user, token } = userAuthStore();
  const [email, setEmail] = useState<string>(user?.email ? user?.email : "");
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(
    user?.profileImage ? user?.profileImage : ""
  );
  const [contactNumber, setContactNumber] = useState(
    user?.contactNumber ? user.contactNumber : ""
  );
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${API_URL}/api/update`,
        { email, profileImage, contactNumber },
        {
          headers: {
            Authorization: `{Bearer ${token}}`,
          },
        }
      );
      console.log(res.data);
      localStorage.removeItem("jwt");
      toast({
        title: "SUCCESS",
        description: "You have to login again to see changes",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return user !== null ? (
    user?.id ? (
      <div className="border shadow-2xl h-[400px] rounded-2xl mt-5 items-center w-1/3 mx-auto justify-center p-8 space-y-4">
        email
        <Input
          value={email}
          className="mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />
        profileImage url
        <Textarea
          className="mb-4"
          value={profileImage}
          onChange={(e) => setProfileImage(e.target.value)}
        />
        contactNumber
        <Input
          className="mb-4"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />
        <Button
          className="w-full"
          disabled={loading}
          onClick={() => handleSubmit()}
        >
          Update
        </Button>
      </div>
    ) : (
      <div>user not found</div>
    )
  ) : (
    <PageNotFound />
  );
};

export default UpdateProfilePage;
