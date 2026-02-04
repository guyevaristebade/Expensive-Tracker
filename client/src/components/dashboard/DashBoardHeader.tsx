import { Avatar } from '../ui/Avatar'
import { Menu } from 'lucide-react'
import { Button } from '../ui/Button'
import type React from 'react'

type DashBoardHeaderProps = {
    displayName: string
    lastLogin: string
    toggleMenu: () => void
}

export const DashBoardHeader: React.FC<DashBoardHeaderProps> = ({
    displayName,
    lastLogin,
    toggleMenu,
}) => {
    return (
        <header className="bg-white shadow-md border-b border-gray-200 p-4 sticky top-0 z-30">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                    <Button
                        variant="outline"
                        onClick={toggleMenu}
                        className="lg:hidden text-gray-700 hover:text-emerald-500 transition-colors"
                    >
                        <Menu size={24} />
                    </Button>

                    <div>
                        <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-gray-900">
                            Bonjour, {displayName} ! 👋
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                            Voici votre résumé financier
                        </p>
                    </div>
                </div>

                {/* AVATAR */}
                <div className="flex items-center gap-4 ">
                    <p className="text-gray-400 text-sm hidden md:block">
                        Dernière connexion :{' '}
                        {new Date(lastLogin).toLocaleDateString('fr-FR', {
                            weekday: 'short',
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                        })}{' '}
                        à{' '}
                        {new Date(lastLogin).toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </p>
                    <Avatar displayName={displayName} size="md" />
                </div>
            </div>
        </header>
    )
}
