import toast from "react-hot-toast"
import { create } from "zustand"
import { axiosInstance } from "../lib/axios.js"
import { useAuthStore } from "./use-auth-store.js"

export const useMessageStore = create((set, get) => ({
    isLoadingUsers: false,
    isSendingMessage: false,
    users: [],
    messages: [],
    selectedUser: null,
    isMessagesLoading: false,
    getUsers: async () => {
        set({ isLoadingUsers: true })
        try {
            const res = await axiosInstance.get("/messages/users")
            set({
                users: res.data,
            })
        } catch (error) {
            console.log(error)
        } finally {
            set({ isLoadingUsers: false })
        }
    },
    getMessages: async (selectedUser) => {
        set({ isMessagesLoading: true })

        try {
            const res = await axiosInstance.get(
                `/messages/${selectedUser?._id}`
            )
            set({ messages: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isMessagesLoading: false })
        }
    },

    sendMessage: async (message) => {
        const { selectedUser, messages } = get()
        set({ isSendingMessage: true })
        try {
            const res = await axiosInstance.post(
                `/messages/send/${selectedUser._id}`,
                message
            )
            set({ messages: [...messages, res.data] })
            set({ isSendingMessage: false })
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get()
        if (!selectedUser) return
        const socket = useAuthStore.getState().socket

        socket.on("newMessage", (newMessage) => {
            if (newMessage.senderId !== selectedUser._id) return
            set({ messages: [...get().messages, newMessage] })
        })
    },
    unsubscribeToMessages: () => {
        const socket = useAuthStore.getState().socket

        socket.off("newMessage")
    },
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}))
