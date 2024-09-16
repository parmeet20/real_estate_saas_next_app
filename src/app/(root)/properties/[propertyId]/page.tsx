"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { propertyStore } from "@/store/propertyStore";
import { PhoneCall, Trash2Icon, Users } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Bath,
  Bed,
  Bookmark,
  BusFront,
  ChevronLeft,
  ChevronRight,
  Cigarette,
  Dog,
  Grid2X2,
  Hammer,
  Hotel,
  MapPin,
  MessageCircleMore,
  School,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { userAuthStore } from "@/store/authStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  } from "@/components/ui/tooltip";
import { bookmarkProperty, deletePostHandler } from "@/helpers/propertyHelper";

const Page = () => {
  const params = useParams();
  const { property, getPropertyById } = propertyStore();
  const { user } = userAuthStore();
  useEffect(() => {
    const propertyId = Array.isArray(params.propertyId)
      ? params.propertyId[0]
      : params.propertyId;

    if (typeof propertyId === "string") {
      getPropertyById(propertyId);
    }
  }, [params.propertyId, getPropertyById]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const prevSlide = () => {
    const images = property?.images ?? [];
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const images = property?.images ?? [];
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Image Slider */}
      <div className="relative max-w-screen-lg mx-auto">
        <div className="absolute inset-y-0 left-0 flex items-center justify-center p-2">
          <button
            onClick={prevSlide}
            className="bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition"
          >
            <ChevronLeft size={30} />
          </button>
        </div>
        <CldImage
          width={600}
          height={400}
          src={property?.images[currentIndex] || ""}
          alt="Property image"
          className="w-full h-[400px] bg-center bg-cover rounded-2xl transition-transform duration-500"
        />
        <div className="absolute inset-y-0 right-0 flex items-center justify-center p-2">
          <button
            onClick={nextSlide}
            className="bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition"
          >
            <ChevronRight size={30} />
          </button>
        </div>
      </div>

      {/* Title and Owner Section */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <div className="flex items-center text-gray-700 dark:text-muted">
          <MapPin className="mr-2" />
          <p>{property?.address}, {property?.city}</p>
        </div>
        <div className="flex gap-2 mt-4 lg:mt-0">
          {user?.email === property?.owner.email ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="icon" variant="destructive">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Trash2Icon />
                      </TooltipTrigger>
                      <TooltipContent className="mb-2">
                        <p>Delete this listing</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your listing and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      deletePostHandler(property?.id || "");
                      router.push("/");
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : null}
          <Button
            onClick={() =>
              bookmarkProperty(property?.id || "", user?.id || "")
            }
            size="icon"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Bookmark />
                </TooltipTrigger>
                <TooltipContent className="mb-2">
                  <p>Add to bookmarks</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Button>
          <Button size="icon">
            <MessageCircleMore />
          </Button>
        </div>
      </div>

      {/* Description */}
      <div className="text-gray-800 dark:text-gray-200">{property?.description}</div>

      {/* Booking and Price */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Button disabled className="w-full sm:w-auto">${property?.price}</Button>
        <Button className="w-full sm:w-auto">Book Now</Button>
      </div>

      {/* Owner Information */}
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Owner</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          <Button variant="link">
            <Link href={`/profile/${property?.owner.id}`}>
              {property?.owner.email}
            </Link>
          </Button>
        </div>
        <div className="text-xs flex items-center text-muted-foreground">
          <PhoneCall size={12} className="mr-3" />
          {property?.owner.contactNumber}
        </div>
      </CardContent>
    </Card>
  </div>


      {/* Utilities and Features */}
      <div className="space-y-6">
        {/* General */}
        <Card className="bg-violet-50 p-6 rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              General
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="hover:bg-muted p-4 rounded-lg shadow-sm flex items-center gap-2">
                <Hammer className="text-violet-500" />
                <div>
                  <p className="font-semibold text-gray-700 w-[200px] dark:text-slate-300">Utilities:</p>
                  <p>{property?.utilities}</p>
                </div>
              </Card>
              <Card className="hover:bg-muted p-4 rounded-lg shadow-sm flex items-center gap-2">
                <Dog className="text-violet-500" />
                <div>
                  <p className="font-semibold text-gray-700 dark:text-slate-300">Pet Policy:</p>
                  <p>{property?.petAllowed ? "Pets allowed" : "Pets not allowed"}</p>
                </div>
              </Card>
              <Card className="hover:bg-muted p-4 rounded-lg shadow-sm flex items-center gap-2">
                <Cigarette className="text-violet-500" />
                <div>
                  <p className="font-semibold text-gray-700 dark:text-slate-300">Smoking:</p>
                  <p>{property?.smokingAllowed ? "Smoking allowed" : "Smoking not allowed"}</p>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Size */}
        <Card className="bg-violet-50 p-6 rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="hover:bg-muted p-4 rounded-lg shadow-sm flex items-center gap-2">
                <Grid2X2 className="text-violet-500" />
                <div>
                  <p className="font-semibold text-gray-700 dark:text-slate-300">Size:</p>
                  <p>{property?.area} sqm</p>
                </div>
              </Card>
              <Card className="hover:bg-muted p-4 rounded-lg shadow-sm flex items-center gap-2">
                <Bed className="text-violet-500" />
                <div>
                  <p className="font-semibold text-gray-700 dark:text-slate-300">Bedrooms:</p>
                  <p>{property?.bedroom}</p>
                </div>
              </Card>
              <Card className="hover:bg-muted p-4 rounded-lg shadow-sm flex items-center gap-2">
                <Bath className="text-violet-500" />
                <div>
                  <p className="font-semibold text-gray-700 dark:text-slate-300">Bathrooms:</p>
                  <p>{property?.bathroom}</p>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Nearby Places */}
        <Card className="bg-violet-50 p-6 rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Nearby Places
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="hover:bg-muted p-4 rounded-lg shadow-sm flex items-center gap-2">
                <School className="text-violet-500" />
                <div>
                  <p className="font-semibold text-gray-700 dark:text-slate-300">School:</p>
                  <p>{property?.schoolDistance} m away</p>
                </div>
              </Card>
              <Card className="hover:bg-muted p-4 rounded-lg shadow-sm flex items-center gap-2">
                <BusFront className="text-violet-500" />
                <div>
                  <p className="font-semibold text-gray-700 dark:text-slate-300">Bus Stop:</p>
                  <p>{property?.busDistance} m away</p>
                </div>
              </Card>
              <Card className="hover:bg-muted p-4 rounded-lg shadow-sm flex items-center gap-2">
                <Hotel className="text-violet-500" />
                <div>
                  <p className="font-semibold text-gray-700 dark:text-slate-300">Restaurants:</p>
                  <p>300 m away</p>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
