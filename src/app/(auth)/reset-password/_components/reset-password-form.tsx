"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import SuccessfullyApprovedModal from "@/components/modals/sucessfully-approved-modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const formSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const ResetPasswordForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (bodyData: { email: string; newPassword: string }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password`,
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
        throw new Error(errorData.message || "Password reset failed");
      }

      return res.json();
    },

    onSuccess: (data) => {
      if (data?.status) {
        // toast.success(data?.message || "Password reset successfully");
        setIsOpen(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
        return;
      }
    },

    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!email) {
      toast.error("Missing email. Please go back and try again.");
      return;
    }

    resetPasswordMutation.mutate({
      email,
      newPassword: values.confirmPassword,
    });
  };

  return (
    <div>
      <div className="w-[547px] p-6 md:p-7 lg:p-8 rounded-[16px] bg-white shadow-[0px_0px_4px_rgba(0,0,0,0.10)]">
        <h3 className="text-2xl md:text-[28px] lg:text-[32px] font-extrabold text-primary text-center leading-[120%] pb-4">
          New Password
        </h3>
        <p className="text-lg font-normal text-[#787878] leading-[170%] text-center">
          Please Create your new password
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 pt-5 md:pt-6"
          >
            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1 text-base font-medium leading-[120%] text-primary pb-2">
                    Password
                    <sup>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                      >
                        <path
                          d="M8 2.94136L5.09314 2.75025L3.99841 0L2.90367 2.75025L0 2.94136L2.22709 4.83239L1.49628 7.70097L3.99841 6.11939L6.50055 7.70097L5.76973 4.83239L8 2.94136Z"
                          fill="#04AF1E"
                        />
                      </svg>
                    </sup>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        className="w-full h-[52px] text-base font-medium leading-[120%] text-primary rounded-[32px] p-4 border border-[#484848] opacity-80 placeholder:text-[#787878]"
                        placeholder="Enter Password ..."
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute top-3.5 right-4"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Eye /> : <EyeOff />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1 text-base font-medium leading-[120%] text-primary pb-2">
                    Confirm Password
                    <sup>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                      >
                        <path
                          d="M8 2.94136L5.09314 2.75025L3.99841 0L2.90367 2.75025L0 2.94136L2.22709 4.83239L1.49628 7.70097L3.99841 6.11939L6.50055 7.70097L5.76973 4.83239L8 2.94136Z"
                          fill="#04AF1E"
                        />
                      </svg>
                    </sup>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        className="w-full h-[52px] text-base font-medium leading-[120%] text-primary rounded-[32px] p-4 border border-[#484848] opacity-80 placeholder:text-[#787878]"
                        placeholder="Confirm Password ..."
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute top-3.5 right-4"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? <Eye /> : <EyeOff />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              disabled={resetPasswordMutation.isPending}
              className="text-lg font-bold text-[#F8FAF9] leading-[120%] rounded-full bg-primary w-full h-[52px]  shadow-[0px_4px_4px_0px_rgba(0, 0, 0, 0.15)]"
            >
              {resetPasswordMutation.isPending
                ? "Submitting..."
                : "Reset Password"}
            </Button>
          </form>
        </Form>
      </div>

      {/* Success Modal */}
      {isOpen && (
        <SuccessfullyApprovedModal
          open={isOpen}
          onOpenChange={() => setIsOpen(false)}
          title="Password Changed Successfully"
          desc="Your password has been updated successfully"
        />
      )}
    </div>
  );
};

export default ResetPasswordForm;
