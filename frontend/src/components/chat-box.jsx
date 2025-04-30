import { format } from "date-fns"
import { X } from "lucide-react"
import React, { useEffect, useRef } from "react"
import { useAuthStore } from "../store/use-auth-store"
import { useMessageStore } from "../store/use-message-store"
import MessageInput from "./message-input"
import MessagesSkeleton from "./skeletons/messages-skeleton"

const ChatHeader = () => {
    const { setSelectedUser, selectedUser } = useMessageStore()
    const { onlineUsers } = useAuthStore()

    return (
        <div className="flex items-center justify-between border-b p-5 border-base-300">
            <div className="flex items-center gap-3">
                <div
                    className={`avatar ${onlineUsers.find((user) => user === selectedUser._id) ? "avatar-online" : "avatar-offline"}`}
                >
                    <div className="w-9 rounded-full">
                        <img
                            src={
                                selectedUser.profilePic || "/images/avatar.jpg"
                            }
                            alt="User Avatar"
                        />
                    </div>
                </div>
                <div className="-space-y-1">
                    <span className="font-semibold block capitalize">
                        {selectedUser.fullName}
                    </span>
                    <span className="tracking-tight text-sm block">
                        {onlineUsers.find((user) => user === selectedUser._id)
                            ? "Online"
                            : "Offline"}
                    </span>
                </div>
            </div>
            <button
                onClick={() => setSelectedUser(null)}
                className="bg-base-300 hover:bg-base-200 transition-colors duration-100 rounded-full shadow p-1"
            >
                <X className="size-5" />
            </button>
        </div>
    )
}

const ChatBox = () => {
    const {
        selectedUser,
        isMessagesLoading,
        messages,
        getMessages,
        subscribeToMessages,
        unsubscribeToMessages,
    } = useMessageStore()

    const messageEndRef = useRef(null)
    const { authUser } = useAuthStore()

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView()
        }
    }, [messages])

    useEffect(() => {
        getMessages(selectedUser)
        subscribeToMessages()

        return () => unsubscribeToMessages()
    }, [getMessages, selectedUser, subscribeToMessages, unsubscribeToMessages])

    return (
        <div className="w-full ">
            <ChatHeader />
            <div className="h-[calc(100%-6rem)] w-full  overflow-y-auto px-5">
                {!isMessagesLoading ? (
                    <>
                        {messages.map((message) => (
                            <div
                                ref={messageEndRef}
                                className={`chat group ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                                key={message._id}
                            >
                                <div className="chat-header invisible group-hover:visible">
                                    {message.senderId === authUser._id ? (
                                        "You"
                                    ) : (
                                        <span className="capitalize">
                                            {selectedUser.fullName}
                                        </span>
                                    )}
                                </div>
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS chat bubble component"
                                            src={
                                                message.senderId ===
                                                authUser._id
                                                    ? authUser.profilePic ||
                                                      "/images/avatar.jpg"
                                                    : selectedUser.profilePic ||
                                                      "/images/avatar.jpg"
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="chat-bubble p-2">
                                    <span>{message.text}</span>
                                    {message.image && (
                                        <img
                                            src={message.image}
                                            alt="message-image"
                                            className="object-cover rounded-md"
                                        />
                                    )}
                                </div>
                                <time className="chat-footer opacity-50 invisible group-hover:visible">
                                    {format(
                                        new Date(message.createdAt),
                                        "h:mm a"
                                    )}
                                </time>
                            </div>
                        ))}
                    </>
                ) : (
                    <MessagesSkeleton />
                )}
                <MessageInput />
            </div>
        </div>
    )
}

export default ChatBox
