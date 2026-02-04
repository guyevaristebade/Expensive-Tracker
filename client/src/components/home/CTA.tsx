import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button'
import type React from 'react'

export const CTA: React.FC = () => {
    const navigate = useNavigate()

    const handleGoToHome = () => {
        navigate('/auth')
    }
    return (
        <section className="py-24">
            <div
                className="max-w-4xl mx-auto text-center px-8 py-20 rounded-3xl
                    bg-linear-to-br from-[#10B981] to-orange-300"
            >
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
                    Prêt à contrôler votre budget ?
                </h2>

                <p className="text-white/90 mb-10 max-w-xl mx-auto">
                    Rejoignez des centaines d’utilisateurs qui suivent déjà
                    leurs dépenses intelligemment avec Expensive Tracker.
                </p>

                <Button onClick={handleGoToHome} variant="white">
                    Commencer maintenant
                </Button>
            </div>
        </section>
    )
}
