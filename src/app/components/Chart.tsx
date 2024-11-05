"use client"

import { useTradesHistory } from "@/app/components/contexts/TradesHistory"
import { useEffect, useState } from "react"
import { Chart } from "chart.js/auto"

export function EquityChart() {
    const { trades } = useTradesHistory()

    useEffect(() => {
        let equity = Number(localStorage.getItem("initialBalance"))

        if (equity === 0) {
            equity = 100000
        }

        let iData = [equity]
        let iLabels = [0]
        console.log(equity)

        for (let i = 0; i < trades.length; i++) {
            iData.push(trades[i].pl + equity)
            iLabels.push(i)
            equity += trades[i].pl
        }

        const ctx = document.getElementById("equityChart") as HTMLCanvasElement

        const chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: iLabels,
                datasets: [
                    {
                        label: "Equity",
                        data: iData,
                        borderColor: "rgb(8,88,227)",
                        borderWidth: 2,
                        pointRadius: 0,
                        fill: false,
                        tension: 0.4,
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                    },
                    y: {
                        grid: {
                            display: false,
                        },
                    },
                },
            },
        })

        chart.render()

        return () => {
            chart.destroy()
        }
    }, [trades])

    return (
        <div className="w-full pr-5">
            <canvas id="equityChart"></canvas>
        </div>
    )
}
