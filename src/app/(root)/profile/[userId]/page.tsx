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
  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };
  const [getUser, setGetUser] = useState<User | null>(null);
  const { token, user } = userAuthStore();
  const { fetchProperties, properties = [] } = propertyStore();

  useEffect(() => {
    const fetchData = async () => {
      await fetchProperties();
    };
    fetchData();
  }, [fetchProperties]);

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
          <TabsList className={`grid ${user.id === getUser.id?"grid-cols-3":"grid-cols-2"}  w-[500px] mx-auto`}>
            <TabsTrigger value="My Listings">Listings</TabsTrigger>
            <TabsTrigger value="Bookmarks">Bookmarks</TabsTrigger>
            {user.id === getUser.id && (
              <TabsTrigger value="Booked Properties">Booked</TabsTrigger>
            )}
          </TabsList>
          <TabsContent
            value="My Listings"
            className="grid grid-cols-2 space-x-8 w-1/2 mx-auto"
          >
            {properties.map((item) =>
              item.owner.email === getUser.email ? (
                <Card key={item.id} className="w-[310px] my-2 hover:bg-muted">
                  <CardHeader className="relative w-full h-[250px]">
                    <CldImage
                      src={item.images[0]}
                      alt="Property Image"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-2xl p-3"
                    />
                  </CardHeader>
                  <CardContent>
                    <p>
                      <strong>{item.title}</strong>
                    </p>
                    <p className="flex items-center">
                      <strong>
                        <DollarSign />
                      </strong>{" "}
                      {item.price}
                    </p>
                    <p>{truncateText(item.description ?? "", 10)}</p>
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
          <TabsContent
            value="Bookmarks"
            className="grid grid-cols-2 space-x-8 w-1/2 mx-auto"
          >
            {properties
              .filter((property) =>
                property.usersBookmarks.some(
                  (bookmarkedUser) => bookmarkedUser.id === getUser.id
                )
              )
              .map((filteredProperty) => (
                <Card
                  key={filteredProperty.id}
                  className="w-[310px] my-2 hover:bg-muted"
                >
                  <CardHeader className="relative w-full h-[250px]">
                    <CldImage
                      src={filteredProperty.images[0]}
                      alt="Property Image"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-2xl p-3"
                    />
                  </CardHeader>
                  <CardContent>
                    <p>
                      <strong>{filteredProperty.title}</strong>
                    </p>
                    <p className="flex items-center">
                      <strong>
                        <DollarSign />
                      </strong>{" "}
                      {filteredProperty.price}
                    </p>
                    <p>
                      {truncateText(filteredProperty.description ?? "", 10)}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <Link href={`/properties/${filteredProperty.id}`}>
                        Explore
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </TabsContent>
          {user.id === getUser.id && (
            <TabsContent
              value="Booked Properties"
              className="grid grid-cols-2 space-x-8 w-1/2 mx-auto"
            >
              {properties
                .filter((property) =>
                  property.bookedBy.some(
                    (bookedUser) => bookedUser.id === getUser.id
                  )
                )
                .map((bookedProperty) => (
                  <Card
                    key={bookedProperty.id}
                    className="w-[310px] my-2 hover:bg-muted"
                  >
                    <CardHeader className="relative w-full h-[250px]">
                      <CldImage
                        src={bookedProperty.images[0]}
                        alt="Property Image"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-2xl p-3"
                      />
                    </CardHeader>
                    <CardContent>
                      <p>
                        <strong>{bookedProperty.title}</strong>
                      </p>
                      <p className="flex items-center">
                        <strong>
                          <DollarSign />
                        </strong>{" "}
                        {bookedProperty.price}
                      </p>
                      <p>
                        {truncateText(bookedProperty.description ?? "", 10)}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        <Link href={`/properties/${bookedProperty.id}`}>
                          Explore
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </TabsContent>
          )}
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
