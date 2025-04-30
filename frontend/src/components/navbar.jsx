import { LogOut, MessageCircleMore, Settings, UserRound } from "lucide-react"
import React from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/use-auth-store"
import { useMessageStore } from "../store/use-message-store"

const Navbar = () => {
    const { authUser, logout } = useAuthStore()
    const { setSelectedUser } = useMessageStore()

    return (
        <header className="bg-base-800/80 border-base-300 w-full fixed top-0 z-40 backdrop-blur-lg border-b ">
            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="flex items-center gap-2.5 hover:opacity-80 transition-all"
                        >
                            <div className=" size-10 rounded-xl p-3 bg-primary/20 max-w-md flex items-center justify-center group-hover:bg-primary/40 transition-colors">
                                <MessageCircleMore className="size-9 text-primary" />
                            </div>
                            <span className="tracking-tight font-medium text-xl">
                                Chat<span className="text-primary">Tap</span>
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            to="/settings"
                            className="btn btn-sm gap-2 transition-colors"
                        >
                            <Settings className="size-4 text-primary" />
                            <span className="hidden md:inline tracking-tight font-medium text-base">
                                Settings
                            </span>
                        </Link>
                        {authUser && (
                            <>
                                <Link
                                    to="/profile"
                                    className="btn btn-sm gap-2 transition-colors"
                                >
                                    <UserRound className="size-4 text-primary" />
                                    <span className="hidden md:inline tracking-tight font-medium text-base">
                                        Profile
                                    </span>
                                </Link>
                                <button
                                    className="flex gap-2 items-center hover:bg-primary/10 rounded-sm py-1 px-2 duration-200 transition-colors"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        logout()
                                        setSelectedUser(null)
                                    }}
                                >
                                    <LogOut className="size-4 text-primary" />
                                    <span className="hidden md:inline tracking-tight font-medium text-base">
                                        Logout
                                    </span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
