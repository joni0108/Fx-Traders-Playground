"use client"

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react"
import { TradesHistoryType } from "@/app/libs/Math"

type ProviderProps = {
    children: ReactNode
    defaultTrades: TradesHistoryType
}

type ProviderState = {
    trades: TradesHistoryType
    setTrades: (trades: TradesHistoryType | []) => void
}

const ProviderContext = createContext<ProviderState | undefined>(undefined)

function TradesHistoryProvider({ children }: ProviderProps) {
    const [trades, setTrades] = useState<TradesHistoryType>([])

    useEffect(() => {
        //? Fetch trades from the local storage
        if (trades.length === 0) {
            const trades = localStorage.getItem("trades")
            if (trades) {
                setTrades(JSON.parse(trades))
            }
        } else {
            localStorage.setItem("trades", JSON.stringify(trades))
        }
    }, [trades])

    return (
        <ProviderContext.Provider value={{ trades, setTrades }}>
            {children}
        </ProviderContext.Provider>
    )
}

function useTradesHistory() {
    const context = useContext(ProviderContext)

    if (!context) {
        throw new Error(
            "useTradesHistory must be used within a TradesHistoryProvider"
        )
    }

    return context
}

export { TradesHistoryProvider, useTradesHistory }
