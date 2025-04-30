import React from "react"

const AuthImagePattern = ({ title, subtitle }) => {
    return (
        <div className="hidden lg:flex flex-col bg-base-200 justify-center items-center p-6  sm:p-12">
            <div className="max-w-md text-center">
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {[...Array(9)].map((_, i) => (
                        <div
                            key={i}
                            className="rounded-xl h-20 bg-primary/2 hover:bg-primary/5 duration-300 transition-colors"
                        />
                    ))}
                </div>
                <h1 className="font-semibold tracking-tight text-xl ">
                    {title}
                </h1>
                <p className="tracking-tight">{subtitle}</p>
            </div>
        </div>
    )
}

export default AuthImagePattern
