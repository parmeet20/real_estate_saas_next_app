"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/conf/ApiUrl";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerFormSchema = z.object({
  email: z.string().email().min(4).max(25),
  password: z
    .string()
    .min(8, { message: "password should be at least 8 characters" }),
  profileImage: z.string(),
  contactNumber: z
    .string()
    .length(10, { message: "contact number is not valid" }),
});

const Page: React.FC = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
  });
  const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    try {
      await axios
        .post(`${API_URL}/auth/signup`, values)
        .then((res) => console.log(res.data));
      toast({
        title: "SUCCESS",
        description: "resigtration successful",
      });
      router.push("/login")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col w-[400px] my-3 mx-auto p-8 h-[500] border shadow-2xl border-black dark:border-white rounded-2xl"
        >
          <div className="text-3xl flex items-center font-semibold">
            <User className="text-slate-800 mt-1 mr-1 dark:text-slate-200" />
            Register
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profileImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>profileImage</FormLabel>
                <FormControl>
                  <Input placeholder="profileImage" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>contactNumber</FormLabel>
                <FormControl>
                  <Input placeholder="contactNumber" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Register</Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
