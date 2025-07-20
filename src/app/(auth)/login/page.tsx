import Image from "next/image";
import React from "react";
import LoginForm from "./_components/login-form";

const LoginPage = () => {
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
      <div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
