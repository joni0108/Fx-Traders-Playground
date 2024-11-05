"use client"

import { ReactNode } from "react"

interface ButtonProps {
    children: ReactNode
    variant?: "primary" | "destructive"
    onclick?: () => void
}

const colors = {
    primary: "bg-blue-600 hover:bg-blue-700 focus:bg-blue-700",
    destructive: "bg-red-600 hover:bg-red-700 focus:bg-red-700",
}

export function Button({ children, variant, onclick }: ButtonProps) {
    let colorClasses = colors.primary

    if (variant === "destructive") {
        colorClasses = colors.destructive
    }

    return (
        <button
            type="button"
            onClick={onclick}
            className={`${colorClasses} py-2 px-4 inline-flex items-center gap-x-2 text-sm font-black rounded-lg border border-transparent text-white focus:outline-none disabled:opacity-50 disabled:pointer-events-none`}
        >
            {children}
        </button>
    )
}
