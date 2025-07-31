"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("d386eb14-dc2e-4e6c-9f04-38ee34a9644b");
  }, []);
  return null;
};

export default CrispChat;
