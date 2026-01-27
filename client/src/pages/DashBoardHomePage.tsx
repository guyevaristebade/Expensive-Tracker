import { BarChart, DollarSign, Folder, Lightbulb, LineChart, Trophy } from "lucide-react"
import { CategoriesPanel, ExpenseHighlightCard, ExpensePieChart, LineChartGraph, StatsCard } from "../components"
import type { Category } from "../components/dashboard/CategoriesPanel";

export const DashBoardHomePage = () => {

    const StatsData = [
        {
            description : "Total Dépensé",
            value : "€250",
            icon : DollarSign,
            color : "bg-green-100 text-green-400",
            border : "border border-green-200",
        },
        {
            description : "Catégories",
            value : "3",
            icon : Folder,
            color : "bg-yellow-100 text-yellow-400",
            border : "border border-yellow-200",

        },
        {
            description : "Dépenses",
            value : "5",
            icon : BarChart,
            color : "bg-blue-100 text-blue-400",
            border : "border border-blue-200",

        },
        {
            description : "Moyenne",
            value : "€50",
            icon : LineChart,
            color : "bg-pink-100 text-pink-400",
            border : "border border-pink-200",
        },
    ]

    const categories : Category[]= [
        {
          id: 1,
          name: 'Loisirs',
          color: 'green',
          items: [
            { id: 1, name: 'Cinéma', amount: 15 },
            { id: 2, name: 'Gaming', amount: 60 },
          ],
        },
        {
          id: 2,
          name: 'Alimentation',
          color: 'orange',
          items: [],
        },
        {
          id: 3,
          name: 'Transports',
          color: 'indigo',
          items: [],
        },
      ];
      


    return (
        <div className="min-h-screen w-full flex flex-col gap-10 py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
                {
                    StatsData.map((stat) =>(
                        <StatsCard
                            value={stat.value}
                            icon={stat.icon}
                            description={stat.description}
                            color={stat.color}
                            border={stat.border}
                        />
                    ))
                }
            </div>
            <div className="flex flex-col md:flex-row gap-8">
                <LineChartGraph/>
                <ExpensePieChart/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ExpenseHighlightCard
                    label="Article le Plus Cher"
                    title="Courses"
                    amount={80}
                    icon={Trophy}
                    variant="more"
                />

                <ExpenseHighlightCard
                    label="Article le Moins Cher"
                    title="Cinéma"
                    amount={15}
                    icon={Lightbulb}
                    variant="less"
                />
            </div>
            <CategoriesPanel categories={categories}/>
        </div>
    )
}
