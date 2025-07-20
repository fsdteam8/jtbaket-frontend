import Image from "next/image";
import React from "react";

const LoginPage = () => {
  return (
    <div className="h-screen">
      <div>
        <Image
          src="/assets/images/auth-img.png"
          width={1112}
          height={882}
          alt="auth image"
        />
      </div>
    </div>
  );
};

export default LoginPage;
