type StepsType = {
    step: string
    title: string
    description: string
}

const STEPS: StepsType[] = [
    {
        step: '1',
        title: 'Créez vos catégories',
        description:
            'Définissez vos rooms selon vos habitudes : alimentation, loisirs, transport…',
    },
    {
        step: '2',
        title: 'Enregistrez vos dépenses',
        description:
            'Ajoutez chaque dépense en quelques secondes avec les infos essentielles.',
    },
    {
        step: '3',
        title: 'Analysez vos habitudes',
        description:
            'Consultez votre dashboard pour mieux comprendre et ajuster votre budget.',
    },
]

export const HowItWorks = () => {
    return (
        <section
            id="how"
            className="py-28 bg-linear-to-br from-[#10B981]/5 to-[#6366F1]/5"
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#1F2937] mb-4">
                        Comment ça marche
                    </h2>
                    <p className="text-[#6B7280] max-w-xl mx-auto">
                        Trois étapes simples pour reprendre le contrôle de vos
                        finances
                    </p>
                </div>

                <div className="grid gap-12 md:grid-cols-3">
                    {STEPS.map((step) => (
                        <div key={step.step} className="relative">
                            <div
                                className="w-14 h-14 rounded-full flex items-center justify-center
                             bg-emerald-500 text-white  font-extrabold text-xl mb-6"
                            >
                                {step.step}
                            </div>

                            <h3 className="text-xl font-bold text-[#1F2937] mb-3">
                                {step.title}
                            </h3>

                            <p className="text-[#6B7280] leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
