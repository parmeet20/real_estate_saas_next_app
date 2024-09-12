"use client";

import { API_URL } from "@/conf/ApiUrl";
import { User, userAuthStore } from "@/store/authStore";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AuthenticatedPage from "@/components/shared/AuthenticatedPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { propertyStore } from "@/store/propertyStore";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CldImage } from "next-cloudinary";
import { DollarSign } from "lucide-react";

const Page = () => {
  const params = useParams();
  const [getUser, setGetUser] = useState<User | null>(null);
  const { token, user } = userAuthStore();
  const { fetchProperties, properties = [] } = propertyStore();
  useEffect(() => {
    const fetchData = async () => {
      await fetchProperties();
    };
    fetchData();
  }, [fetchProperties, properties]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/getuser/${params.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGetUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [params.userId, token]);

  return getUser?.id ? (
    user?.id ? (
      <div className="items-center">
        <div className="mx-auto p-6 max-w-md w-full">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                className="h-16 w-16 rounded-full"
                src={getUser.profileImage}
                alt="Profile Image"
              />
              <AvatarFallback>NA</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {getUser.email}
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                {getUser.contactNumber}
              </p>
            </div>
          </div>
          {user?.id === getUser.id ? (
            <div className="mt-4 space-y-5">
              <Button className="w-full">
                <Link href={`/profile/${user.id}/update`}>Edit Profile</Link>
              </Button>
              <Button className="w-full">
                <Link href="/properties/create">Create a new listing</Link>
              </Button>
            </div>
          ) : (
            <div className="mt-4">
              Welcome to {getUser.email}
              {"'s profile"}
            </div>
          )}
        </div>
        <Tabs defaultValue="My Listings">
          <TabsList className="grid grid-cols-2 w-[500px] mx-auto">
            <TabsTrigger value="My Listings">Listings</TabsTrigger>
            <TabsTrigger value="Bookmarks">Bookmarks</TabsTrigger>
          </TabsList>
          <TabsContent
            value="My Listings"
            className="grid grid-cols-2 space-x-8 w-1/2 mx-auto"
          >
            {properties.map((item) =>
              item.owner.email === user.email ? (
                <Card key={item.id} className="w-[310px] my-2 hover:bg-muted">
                  <CardHeader>
                    <CldImage
                      src={item.images[0]}
                      width={300}
                      height={100}
                      alt="CN"
                      className="rounded-2xl w-[300] h-[250]"
                    />
                  </CardHeader>
                  <CardContent>
                    <p>
                      <strong></strong> {item.title}
                    </p>
                    <p className="flex items-center">
                      <strong>
                        <DollarSign />
                      </strong>{" "}
                      {item.price}
                    </p>
                    <p>{item.description ?? ""}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <Link href={`/properties/${item.id}`}>Explore</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ) : null
            )}
          </TabsContent>
          <TabsContent value="Bookmarks">This is my bookmarks tab</TabsContent>
        </Tabs>
      </div>
    ) : (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
        <div className="text-center text-slate-900 dark:text-slate-100">
          User not found
        </div>
      </div>
    )
  ) : (
    <AuthenticatedPage />
  );
};

export default Page;
