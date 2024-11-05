export type TradesType = {
    ticker: string
    openDate: Date
    closeDate: Date
    pl: number
    tvLink: string
}

export type TradesHistoryType = TradesType[]

class TradesMath {
    trades: TradesHistoryType

    constructor(trades: TradesHistoryType) {
        this.trades = trades
    }

    getWinrate() {
        const winrate =
            (this.trades.filter((trade) => trade.pl > 0).length /
                this.trades.length) *
            100
        return winrate
    }

    getAvgRRR() {
        let profits: number[] = []
        let losses: number[] = []

        this.trades.forEach((trade) => {
            if (trade.pl > 0) {
                profits.push(trade.pl)
            } else if (trade.pl < 0) {
                losses.push(Math.abs(trade.pl)) // We take the absolute value of the loss
            }
        })

        const averageProfit =
            profits.reduce((acc, val) => acc + val, 0) / profits.length || 0
        const averageLoss =
            losses.reduce((acc, val) => acc + val, 0) / losses.length || 0

        if (averageLoss === 0) {
            return 0
        }

        return averageProfit / averageLoss
    }

    getMaxDrawdown(initialBalance = 0) {
        let maxDrawdown = 0
        let peakBalance = initialBalance
        let currentBalance = initialBalance

        this.trades.forEach((trade) => {
            currentBalance += trade.pl

            if (currentBalance > peakBalance) {
                peakBalance = currentBalance
            }

            const drawdown = (peakBalance - currentBalance) / initialBalance

            if (drawdown > maxDrawdown) {
                maxDrawdown = drawdown
            }
        })

        return (maxDrawdown * 100).toFixed(2) + "%"
    }

    getNetProfits(initialBalance = 0) {
        let totalProfitLoss = 0

        this.trades.forEach((trade) => {
            totalProfitLoss += trade.pl
        })

        const netProfitPercentage = (totalProfitLoss / initialBalance) * 100

        return netProfitPercentage.toFixed(2) + "%"
    }
}

export { TradesMath }
