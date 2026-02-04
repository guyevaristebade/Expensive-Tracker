import { ArrowLeft, Home, Wallet } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const UnKnowPage = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 via-white to-emerald-100 px-6">
            <div className="max-w-xl w-full text-center space-y-8">
                {/* Icon */}
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-pulse">
                    <Wallet size={40} />
                </div>

                {/* Title */}
                <h1 className="text-7xl font-extrabold text-emerald-600">
                    404
                </h1>

                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                    Oups… cette page n’existe pas
                </h2>

                <p className="text-gray-600 max-w-md mx-auto">
                    Il semble que la page que vous cherchez ait été déplacée,
                    supprimée ou n’ait jamais existé. Pas d’inquiétude, vos
                    dépenses sont en sécurité 😉
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="
              inline-flex items-center justify-center gap-2
              rounded-lg border-2 border-emerald-500
              px-6 py-3 font-semibold text-emerald-600
              hover:bg-emerald-500 hover:text-white
              transition
            "
                    >
                        <ArrowLeft size={18} />
                        Page précédente
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="
              inline-flex items-center justify-center gap-2
              rounded-lg bg-emerald-500
              px-6 py-3 font-semibold text-white
              hover:bg-emerald-600
              transition
            "
                    >
                        <Home size={18} />
                        Tableau de bord
                    </button>
                </div>

                {/* Footer hint */}
                <p className="pt-6 text-xs text-gray-400">
                    Code erreur : 404 — Page introuvable
                </p>
            </div>
        </div>
    )
}
