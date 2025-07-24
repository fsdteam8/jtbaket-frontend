import React from "react";
import "@/app/globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "sonner";

const WebsiteLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>
    <Navbar />
    <Toaster/>
    {children}
    <Footer />
  </div>;
};

export default WebsiteLayout;
