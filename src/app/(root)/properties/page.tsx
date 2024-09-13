"use client";

import { Button } from "@/components/ui/button";
import { propertyStore } from "@/store/propertyStore";
import React, { useEffect, useState } from "react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";

// Helper function to truncate text
const truncateText = (text: string, wordLimit: number) => {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

const Page = () => {
  // State for filters
  const [bathroom, setBathroom] = useState<boolean>(false);
  const [bedroom, setBedroom] = useState<boolean>(false);
  const [price, setPrice] = useState<boolean>(false);
  const [latest, setLatest] = useState<boolean>(false);
  const [busDistance, setBusDistance] = useState<boolean>(false);
  const [schoolDistance, setSchoolDistance] = useState<boolean>(false);
  const [area, setArea] = useState<boolean>(false);

  const { fetchFilteredProperties, properties = [] } = propertyStore();

  useEffect(() => {
    const fetchData = async () => {
      await fetchFilteredProperties({
        bathroom,
        bedroom,
        price,
        latest,
        busDistance,
        schoolDistance,
        area,
      });
    };
    fetchData();
  }, [
    fetchFilteredProperties,
    bathroom,
    bedroom,
    price,
    latest,
    busDistance,
    schoolDistance,
    area,
  ]);

  const mapItems = properties.map((property) => ({
    id: property.id,
    latitude: parseFloat(property.latitude),
    longitude: parseFloat(property.longitude),
    image: property.images[0],
    title: property.title,
    bedrooms: property.bedroom.toString(),
    price: property.price,
  }));

  return (
    <div className="p-5 space-y-3">
      <Map items={mapItems} />
      <Accordion type="single" collapsible className="w-full px-8">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <Button>Filter</Button>
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-4">
            <div className="flex items-center p-3">
              Latest
              <Switch
                className="ml-2"
                checked={latest}
                onClick={() => setLatest((prev) => !prev)}
              />
            </div>
            <div className="flex items-center p-3">
              Price
              <Switch
                className="ml-2"
                checked={price}
                onClick={() => setPrice((prev) => !prev)}
              />
            </div>
            <div className="flex items-center p-3">
              Area
              <Switch
                className="ml-2"
                checked={area}
                onClick={() => setArea((prev) => !prev)}
              />
            </div>
            <div className="flex items-center p-3">
              Bedrooms
              <Switch
                className="ml-2"
                checked={bedroom}
                onClick={() => setBedroom((prev) => !prev)}
              />
            </div>
            <div className="flex items-center p-3">
              Bathrooms
              <Switch
                className="ml-2"
                checked={bathroom}
                onClick={() => setBathroom((prev) => !prev)}
              />
            </div>
            <div className="flex items-center p-3">
              Bus distance
              <Switch
                className="ml-2"
                checked={busDistance}
                onClick={() => setBusDistance((prev) => !prev)}
              />
            </div>
            <div className="flex items-center p-3">
              School distance
              <Switch
                className="ml-2"
                checked={schoolDistance}
                onClick={() => setSchoolDistance((prev) => !prev)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
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
                      className="w-full overflow-hidden rounded-t-lg h-[200px] object-cover"
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
                          {property.address}
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
                      {truncateText(property.description ?? "", 20)}
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
