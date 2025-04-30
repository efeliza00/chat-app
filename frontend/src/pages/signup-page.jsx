import { MessageCircleMore } from "lucide-react"
import React, { useState } from "react"
import toast from "react-hot-toast"
import AuthImagePattern from "../components/auth-image-pattern"
import { useAuthStore } from "../store/use-auth-store"

const SignupPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    })
    const { isSigningUp, signup } = useAuthStore()

    const validateForm = () => {
        if (!formData.fullName.trim())
            return toast.error("Full Name is required.")
        if (!formData.email.trim()) return toast.error("Email is required.")
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            return toast.error("Invalid Email.")
        if (!formData.password.trim())
            return toast.error("Password is required.")
        if (formData.password.length < 6)
            return toast.error("Password must be at least 6 characters.")

        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const success = validateForm()

        if (success === true) signup(formData)
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            <div className="flex flex-col justify-center items-center p-6  sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="flex flex-col items-center gap-2 group">
                        <div className="bored border-primary size-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/40 transition-colors">
                            <MessageCircleMore className="size-6 text-primary" />
                        </div>
                        <h1 className="tracking-tight text-2xl font-semibold mt-2">
                            Create an Account
                        </h1>
                        <p className="text-base-content/60">
                            Get Started with your free account.
                        </p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div className="space-y-1">
                        <label className="label">
                            <span className="label-text font-semibold">
                                Full Name
                            </span>
                        </label>
                        <div className="input validator flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-user-round"
                            >
                                <circle cx="12" cy="8" r="5" />
                                <path d="M20 21a8 8 0 0 0-16 0" />
                            </svg>
                            <input
                                type="text"
                                name="fullName"
                                required
                                placeholder="Full Name"
                                autoComplete="off"
                                minLength="3"
                                maxLength="30"
                                value={formData.fullName}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setFormData({
                                        ...formData,
                                        fullName: e.target.value,
                                    })
                                }}
                                className="flex-1 bg-transparent outline-none"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <label className="label">
                            <span className="label-text font-semibold">
                                Email
                            </span>
                        </label>
                        <div className="input validator flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-at-sign"
                            >
                                <circle cx="12" cy="12" r="4" />
                                <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
                            </svg>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Email"
                                autoComplete="off"
                                minLength="3"
                                maxLength="30"
                                value={formData.email}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }}
                                className="flex-1 bg-transparent outline-none"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                        <label className="label">
                            <span className="label-text font-semibold">
                                Password
                            </span>
                        </label>
                        <div className="input validator flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-lock"
                            >
                                <rect
                                    width="18"
                                    height="11"
                                    x="3"
                                    y="11"
                                    rx="2"
                                    ry="2"
                                />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            <input
                                type={isShowPassword ? "text" : "password"}
                                name="password"
                                required
                                placeholder="Password"
                                autoComplete="off"
                                minLength="6"
                                maxLength="30"
                                value={formData.password}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }}
                                className="flex-1 bg-transparent outline-none"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setIsShowPassword((prevState) => !prevState)
                                }
                            >
                                {isShowPassword ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="lucide lucide-eye-icon lucide-eye"
                                    >
                                        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="lucide lucide-eye-closed-icon lucide-eye-closed"
                                    >
                                        <path d="m15 18-.722-3.25" />
                                        <path d="M2 8a10.645 10.645 0 0 0 20 0" />
                                        <path d="m20 15-1.726-2.05" />
                                        <path d="m4 15 1.726-2.05" />
                                        <path d="m9 18 .722-3.25" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-full mt-4"
                        disabled={isSigningUp}
                    >
                        {isSigningUp ? (
                            <>
                                <span className="loading loading-spinner loading-sm"></span>
                            </>
                        ) : (
                            <span>Create Account</span>
                        )}
                    </button>
                </form>
            </div>
            <AuthImagePattern
                title="Join our conversation."
                subtitle="Have fun chatting with people and make new friends."
            />
        </div>
    )
}

export default SignupPage
