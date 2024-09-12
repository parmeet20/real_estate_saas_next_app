"use client";
import { Button } from "@/components/ui/button";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
import axios from "axios";
import { Building } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { API_URL } from "@/conf/ApiUrl";
import { userAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { Property } from "@/store/propertyStore";
import { toast } from "@/hooks/use-toast";
import AuthenticatedPage from "@/components/shared/AuthenticatedPage";

const registerFormSchema = z.object({
  propertyType: z.enum(["HOUSE", "RENT", "CONDO", "STUDIO", "APARTMENT"], {
    message: "this field is required",
  }),
  title: z
    .string()
    .min(5, "should be at least 5 characters")
    .max(35, "should not exceed 35 characters"),
  description: z
    .string()
    .min(10, "should be at least 10 characters")
    .max(1000, "should not exceed 1000 characters"),
  city: z.string().nonempty("City is required"),
  address: z.string().nonempty("Address is required"),
  latitude: z.string().nonempty("Latitude is required"),
  longitude: z.string().nonempty("Longitude is required"),
  utilities: z.array(z.string()).default([]),
  images: z.array(z.string()).nonempty("Images are required"),
  petAllowed: z.boolean().default(false),
  smokingAllowed: z.boolean().default(false),
  price: z.string(),
  area: z.string(),
  busDistance: z.string(),
  schoolDistance: z.string(),
  bathroom: z.string(),
  bedroom: z.string(),
});

const Page: React.FC = () => {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      images: [],
    },
  });
  const router = useRouter();
  const { user } = userAuthStore();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
  const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    try {
      const res = await axios.post<Property>(
        `${API_URL}/api/properties/create/${user?.id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push(`/properties/${res.data.id}`);
      toast({
        title: "SUCCESS",
        description: "Property created successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "UPGRADE YOUR PLAN",
        description: "Upgrade your plan to add more listings",
      });
    }
    console.log(values);
  };

  return (
    user?.id?(<div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col w-[70%] my-3 mx-auto p-8 h-[500] border shadow-2xl border-black dark:border-white rounded-2xl"
        >
          <div className="text-3xl flex items-center font-semibold">
            <Building className="text-slate-800 mt-1 mr-1 dark:text-slate-200" />
            Create a listing
          </div>
          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Type</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="select the property type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="HOUSE">HOUSE</SelectItem>
                    <SelectItem value="CONDO">CONDO</SelectItem>
                    <SelectItem value="STUDIO">STUDIO</SelectItem>
                    <SelectItem value="RENT">RENT</SelectItem>
                    <SelectItem value="APARTMENT">APARTMENT</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="enter your property description here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input placeholder="latitude" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input placeholder="longitude" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="utilities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Utilities</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-2 space-y-2">
                    {[
                      "Electricity",
                      "Water",
                      "Gas",
                      "Internet",
                      "Parking",
                      "Backyard",
                    ].map((utility) => (
                      <div key={utility}>
                        <Checkbox
                          checked={field.value?.includes(utility)}
                          onCheckedChange={(checked) => {
                            const updatedValue = checked
                              ? [...(field.value || []), utility]
                              : (field.value || []).filter(
                                  (val) => val !== utility
                                );
                            field.onChange(updatedValue);
                          }}
                        />
                        <label className="ml-2">{utility}</label>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <CldUploadWidget
                    uploadPreset="estateWebsite"
                    onUpload={(result) => {
                      if (result.event !== "success") return;
                      const info = result.info as { secure_url: string };
                      // Update the form field value with the new image URL
                      field.onChange([...field.value, info.secure_url]);
                    }}
                  >
                    {({ open }) => (
                      <div>
                        <Button type="button" onClick={() => open()}>
                          Upload Images
                        </Button>
                        {field.value && field.value.length > 0 && (
                          <div className="mt-4">
                            {field.value.map((url, index) => (
                              <CldImage
                                key={index}
                                src={url}
                                alt={`Uploaded ${index + 1}`}
                                width={100}
                                height={100}
                                className="mr-2 mb-2" // Adding margin for better spacing
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </CldUploadWidget>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="price" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area</FormLabel>
                <FormControl>
                  <Input placeholder="area" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="busDistance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bus Distance</FormLabel>
                <FormControl>
                  <Input placeholder="bus distance" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="schoolDistance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School Distance</FormLabel>
                <FormControl>
                  <Input
                    placeholder="school distance"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bathroom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bathroom</FormLabel>
                <FormControl>
                  <Input placeholder="bathroom" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bedroom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bedroom</FormLabel>
                <FormControl>
                  <Input placeholder="bedroom" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 justify-between">
            <FormField
              control={form.control}
              name="petAllowed"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="ml-2">Pet Allowed</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="smokingAllowed"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="ml-2">Smoking Allowed</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Create listing</Button>
        </form>
      </Form>
    </div>):<AuthenticatedPage/>
  );
};

export default Page;