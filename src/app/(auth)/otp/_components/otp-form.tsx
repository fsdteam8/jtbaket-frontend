"use client";

import {
  useState,
  useRef,
  useEffect,
  type KeyboardEvent,
  type ClipboardEvent,
} from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

export default function OtpForm() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email");
  const decodedEmail = decodeURIComponent(email || "");
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // otp api integrtion

  const otpMutation = useMutation({
    mutationFn: async (bodyData: { email: string; otp: string }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "OTP verification failed");
      }

      return res.json();
    },
    onSuccess: (data, variables) => {
      toast.success(data.message || "OTP verified successfully");
      router.push(
        `/reset-password?email=${encodeURIComponent(variables.email)}`
      );
    },
    onError: (error: Error) => {
      toast.error(error.message || "Invalid OTP");
    },
  });


  // reset otp api integrattion
      const { mutate:resentOtp, isPending: resentOtpPending } = useMutation({
      mutationKey: ["resent-otp"],
      mutationFn: (email: string) =>
        fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/forget-password`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        ).then((res) => res.json()),
      onSuccess: (data, email) => {
        if (!data?.status) {
          toast.error(data?.message || "Something went wrong");
          return;
        } else {
          toast.success(data?.message || "Email sent successfully!");
          router.push(`/otp?email=${encodeURIComponent(email)}`);
        }
      },
    });

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);

      if (inputRefs.current[5]) {
        inputRefs.current[5].focus();
      }
    }
  };

  // handle resend otp
  const handleResendOtp = async () => {
    resentOtp(decodedEmail);
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      toast.error("Please enter all 6 digits of the OTP.");
      return;
    }

    if (!email) {
      toast.error("Email is missing from the URL.");
      return;
    }

    otpMutation.mutate({ otp: otpValue, email });
  };

  return (
    <div className="w-[547px] p-6 md:p-7 lg:p-8 rounded-[16px] bg-white shadow-[0px_0px_4px_rgba(0,0,0,0.10)]">
      <h3 className="text-2xl md:text-[28px] lg:text-[32px] font-extrabold text-primary text-center leading-[120%] pb-4">
        Enter OTP
      </h3>
      <p className="text-lg font-normal text-[#787878] leading-[170%] text-center">
        Please enter the email address linked to your <br /> account. We&apos;ll
        send a one-time password (OTP) to <br /> your email for verification.
      </p>
      <div className="pt-5 md:pt-6">
        <div className="flex gap-[18px] w-full justify-center">
          {otp.map((digit, index) => (
            <Input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              className={`font-poppins w-[52px] h-[58px] bg-white text-primary placeholder:text-[#999999] text-center text-2xl font-medium leading-[120%] border-[1px] rounded-md focus:outline-none ${
                digit ? "border-black" : "border-[#595959]"
              }`}
              aria-label={`OTP digit ${index + 1}`}
            />
          ))}
        </div>

        {/* Resend OTP */}
        <div className="text-center my-6">
          <span className="text-base font-medium text-primary">
            Didn&apos;t Receive OTP?{" "}
          </span>
          <button
            onClick={handleResendOtp}
            disabled={resentOtpPending}
            className="text-base font-medium text-secondary hover:underline"
          >
            {resentOtpPending ? "Resending..." : "RESEND OTP"}
          </button>
        </div>

        {/* Verify Button */}
        <Button
          onClick={handleVerify}
          disabled={otpMutation.isPending}
          className="text-lg font-bold text-[#F8FAF9] leading-[120%] rounded-full w-full h-[52px] bg-primary shadow-[0px_4px_4px_0px_rgba(0, 0, 0, 0.15)]"
          type="button"
        >
          {otpMutation.isPending ? "Verifying..." : "Verify Now"}
        </Button>

        <p className="flex items-center justify-center gap-1 text-sm font-medium leading-[120%] pt-5 md:pt-6">
          <Link className="hover:underline text-[#293440]" href="/login">
            Back to Login
          </Link>
          <Link href="/sign-up" className="text-secondary pl-1 hover:underline">
            Register Here Now
          </Link>
        </p>
      </div>
    </div>
  );
}
