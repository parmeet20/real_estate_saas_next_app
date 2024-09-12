import Navbar from "@/components/shared/Navbar";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div>
        <NextTopLoader color="#5D616D" showSpinner={false} />
        <Navbar />
        {children}
      </div>
      <Toaster />
    </ThemeProvider>
  );
};

export default layout;
