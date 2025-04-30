import { Eye, Settings } from "lucide-react"
import React from "react"
import { THEMES } from "../constants/themes"
import { useThemeStore } from "../store/use-theme-store"

const SettingsPage = () => {
    const { setTheme, theme } = useThemeStore()

    return (
        <div className="h-full min-h-screen container max-w-5xl mx-auto py-20 px-4">
            <div className="flex items-center gap-4">
                <Settings className="size-10 text-primary bg-primary/20 p-2 rounded-lg" />
                <h1 className="text-2xl tracking-tight font-semibold">
                    Settings
                </h1>
            </div>

            <div className="divider w-full" />

            {/* Pick a Theme */}
            <div className="space-y-2 w-full">
                <h3 className="tracking-tight font-semibold text-xl">
                    Pick a Theme
                </h3>
                <p className="text-sm tracking-tight">
                    Select the set of colors as your theme
                </p>

                <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-4 w-full mt-6">
                    {THEMES.map((t) => (
                        <button
                            key={t}
                            onClick={() => setTheme(t)}
                            className={`
                group p-4 rounded-lg flex flex-col items-center gap-2 transition-all
                ${theme === t ? "ring-2 ring-primary ring-offset-2" : "hover:bg-base-200/70"}
              `}
                        >
                            <h3 className="tracking-tight text-sm font-semibold capitalize">
                                {t}
                            </h3>
                            <div
                                className="relative h-8 w-16 rounded-md overflow-hidden"
                                data-theme={t}
                            >
                                <div className="absolute inset-0 grid grid-cols-4 gap-1 p-1">
                                    <div className="bg-primary rounded-md" />
                                    <div className="bg-secondary rounded-md" />
                                    <div className="bg-accent rounded-md" />
                                    <div className="bg-neutral rounded-md" />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="divider w-full" />

            <div className="flex items-center gap-4">
                <Eye className="size-10 text-primary bg-primary/20 p-2 rounded-lg" />
                <div>
                    <h3 className="tracking-tight font-semibold text-xl">
                        Preview
                    </h3>
                    <p className="text-sm tracking-tight">
                        Take a sneak peek at the theme on the homepage.
                    </p>
                </div>
            </div>
            <div className="mt-10 mx-auto flex items-center justify-center w-96 h-96 border border-primary rounded-xl">
                <span className="text-lg tracking-tight font-medium">
                    Homepage
                </span>
            </div>
        </div>
    )
}

export default SettingsPage
