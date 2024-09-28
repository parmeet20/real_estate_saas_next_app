"use client";
import { Button } from "@/components/ui/button";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { Checkbox } from "@/components/ui/checkbox";
import { GoogleGenerativeAI } from "@google/generative-ai";
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
import { Brain, BrainCircuit, Building, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { API_URL, GEMENI_API_KEY } from "@/conf/ApiUrl";
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
    .max(100, "should not exceed 100 characters"),
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

const Page = () => {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      images: [],
    },
  });

  const genAI = new GoogleGenerativeAI(GEMENI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Write a description on beautiful ${form.watch(
    "propertyType"
  )} in city for ${form.watch("city")} ${form.watch(
    "title"
  )} title in 200 words`;
  const generateDescription = async () => {
    try {
      setLoading(true);
      await model
        .generateContent(prompt)
        .then((res) => form.setValue("description", res.response.text()));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();
  const { user } = userAuthStore();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
  const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState<boolean>(false);
  return user?.id ? (
    <div>
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
                  <>
                    <Textarea
                      placeholder="enter your property description here"
                      className={`${loading?"bg-muted animate-pulse":""}`}
                      {...field}
                    />
                    <button
                      onClick={() => generateDescription()}
                      className={`relative ${
                        loading ? "animate-pulse" : ""
                      } inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50`}
                    >
                      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                      <span className="inline-flex h-full w-full cursor-pointer items-center space-x-3 justify-center bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full px-3 py-1 text-sm font-medium text-slate-300 backdrop-blur-3xl">
                        {loading ? "Generating with AI" : "Generate with AI"}
                        {loading ? (
                          <BrainCircuit className="ml-2" />
                        ) : (
                          <Brain className="ml-2" />
                        )}
                      </span>
                    </button>
                  </>
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
          <Button type="submit" disabled={loading}>
            {!loading ? (
              "Create listing"
            ) : (
              <>
                {" "}
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  ) : (
    <AuthenticatedPage />
  );
};

export default Page;
