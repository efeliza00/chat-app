import { Users } from "lucide-react"
import React, { useEffect, useState } from "react"
import { useAuthStore } from "../store/use-auth-store"
import { useMessageStore } from "../store/use-message-store"
import SidebarSkeleton from "./skeletons/sidebar-skeleton"

const Sidebar = () => {
    const { users, isLoadingUsers, getUsers, setSelectedUser, selectedUser } =
        useMessageStore()
    const { onlineUsers } = useAuthStore()
    const [showOnlineOnly, setShowOnlineOnly] = useState(false)
    useEffect(() => {
        getUsers()
    }, [getUsers])

    const filteredUsers = showOnlineOnly
        ? users.filter((user) => onlineUsers.includes(user._id))
        : users
    if (isLoadingUsers) return <SidebarSkeleton />

    return (
        <aside className="h-full w-20  lg:w-80 border-right border-base-300 flex flex-col transition-all duration-300">
            <div className="border-b border-base-300 px-5 py-5">
                <div className="flex gap-2 items-center">
                    <Users className="size-5" />
                    <span className="font-semibold hidden md:block">
                        Contacts
                    </span>
                </div>
                <div className="mt-3 hidden lg:flex items-center gap-2">
                    <label className="cursor-pointer flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={showOnlineOnly}
                            onChange={(e) =>
                                setShowOnlineOnly(e.target.checked)
                            }
                            className="checkbox checkbox-sm"
                        />
                        <span className="text-sm">Show online only</span>
                    </label>
                    <span className="text-xs text-zinc-500">
                        ({onlineUsers.length - 1} online)
                    </span>
                </div>
            </div>
            <div className="overflow-y-auto w-full">
                {filteredUsers.map((user) => {
                    return (
                        <button
                            key={user.fullName}
                            className={`p-5 hover:bg-base-300  transition-colors duration-100 w-full md:flex lg:flex items-center gap-3 ${selectedUser?._id === user._id ? "bg-base-300/40 transition-colors duration-100" : ""}`}
                            onClick={() => setSelectedUser(user)}
                        >
                            <div
                                className={`avatar ${onlineUsers.includes(user._id) ? "avatar-online" : "avatar-offline"}`}
                            >
                                <div className="w-8 rounded-full">
                                    <img
                                        src={
                                            user.profilePic ||
                                            "/images/avatar.jpg"
                                        }
                                    />
                                </div>
                            </div>
                            <h3 className="tracking-tight hidden md:block capitalize font-medium">
                                {user.fullName}
                            </h3>
                        </button>
                    )
                })}
                {filteredUsers.length === 0 && (
                    <div className="text-center py-10 text-base-300 text-xs">
                        No online users.
                    </div>
                )}
            </div>
        </aside>
    )
}

export default Sidebar
