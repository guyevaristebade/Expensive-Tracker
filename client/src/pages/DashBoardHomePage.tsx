import { Lightbulb, Trophy } from 'lucide-react'
import {
    CategoriesPanel,
    DashBoardTitle,
    ExpenseHighlightCard,
    ExpensePieChart,
    LineChartGraph,
    StatsCard,
} from '../components'
import { categories, StatsData } from '../utils'

export const DashBoardHomePage = () => {
    return (
        <div className="min-h-screen w-full flex flex-col gap-10 space-y-10 relative">
            <DashBoardTitle
                title="Tableau de Bord"
                subtitle="Aperçu de vos dépenses"
            />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
                {StatsData.map((stat, id) => (
                    <StatsCard
                        key={id}
                        value={stat.value}
                        icon={stat.icon}
                        description={stat.description}
                        color={stat.color}
                        border={stat.border}
                    />
                ))}
            </div>
            <div className="flex flex-col md:flex-row gap-8">
                <LineChartGraph />
                <ExpensePieChart />
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
            <CategoriesPanel categories={categories} />
        </div>
    )
}
