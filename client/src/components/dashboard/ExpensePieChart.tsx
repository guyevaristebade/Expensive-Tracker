import React from 'react'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'

export const ExpensePieChart: React.FC = () => {
    const data = [
        { name: 'Logement', value: 850 },
        { name: 'Nourriture', value: 420 },
        { name: 'Transport', value: 120 },
        { name: 'Loisirs', value: 200 },
        { name: 'Santé', value: 90 },
    ]

    const COLORS = ['#4f46e5', '#22c55e', '#f97316', '#eab308', '#ef4444']

    return (
        <div className="w-full h-[80vh] shadow-xl rounded-xl p-6 flex flex-col gap-4 border border-gray-300">
            <h2 className="font-bold text-md md:text-xl">
                Répartition par catégories
            </h2>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        label
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip formatter={(value) => `${value} €`} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
