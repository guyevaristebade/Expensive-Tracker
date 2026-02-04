import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'

export const LineChartGraph: React.FC = () => {
    const data = [
        { month: 'Janv', Total: 2000 },
        { month: 'Fev', Total: 33028 },
        { month: 'Mars', Total: 300 },
        { month: 'Avril', Total: 9999 },
    ]

    return (
        <div className="w-full h-[80vh] shadow-xl rounded-xl p-6 flex flex-col gap-4 border border-gray-300">
            <h2 className="font-bold text-md md:text-xl">Dépenses Annuelles</h2>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Legend />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="Total"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ fill: '#10B981', r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
