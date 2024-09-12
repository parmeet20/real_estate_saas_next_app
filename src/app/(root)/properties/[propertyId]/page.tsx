"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { propertyStore } from "@/store/propertyStore";
import { PhoneCall, Users } from "lucide-react";
import {CldImage } from "next-cloudinary"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

const Page = () => {
  const params = useParams();
  const { property, getPropertyById } = propertyStore();

  useEffect(() => {
    const propertyId = Array.isArray(params.propertyId)
      ? params.propertyId[0]
      : params.propertyId;

    if (typeof propertyId === "string") {
      getPropertyById(propertyId);
    }
  }, [params.propertyId, getPropertyById]);

  const [currentIndex, setCurrentIndex] = useState(0);

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
    <div className="container mx-auto p-8 space-y-8">
      {/* Image Slider */}
      <div className="relative max-w-screen-md mx-auto">
        <div className="absolute inset-y-0 left-0 flex items-center justify-center">
          <button
            onClick={prevSlide}
            className="bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition"
          >
            <ChevronLeft size={30} />
          </button>
        </div>
        <CldImage
          width={200}
          height={200}
          src={
            property?.images[currentIndex] ? property?.images[currentIndex] : ""
          }
          alt="Description of my image"
          className="w-full h-[400px] bg-center bg-cover rounded-2xl transition-transform duration-500"
        />
        <div className="absolute inset-y-0 right-0 flex items-center justify-center">
          <button
            onClick={nextSlide}
            className="bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition"
          >
            <ChevronRight size={30} />
          </button>
        </div>
      </div>

      {/* Title and Owner Section */}

      {/* Location and Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center text-gray-700">
          <MapPin className="mr-2" />
          <p>
            {property?.address}, {property?.city}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-gray-200 p-2 rounded-full shadow-sm hover:bg-gray-300 transition">
            <Bookmark />
          </button>
          <button className="bg-gray-200 p-2 rounded-full shadow-sm hover:bg-gray-300 transition">
            <MessageCircleMore />
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="text-gray-800">{property?.description}</div>

      {/* Booking and Price */}
      <div className="flex gap-4">
        <Button disabled>${property?.price}</Button>
        <Button>Book Now</Button>
      </div>

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
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">General</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-2">
              <Hammer className="text-gray-600" />
              <div>
                <p className="font-semibold text-gray-700">Utilities:</p>
                <p>{property?.utilities}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-2">
              <Dog className="text-gray-600" />
              <div>
                <p className="font-semibold text-gray-700">Pet Policy:</p>
                <p>
                  {property?.petAllowed ? "Pets allowed" : "Pets not allowed"}
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-2">
              <Cigarette className="text-gray-600" />
              <div>
                <p className="font-semibold text-gray-700">Smoking:</p>
                <p>
                  {property?.smokingAllowed
                    ? "Smoking allowed"
                    : "Smoking not allowed"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Size and Nearby Places */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Size</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-2">
              <Grid2X2 className="text-gray-600" />
              <div>
                <p className="font-semibold text-gray-700">Size:</p>
                <p>{property?.area} sqm</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-2">
              <Bed className="text-gray-600" />
              <div>
                <p className="font-semibold text-gray-700">Bedrooms:</p>
                <p>{property?.bedroom}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-2">
              <Bath className="text-gray-600" />
              <div>
                <p className="font-semibold text-gray-700">Bathrooms:</p>
                <p>{property?.bathroom}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Nearby Places
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-2">
              <School className="text-gray-600" />
              <div>
                <p className="font-semibold text-gray-700">School:</p>
                <p>{property?.schoolDistance} m away</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-2">
              <BusFront className="text-gray-600" />
              <div>
                <p className="font-semibold text-gray-700">Bus Stop:</p>
                <p>{property?.busDistance} m away</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-2">
              <Hotel className="text-gray-600" />
              <div>
                <p className="font-semibold text-gray-700">Restaurants:</p>
                <p>300 m away</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
