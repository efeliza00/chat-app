import { MessageCircleMore } from "lucide-react"
import React from "react"
import { Link } from "react-router-dom"
const HeroSection = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center w-full bg-base-300/15">
            <Link
                to="/"
                className="flex items-center flex-col gap-2.5 hover:opacity-80 transition-all"
            >
                <div className=" size-16 rounded-xl p-3 bg-primary/20 max-w-md flex items-center justify-center group-hover:bg-primary/40 transition-colors">
                    <MessageCircleMore className="size-12 text-primary" />
                </div>

                <h2 className="text-2xl font-bold">
                    Welcome to Chat<span className="text-primary">Tap</span>!
                </h2>
                <p className="text-base-content/60">
                    Select a conversation from the sidebar to start chatting
                </p>
            </Link>
        </div>
    )
}

export default HeroSection
