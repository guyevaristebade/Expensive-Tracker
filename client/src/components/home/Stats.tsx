import {
    ChartLine,
    Lock,
    Percent,
    InfinityIcon,
    type LucideIcon,
} from 'lucide-react'

type StatType = {
    value: LucideIcon
    label: string
}

const stats: StatType[] = [
    { value: Percent, label: 'Gratuit et simple' },
    { value: InfinityIcon, label: 'Dépenses illimitées' },
    { value: ChartLine, label: 'Statistiques avancées' },
    { value: Lock, label: 'Données sécurisées' },
]

export const Stats = () => (
    <section className="py-20 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-10">
                <div className="text-4xl font-extrabold text-primary">
                    {<s.value size={40} className="text-emerald-500" />}
                </div>
                <p className="text-gray-500">{s.label}</p>
            </div>
        ))}
    </section>
)
