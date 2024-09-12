"use client";
import { Button } from "@/components/ui/button";
import { propertyStore } from "@/store/propertyStore";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { DollarSign, LocateIcon } from "lucide-react";
import Map from "@/components/shared/Map";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const truncateText = (text, wordLimit) => {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

const Page = () => {
  const { fetchProperties, properties = [] } = propertyStore();

  useEffect(() => {
    const fetchData = async () => {
      await fetchProperties();
    };
    fetchData();
  }, [fetchProperties, properties]);

  const mapItems = properties.map((property) => ({
    id: property.id,
    latitude: parseFloat(property.latitude),
    longitude: parseFloat(property.longitude),
    image: property.images[0], // Assuming you want to use the first image
    title: property.title,
    bedrooms: property.bedroom.toString(), // Ensure this is a string if needed
    price: property.price,
  }));

  return (
    <div className="p-5 space-y-3">
      <Map items={mapItems} />
      <Button>Filter</Button>
      <div className="flex">
        <div className="flex-1">
          {properties.length === 0 ? (
            <div>No properties found</div>
          ) : (
            <div className="grid grid-cols-1 p-7 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Card
                  key={property.id}
                  className="shadow-lg hover:shadow-xl hover:bg-muted transition-shadow duration-300"
                >
                  <CardHeader className="p-0">
                    <CldImage
                      src={property.images[0]}
                      alt="NA"
                      width={100}
                      height={100}
                      className="w-full rounded-t-lg h-[200px] object-cover"
                    />
                    <div className="p-4">
                      <CardTitle className="text-2xl font-bold">
                        {property.title}
                      </CardTitle>
                      <CardDescription className="flex dark:text-slate-200 items-center space-x-1 mt-2">
                        <DollarSign />
                        <span className="text-xl font-semibold">
                          {property.price}
                        </span>
                      </CardDescription>
                      <CardDescription className="flex dark:text-slate-200 items-center text-xs space-x-2 mt-2">
                        <LocateIcon />
                        <span className="font-semibold">
                          ${property.address}
                        </span>
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardFooter className="p-4 flex justify-between items-center">
                    <Badge>
                      <Link href={`/profile/${property.owner.id}`}>
                        @{property.owner.email}
                      </Link>
                    </Badge>
                    <Badge>New</Badge>
                  </CardFooter>
                  <CardContent className="p-4">
                    <CardDescription className="text-gray-600 dark:text-slate-300 mb-4">
                      {truncateText(property.description, 20)}
                    </CardDescription>
                    <Button className="w-full">
                      <Link href={`/properties/${property.id}`}>Explore</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
