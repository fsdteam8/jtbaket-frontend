"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("08abbceb-3541-4c9f-b461-be0f12d75be7");
  }, []);
  return null;
};

export default CrispChat;
