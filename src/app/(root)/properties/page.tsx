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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Country } from "./create/page";

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
  const [country, setCountry] = useState<string>("");
  const [debouncedCountry, setDebouncedCountry] = useState<string>("");
  const [countries, setCountries] = useState<{ name: string; code: string }[]>(
    []
  );

  const {
    fetchFilteredProperties,
    fetchSearchedProperties,
    properties = [],
  } = propertyStore();

  useEffect(() => {
    // Fetch country list from the API
  const countryList = data
        .map((country: Country) => ({
          name: country.name.common,
        }))
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .sort((a, b) => a.name.localeCompare(b.name));

      setCountries(countryList);
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    // Debounce effect to delay search query
    const timeoutId = setTimeout(() => {
      setDebouncedCountry(country);
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(timeoutId);
    };
  }, [country]);

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedCountry) {
        await fetchSearchedProperties({
          country: debouncedCountry,
          bathroom,
          bedroom,
          price,
          latest,
          busDistance,
          schoolDistance,
          area,
        });
      } else {
        await fetchFilteredProperties({
          bathroom,
          bedroom,
          price,
          latest,
          busDistance,
          schoolDistance,
          area,
        });
      }
    };
    fetchData();
  }, [
    debouncedCountry,
    bathroom,
    bedroom,
    price,
    latest,
    busDistance,
    schoolDistance,
    area,
    fetchFilteredProperties,
    fetchSearchedProperties,
  ]);

  const mapItems = properties.map((property) => ({
    id: property.id,
    latitude: parseFloat(property.latitude),
    longitude: parseFloat(property.longitude),
    image: property.images[0],
    title: property.title,
    bedrooms: property.bedroom?.toString(),
    price: property.price,
  }));

  return (
    <div className="p-4 sm:p-5 space-y-4 sm:space-y-6">
      <Map items={mapItems} />
      <div className="w-[500px] px-4 sm:px-8 mt-4">
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent
            style={{
              zIndex: 1000,
              position: "relative",
            }}
          >
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.name}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Accordion type="single" collapsible className="w-full px-4 sm:px-8">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <Button className="w-[100px] text-center">Filter</Button>
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <span>Latest</span>
              <Switch
                className="ml-2"
                checked={latest}
                onClick={() => setLatest((prev) => !prev)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <span>Price</span>
              <Switch
                className="ml-2"
                checked={price}
                onClick={() => setPrice((prev) => !prev)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <span>Area</span>
              <Switch
                className="ml-2"
                checked={area}
                onClick={() => setArea((prev) => !prev)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <span>Bedrooms</span>
              <Switch
                className="ml-2"
                checked={bedroom}
                onClick={() => setBedroom((prev) => !prev)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <span>Bathrooms</span>
              <Switch
                className="ml-2"
                checked={bathroom}
                onClick={() => setBathroom((prev) => !prev)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <span>Bus distance</span>
              <Switch
                className="ml-2"
                checked={busDistance}
                onClick={() => setBusDistance((prev) => !prev)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <span>School distance</span>
              <Switch
                className="ml-2"
                checked={schoolDistance}
                onClick={() => setSchoolDistance((prev) => !prev)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex flex-col">
        {properties.length === 0 ? (
          <div className="text-center">No properties found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                    className="w-full overflow-hidden rounded-t-lg h-[200px] sm:h-[250px] object-cover"
                  />
                  <div className="p-3 sm:p-4">
                    <CardTitle className="text-xl sm:text-2xl font-bold">
                      {property.title}
                    </CardTitle>
                    <CardDescription className="flex dark:text-slate-200 items-center space-x-1 mt-2">
                      <DollarSign />
                      <span className="text-lg sm:text-xl font-semibold">
                        {property.price}
                      </span>
                    </CardDescription>
                    <CardDescription className="flex dark:text-slate-200 items-center text-xs space-x-2 mt-2">
                      <LocateIcon />
                      <span className="font-semibold text-sm sm:text-base">
                        {property.address}
                      </span>
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardFooter className="p-3 sm:p-4 flex justify-between items-center">
                  <Badge>
                    <Link href={`/profile/${property.owner.id}`}>
                      @{property.owner.email}
                    </Link>
                  </Badge>
                  <Badge>New</Badge>
                </CardFooter>
                <CardContent className="p-3 sm:p-4">
                  <CardDescription className="text-gray-600 dark:text-slate-300 mb-4 text-sm sm:text-base">
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
  );
};

export default Page;
