import { BarChart, DollarSign, Folder, LineChart } from "lucide-react"
import { StatsCard } from "../components"

export const DashBoardHomePage = () => {

    const StatsData = [
        {
            description : "Total Dépensé",
            value : "€250",
            icon : DollarSign,
            color : "bg-red-100 text-red-400"
        },
        {
            description : "Catégories",
            value : "3",
            icon : Folder,
            color : "bg-yellow-100 text-yellow-400"

        },
        {
            description : "Dépenses",
            value : "5",
            icon : BarChart
        },
        {
            description : "Moyenne",
            value : "€50",
            icon : LineChart
        },
    ]


    return (
        <div className="h-screen w-full">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {
                    StatsData.map((stat) =>(
                        <StatsCard
                            value={stat.value}
                            icon={stat.icon}
                            description={stat.description}
                            color={stat.color}
                        />
                    ))
                }
            </div>
        </div>
    )
}
