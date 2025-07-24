import React from "react";
import "@/app/globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const WebsiteLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>
    <Navbar />
    {children}
    <Footer />
  </div>;
};

export default WebsiteLayout;
