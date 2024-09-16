import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Page = () => {
  return (
    <div className="pt-8 p-5 min-h-screen flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
          Welcome to {"   "}
          <span className="text-purple-400">EstateWave</span>
        </h1>
        <p className="text-lg dark:text-gray-300 text-gray-500 mt-2">
          Find your dream home with us
        </p>
        <Button className="mt-4">
          <Link href="/properties">Listings</Link>
        </Button>
      </div>
      <div className="grid gap-8 mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        <div className="col-span-1 sm:col-span-2">
          <img
            className="w-full rounded-2xl h-[300px] object-cover"
            src="https://img.freepik.com/premium-photo/miniature-house-hd-8k-wallpaper-stock-photographic-image_890746-33717.jpg?w=1060"
            alt="Property"
          />
        </div>
        <div>
          <img
            className="w-full h-[300px] rounded-2xl object-cover"
            src="https://img.freepik.com/premium-photo/mini-house-hd-8k-wallpaper-stock-photographic-image_890746-17346.jpg?w=1060"
            alt="Property"
          />
        </div>
        <div>
          <img
            className="w-full h-[300px] rounded-2xl object-cover"
            src="https://as2.ftcdn.net/v2/jpg/03/47/64/53/1000_F_347645372_yWoZTyH9FcATKrJTdFtKwxjOGbbANpEC.jpg"
            alt="Property"
          />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <img
            className="w-full rounded-2xl h-[300px] object-cover"
            src="https://img.freepik.com/premium-photo/property-background-hd-8k-wallpaper-stock-photographic-image_890746-17967.jpg?w=1060"
            alt="Property"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-8 gap-4 w-full p-8">
        <Card className="hover:bg-muted">
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl">100+</CardTitle>
            <CardDescription>Trusted by 100+ companies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Our platform is trusted by over 100 companies worldwide.
            </div>
          </CardContent>
        </Card>
        <Card className="hover:bg-muted">
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl">100+</CardTitle>
            <CardDescription>100+ listings per hour</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              We receive over 100 new property listings every hour.
            </div>
          </CardContent>
        </Card>
        <Card className="hover:bg-muted">
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl">24/7</CardTitle>
            <CardDescription>Customer Support</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Our customer support is available 24/7 to assist you.
            </div>
          </CardContent>
        </Card>
        <Card className="hover:bg-muted">
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl">500+</CardTitle>
            <CardDescription>500+ successful deals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              We have successfully closed over 500 property deals.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
