import Image from "next/image";
import React from "react";

const AuthLayoutDesign = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex items-center gap-2">
      <div>
        <Image
          src="/assets/images/auth-img.png"
          width={1112}
          height={882}
          alt="auth image"
        />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default AuthLayoutDesign;
