"use client"

import {
    useForm,
} from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useState, useRef } from "react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import FooterBannar from "@/components/footerBannar"
import BannerSection from "@/components/homeHeaders/BannerSection"

const profileSchema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(6, "Invalid phone number"),
    country: z.string().min(1, "Country is required"),
    cityState: z.string().min(1, "City/State is required"),
    business: z.string().optional(),
    postalCode: z.string().min(4, "Postal Code is required"),
    taxId: z.string().min(4, "Tax ID is required"),
    image: z.any().optional(),
})

type ProfileFormData = z.infer<typeof profileSchema>

interface ProfileInfoComponentProps {
    setChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfileInfoComponent({ setChange }: ProfileInfoComponentProps) {
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [isEditing, setIsEditing] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: "Bessie",
            lastName: "Edwards",
            email: "bessie.edwards@example.com",
            phone: "+1 (555) 000-0000",
            country: "",
            cityState: "",
            business: "",
            postalCode: "",
            taxId: "",
        },
    })

    const onSubmit = (data: ProfileFormData) => {
        console.log("Form submitted with:", data)
        setIsEditing(false)  // Disable inputs after save
    }

    const handleLogout = () => {
        console.log("Logout clicked")
    }

    const imageFile = watch("image")?.[0]
    if (imageFile && typeof window !== "undefined") {
        const reader = new FileReader()
        reader.onloadend = () => {
            setPreviewImage(reader.result as string)
        }
        reader.readAsDataURL(imageFile)
    }

    const handleAvatarClick = () => {
        if (isEditing) {
            fileInputRef.current?.click()
        }
    }

    return (
        <div>
            <BannerSection image={'/account.jpg'} />
            <div className="min-h-screen bg-[#F8FEFF] py-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className=" rounded-lg shadow-sm p-6 mb-6">
                            <h1 className="text-2xl font-semibold text-center mb-6">My Profile</h1>

                            {/* Profile Image Upload with Avatar */}
                            <div className="flex flex-col items-start gap-[24px] mb-[42px] ">
                                <h2 className="text-lg font-medium mb-4">Personal Information</h2>
                                <div className="flex items-center gap-6">
                                    <div className="flex flex-col items-center mb-4">
                                        <div
                                            className={`mb-2 cursor-pointer border rounded-full ${isEditing ? "" : "pointer-events-none opacity-70"}`}
                                            onClick={handleAvatarClick}
                                        >
                                            <Avatar className="w-40 h-40">
                                                <AvatarImage
                                                    src={previewImage || "/placeholder.svg?height=80&width=80"}
                                                    alt="Profile"
                                                />
                                                <AvatarFallback>BE</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            {...register("image")}
                                            ref={(e) => {
                                                register("image").ref(e)
                                                fileInputRef.current = e
                                            }}
                                            className="hidden"
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-[#131313]">Bessie Edwards</h3>
                                        <p className="text-sm text-[#424242] mb-2">bessie.edwards@example.com</p>
                                        <p className="text-sm text-[#424242]">3891 Ranchview Dr. Richardson, California 62639</p>
                                    </div>
                                </div>
                                {/* Only show Save button when editing */}
                                <div className="flex justify-between w-full">
                                    <Button
                                        type="submit"
                                        className="bg-primary flex hover:bg-primary/90 text-white px-6 py-2 rounded-full"
                                    >
                                        Save
                                    </Button>
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="text-red-500 hover:text-red-600 text-sm font-medium"
                                    >
                                        Log out
                                    </button>
                                </div>
                            </div>

                            {/* Input Fields */}
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" {...register("firstName")} disabled={!isEditing} />
                                        {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" {...register("lastName")} disabled={!isEditing} />
                                        {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" {...register("email")} disabled={!isEditing} />
                                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input id="phone" {...register("phone")} disabled={!isEditing} />
                                        {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="country">Country</Label>
                                        <Input id="country" {...register("country")} disabled={!isEditing} />
                                        {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="cityState">City/State</Label>
                                        <Input id="cityState" {...register("cityState")} disabled={!isEditing} />
                                        {errors.cityState && <p className="text-sm text-red-500">{errors.cityState.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="business">Business</Label>
                                    <Textarea
                                        id="business"
                                        {...register("business")}
                                        placeholder="Describe your business..."
                                        className="min-h-[80px]"
                                        disabled={!isEditing}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="postalCode">Postal Code</Label>
                                        <Input id="postalCode" {...register("postalCode")} disabled={!isEditing} />
                                        {errors.postalCode && <p className="text-sm text-red-500">{errors.postalCode.message}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="taxId">Tax ID</Label>
                                        <Input id="taxId" {...register("taxId")} disabled={!isEditing} />
                                        {errors.taxId && <p className="text-sm text-red-500">{errors.taxId.message}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between items-center mt-6">
                                <div className="flex justify-between w-full items-center">
                                    <Button
                                        type="button"
                                        onClick={() => setIsEditing(true)}
                                        className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full"
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        type="button"
                                        onClick={() => setChange(true)}
                                        className="border-gray-300 bg-transparent text-black ring-1 ring-gray-200 hover:bg-transparent hover:shadow-lg shadow-md px-6 py-2 rounded-full"
                                    >
                                        Change Password
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>

                    {/* Contact Section */}
                    <FooterBannar />
                </div>
            </div>
        </div>

    )
}
