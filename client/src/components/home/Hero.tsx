import {
    TrendingDown,
    DollarSign,
    CreditCard,
    PieChart,
    Wallet,
} from 'lucide-react'
import { Button } from '../ui/Button'

type Props = {
    handleBeginning: () => void
}

export const Hero: React.FC<Props> = ({ handleBeginning }) => (
    <section className="min-h-[90vh] flex items-center bg-lienar-to-br from-emerald-50 to-orange-50 relative overflow-hidden">
        {/* Éléments décoratifs en arrière-plan */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
            {/* Contenu texte */}
            <div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
                    <span>Maîtrisez vos </span>
                    <span className="text-emerald-500">dépenses</span>{' '}
                    <span>simplement</span>
                </h1>
                <p className="text-gray-600 mb-8 text-lg">
                    <span className="text-emerald-500 font-bold">
                        Expensive Tracker
                    </span>{' '}
                    vous aide à suivre vos dépenses et prendre des décisions
                    éclairées grâce à des statistiques détaillées.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button onClick={handleBeginning}>
                        Commencer gratuitement
                    </Button>
                    <Button variant="secondary">Voir la démo</Button>
                </div>
            </div>

            {/* Illustration flottante - Dashboard mockup */}
            <div className="hidden md:block relative">
                {/* Card principale - Dashboard */}
                <div className="relative bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                    {/* Header du dashboard */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                                <Wallet className="text-white" size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Total dépensé
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    2 450,00 €
                                </p>
                            </div>
                        </div>
                        {/* <div className="flex items-center gap-2 text-emerald-500">
              <TrendingUp size={20} />
              <span className="font-semibold">+12%</span>
            </div> */}
                    </div>

                    {/* Graph simulé */}
                    <div className="mb-6">
                        <div className="flex items-end justify-between h-32 gap-2">
                            <div className="w-full bg-emerald-200 rounded-t h-[45%]"></div>
                            <div className="w-full bg-emerald-300 rounded-t h-[65%]"></div>
                            <div className="w-full bg-emerald-400 rounded-t h-[85%]"></div>
                            <div className="w-full bg-emerald-500 rounded-t h-full"></div>
                            <div className="w-full bg-emerald-400 rounded-t h-[75%]"></div>
                            <div className="w-full bg-emerald-300 rounded-t h-[55%]"></div>
                        </div>
                    </div>

                    {/* Transactions récentes */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                    <TrendingDown
                                        className="text-red-500"
                                        size={16}
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">
                                        Courses
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Aujourd'hui
                                    </p>
                                </div>
                            </div>
                            <span className="font-semibold text-red-500">
                                -45,80 €
                            </span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                    <CreditCard
                                        className="text-orange-500"
                                        size={16}
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">
                                        Restaurant
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Hier
                                    </p>
                                </div>
                            </div>
                            <span className="font-semibold text-red-500">
                                -32,00 €
                            </span>
                        </div>
                    </div>
                </div>

                {/* Card flottante 1 - Moyenne */}
                <div className="absolute -top-8 -right-8 bg-white rounded-xl shadow-xl p-4 border border-gray-100 animate-float">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                            <PieChart className="text-orange-500" size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Moyenne</p>
                            <p className="font-bold text-gray-900">$50.00</p>
                        </div>
                    </div>
                </div>

                {/* Card flottante 2 - Économies */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-gray-100 animate-float-delay">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <DollarSign
                                className="text-emerald-500"
                                size={20}
                            />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">
                                Total des dépenses
                            </p>
                            <p className="font-bold text-emerald-500">5</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
)
