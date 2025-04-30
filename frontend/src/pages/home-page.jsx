import React from "react"
import ChatBox from "../components/chat-box"
import HeroSection from "../components/hero-section"
import Sidebar from "../components/sidebar"
import { useMessageStore } from "../store/use-message-store"

const HomePage = () => {
    const { selectedUser } = useMessageStore()

    return (
        <div className="min-h-screen h-screen bg-base-200">
            <div className="flex items-center justify-center pt-24 px-4">
                <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
                    <div className="flex h-full rounded-lg overflow-hidden transition-all duration-100">
                        <Sidebar />
                        {!selectedUser ? <HeroSection /> : <ChatBox />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
