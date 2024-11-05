import { PlaygroundPanel } from "@/app/components/PlaygroundPanel"
import { EquityChart } from "@/app/components/Chart"
import { JoinOurWitList } from "@/app/components/JoinTheWaitList"

export default function Page() {
    return (
        <div className="w-full h-full flex">
            <div className="w-3/4 flex flex-col gap-5">
                <h2>Equity Chart</h2>
                <EquityChart />
                <JoinOurWitList />
            </div>
            <div className="w-1/4">
                <PlaygroundPanel />
            </div>
        </div>
    )
}
