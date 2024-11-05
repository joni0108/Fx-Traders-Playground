"use client"

import { Button } from "@/app/components/ui/Button"
import { useState, useEffect } from "react"
import { TradesMath, type TradesType } from "@/app/libs/Math"
import { useTradesHistory } from "./contexts/TradesHistory"

interface Data {
    winrate: string
    avgRRR: string
    maxDrawdown: string
    netProfits: string
}

export function PlaygroundPanel() {
    const [data, setData] = useState<Data>({
        winrate: "No data",
        avgRRR: "No data",
        maxDrawdown: "No data",
        netProfits: "No data",
    })
    const { trades, setTrades } = useTradesHistory()

    useEffect(() => {
        const tradesMath = new TradesMath(trades)
        const initialBalance = Number(
            (document.getElementById("initialBalance") as HTMLInputElement)
                .value
        )

        setData({
            winrate: tradesMath.getWinrate().toFixed(1),
            avgRRR: tradesMath.getAvgRRR().toFixed(1),
            maxDrawdown: tradesMath.getMaxDrawdown(initialBalance),
            netProfits: tradesMath.getNetProfits(initialBalance),
        })
    }, [trades])

    const newTrade = (result: "won" | "lost") => {
        let pl = 0

        if (result === "won") {
            pl = Number(
                (document.getElementById("wonAmount") as HTMLInputElement).value
            )
        } else {
            pl = -Number(
                (document.getElementById("lostAmount") as HTMLInputElement)
                    .value
            )
        }

        //? Preparing data before going to provider
        let data: TradesType = {
            ticker: (document.getElementById("ticker") as HTMLInputElement)
                .value,
            openDate: new Date(
                (document.getElementById("openDate") as HTMLInputElement).value
            ),
            closeDate: new Date(
                (document.getElementById("closeDate") as HTMLInputElement).value
            ),
            pl: pl,
            tvLink: (document.getElementById("tvLink") as HTMLInputElement)
                .value,
        }

        setTrades([...trades, data])
    }

    const storeBalance = () => {
        const initialBalance = Number(
            (document.getElementById("initialBalance") as HTMLInputElement)
                .value
        )

        localStorage.setItem("initialBalance", initialBalance.toString())
    }

    const reset = () => {
        localStorage.removeItem("trades")
        setTrades([])
    }

    return (
        <div className="flex gap-3 flex-col bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
            <h2 className="font-semibold text-xl">New Trade</h2>
            <div className="flex gap-3">
                <div className="space-y-2">
                    <label htmlFor="ticker">Ticker</label>
                    <input
                        type="text"
                        id="ticker"
                        maxLength={6}
                        defaultValue={"EURUSD"}
                        className="border uppercase border-gray-200 rounded-md p-2 w-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="initialBalance">Initial Balance</label>
                    <input
                        onMouseLeave={storeBalance}
                        type="number"
                        id="initialBalance"
                        max={100000000}
                        min={50}
                        defaultValue={100000}
                        className="border uppercase border-gray-200 rounded-md p-2 w-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300"
                    />
                </div>
            </div>
            <div className="flex flex-col">
                <label htmlFor="openDate">Open Date</label>
                <input id="openDate" type="datetime-local" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="closeDate">Close Date</label>
                <input id="closeDate" type="datetime-local" />
            </div>
            <div className="flex gap-3 justify-between">
                <div className="flex flex-col gap-3 w-1/2">
                    <label htmlFor="wonAmount">Profit ($)</label>
                    <input
                        type="number"
                        id="wonAmount"
                        min={0}
                        defaultValue={2400}
                        className="border uppercase border-gray-200 rounded-md p-2 w-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300"
                    />
                    <Button
                        onclick={() => {
                            newTrade("won")
                        }}
                    >
                        + Add Profits
                    </Button>
                </div>
                <div className="flex flex-col gap-3 w-1/2">
                    <label htmlFor="lostAmount">Loss ($)</label>
                    <input
                        type="number"
                        id="lostAmount"
                        min={0}
                        defaultValue={1000}
                        className="border uppercase border-gray-200 rounded-md p-2 w-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300"
                    />
                    <Button
                        onclick={() => {
                            newTrade("lost")
                        }}
                        variant="destructive"
                    >
                        - Add Loss
                    </Button>
                </div>
            </div>
            <div className="space-y-2">
                <label htmlFor="tvLink">TradingView Photo Link</label>
                <input
                    type="text"
                    id="tvLink"
                    maxLength={6}
                    className="border uppercase border-gray-200 rounded-md p-2 w-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300"
                />
            </div>
            <hr className="border-gray-200 dark:border-neutral-700" />
            <div className="flex justify-between font-bold">
                <h3>Winrate</h3>
                <p>{data.winrate}%</p>
            </div>
            <div className="flex justify-between">
                <h3>Avg. RRR</h3>
                <p>{data.avgRRR}R</p>
            </div>
            <div className="flex justify-between">
                <h3>Net Profits (%)</h3>
                <p>{data.netProfits}</p>
            </div>
            <div className="flex justify-between text-red-500">
                <h3>Max Drawdown (%)</h3>
                <p>{data.maxDrawdown}</p>
            </div>
            <div className="flex justify-between">
                <h3>Total Trades</h3>
                <p>{trades.length}</p>
            </div>
            <Button variant="destructive" onclick={reset}>
                Reset
            </Button>
        </div>
    )
}
