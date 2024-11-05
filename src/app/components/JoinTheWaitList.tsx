"use client"

import { Button } from "@/app/components/ui/Button"

export function JoinOurWitList() {
    return (
        <div className=" flex flex-col items-center justify-center gap-3">
            <h1 className="text-xl font-semibold">Join Our Wait List</h1>
            <p>Join our wait list to get early access to our full app</p>
            <form>
                <Button
                    onclick={() => {
                        window.location.href = "https://discord.gg/tWutdPwTSU"
                    }}
                >
                    Join Our Discord
                </Button>
            </form>
        </div>
    )
}
