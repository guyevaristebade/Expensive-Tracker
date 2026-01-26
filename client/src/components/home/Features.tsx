import {
    BarChart2Icon,
    ChartLine,
    DollarSign,
    Folder,
    Target,
    Zap,
    type LucideIcon,
} from 'lucide-react'

type FeatureType = {
    icon: LucideIcon
    title: string
    description: string
}

const FEATURES: FeatureType[] = [
    {
        icon: Folder,
        title: 'Catégoriser vos dépenses',
        description:
            'Créez des rooms pour organiser vos dépenses par thème et garder une vision claire.',
    },
    {
        icon: DollarSign,
        title: 'Enregistrer chaque dépense',
        description:
            'Ajoutez rapidement le montant, la date et une description pour chaque dépense.',
    },
    {
        icon: BarChart2Icon,
        title: 'Graphiques détaillés',
        description:
            'Analysez vos dépenses annuelles grâce à des graphiques clairs et lisibles.',
    },
    {
        icon: Target,
        title: 'Statistiques intelligentes',
        description:
            'Identifiez vos dépenses extrêmes et votre moyenne mensuelle.',
    },
    {
        icon: ChartLine,
        title: 'Analyse par catégorie',
        description:
            'Visualisez la répartition de votre budget par catégorie en pourcentage.',
    },
    {
        icon: Zap,
        title: 'Interface ultra-rapide',
        description:
            'Une interface fluide pensée pour aller droit à l’essentiel.',
    },
]

export const Features = () => {
    return (
        <section id="features" className="py-28 bg-[#F9FAFB]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#1F2937] mb-4">
                        Tout ce dont vous avez besoin
                    </h2>
                    <p className="text-[#6B7280] max-w-xl mx-auto">
                        Des outils puissants pour gérer votre budget simplement
                        et efficacement
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {FEATURES.map((feature) => (
                        <div
                            key={feature.title}
                            className="bg-white p-8 rounded-2xl border border-[#10B981]/10
                            hover:border-emerald-500 hover:-translate-y-2
                                hover:shadow-xl transition-all"
                        >
                            <div
                                className="w-14 h-14 mb-6 rounded-xl flex items-center justify-center
                                bg-linear-to-br from-emerald-500 to-orange-300 text-2xl"
                            >
                                {
                                    <feature.icon
                                        size={32}
                                        className="text-white font-extrabold"
                                    />
                                }
                            </div>

                            <h3 className="text-xl font-bold text-[#1F2937] mb-3">
                                {feature.title}
                            </h3>

                            <p className="text-[#6B7280] leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
