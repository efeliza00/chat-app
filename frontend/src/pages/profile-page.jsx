import { format } from "date-fns"
import { AtSign, Camera, Dot, User } from "lucide-react"
import React, { useState } from "react"
import { useAuthStore } from "../store/use-auth-store"

const ProfilePage = () => {
    const { authUser, updateProfile, isUpdatingProfile } = useAuthStore()
    const [profileImage, setProfileImage] = useState(null)

    const createdAt = format(new Date(authUser?.createdAt), "MMMM dd, yyyy")

    const handleUploadProfile = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = async () => {
            const base64Image = reader.result
            setProfileImage(base64Image)
            await updateProfile({ profilePic: base64Image })
        }
    }

    return (
        <div className="pt-20">
            <div className="max-w-2xl mx-auto py-8">
                <div className="bg-base-300 rounded-lg px-6 py-8 space-y-8 shadow-md">
                    <div className="flex flex-col items-center gap-4">
                        <h1 className="text-2xl tracking-tight font-semibold">
                            Profile
                        </h1>
                        <div className="relative flex flex-col items-center gap-1">
                            <img
                                src={
                                    profileImage ||
                                    authUser.profilePic ||
                                    "/images/avatar.jpg"
                                }
                                alt="profile-pic"
                                className="object-cover size-32 rounded-full ring-2 ring-primary"
                            />
                            <label
                                htmlFor="avatar-upload"
                                className="absolute right-0 bottom-0 p-2 btn btn-sm rounded-full"
                            >
                                <Camera className="size-4" />
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    id="avatar-upload"
                                    disabled={isUpdatingProfile}
                                    onChange={handleUploadProfile}
                                />
                            </label>
                        </div>
                        <p className="tracking-tight text-sm">
                            {isUpdatingProfile
                                ? "Uploading..."
                                : "Click the camera button to upload your profile photo."}
                        </p>
                    </div>

                    <div className="space-y-6 max-w-md mx-auto">
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                                <User className="size-4" />
                                <span className="tracking-tight font-semibold">
                                    Full Name
                                </span>
                            </div>
                            <p className="px-4 py-2 border border-primary/20 rounded-xl">
                                {authUser.fullName}
                            </p>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                                <AtSign className="size-4" />
                                <span className="tracking-tight font-semibold">
                                    Email
                                </span>
                            </div>
                            <p className="px-4 py-2 border border-primary/20 rounded-xl">
                                {authUser.email}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6 max-w-md mx-auto">
                        <h3 className="font-semibold tracking-tight text-xl">
                            Account Information
                        </h3>

                        <div className="flex items-center justify-between">
                            <h3 className="tracking-tight">Member Since</h3>
                            <p className="text-sm">{createdAt}</p>
                        </div>

                        <div className="divider"></div>

                        <div className="flex items-center justify-between">
                            <h3 className="tracking-tight">Account Status</h3>
                            <p>
                                {authUser ? (
                                    <span className="text-success text-sm">
                                        <Dot className="inline size-12" />{" "}
                                        Active
                                    </span>
                                ) : (
                                    <span className="text-gray-500">
                                        Inactive
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
