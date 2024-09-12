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
import { useRouter } from "next/navigation";

import { userAuthStore } from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";

const loginFormSchema = z.object({
  email: z.string().email().min(4).max(25),
  password: z
    .string()
    .min(8, { message: "password should be at least 8 characters" }),
});

const Page: React.FC = () => {
  const { login } = userAuthStore();
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });
  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    await login(values.email, values.password);
    toast({
      title: "SUCCESS",
      description: "login succes",
    });
    router.push("/");
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col w-[400px] my-3 mx-auto p-8 h-[500] border shadow-2xl border-black dark:border-white rounded-2xl"
        >
          <div className="text-3xl flex items-center font-semibold">
            <User className="text-slate-800 mt-1 mr-1 dark:text-slate-200" />
            Login
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

          <Button type="submit">Login</Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
