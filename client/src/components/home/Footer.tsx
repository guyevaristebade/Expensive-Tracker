import { Heart } from 'lucide-react'

export const Footer = () => {
    return (
        <footer className="text-center py-10 flex justify-center gap-1">
            © 2026 Expensive Tracker. Créé avec{' '}
            <span className="animate-pulse space-x-3">
                <Heart className="text-red-600" />
            </span>{' '}
            pour mieux suivre vos dépenses.
        </footer>
    )
}
