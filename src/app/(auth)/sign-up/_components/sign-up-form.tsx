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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import SuccessfullyApprovedModal from "@/components/modals/sucessfully-approved-modal";

const formSchema = z
  .object({
    fullName: z.string().min(2, {
      message: "Full Name must be at least 2 characters.",
    }),
    phoneNumber: z.string().min(2, {
      message: "Phone Number must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    rememberMe: z.boolean(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div>
      <div className="w-[547px] p-6 md:p-7 lg:p-8 rounded-[16px] bg-white shadow-[0px_0px_4px_rgba(0,0,0,0.10)]">
        <p className="text-lg font-normal text-[#787878] leading-[170%] text-center pb-1">
          Welcome to Account Request Form
        </p>
        <h3 className="text-2xl md:text-[28px] lg:text-[32px] font-extrabold text-secondary text-center leading-[120%] ">
          Create an account{" "}
        </h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 pt-5 md:pt-6"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1 text-base font-medium leading-[120%] text-primary pb-2">
                    Full Name{" "}
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
                    <Input
                      className="w-full h-[52px] text-base font-medium leading-[120%] text-primary rounded-[32px] p-4 border border-[#484848] opacity-80 placeholder:text-[#787878]"
                      placeholder="Enter your name ...."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1 text-base font-medium leading-[120%] text-primary pb-2">
                    Phone Number{" "}
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
                    <Input
                      className="w-full h-[52px] text-base font-medium leading-[120%] text-primary rounded-[32px] p-4 border border-[#484848] opacity-80 placeholder:text-[#787878]"
                      placeholder="Enter your Number ...."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1 text-base font-medium leading-[120%] text-primary pb-2">
                    Email{" "}
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
                    <Input
                      className="w-full h-[52px] text-base font-medium leading-[120%] text-primary rounded-[32px] p-4 border border-[#484848] opacity-80 placeholder:text-[#787878]"
                      placeholder="Enter your email ...."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
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
                        placeholder="Enter Password ...."
                        {...field}
                      />
                      <button className="absolute top-3.5 right-4">
                        {showPassword ? (
                          <Eye onClick={() => setShowPassword(!showPassword)} />
                        ) : (
                          <EyeOff
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
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
                        placeholder="Enter Password ...."
                        {...field}
                      />
                      <button className="absolute top-3.5 right-4">
                        {showConfirmPassword ? (
                          <Eye
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          />
                        ) : (
                          <EyeOff
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-center gap-[10px]">
                  <FormControl className="mt-2">
                    <Checkbox
                      id="rememberMe"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <Label
                    className="text-sm font-medium text-secondary leading-[120%] font-manrope"
                    htmlFor="rememberMe"
                  >
                    I agree to the terms & conditions
                  </Label>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Button
              onClick={() => setIsOpen(true)}
              className="text-lg font-bold text-[#F8FAF9] leading-[120%] rounded-[32px] w-full h-[52px] bg-secondary shadow-[0px_4px_4px_0px_rgba(0, 0, 0, 0.15)]"
              type="submit"
            >
              Account Request
            </Button>
            <p className="text-sm font-medium leading-[120%] text-[#363636] text-center ">
              Don’t have an account?
              <Link
                href="/login"
                className="text-secondary pl-1 hover:underline"
              >
                Log in
              </Link>{" "}
            </p>
          </form>
        </Form>
      </div>

      {/* successfully modal  */}
      {isOpen && (
        <SuccessfullyApprovedModal
          open={isOpen}
          onOpenChange={() => setIsOpen(false)}
          title="Successfully Approved Your Account"
          desc="Your affiliate account has been approved"
        />
      )}
    </div>
  );
};

export default SignUpForm;
