import { useState } from 'react'
import { Button } from '../ui/Button'
import { Menu, X } from 'lucide-react'

type Props = {
    isAuthenticated: boolean
    handleTry?: () => void
    handleSignIn?: () => void
    handleGoToHome?: () => void
}
export const Navbar = ({
    isAuthenticated,
    handleSignIn,
    handleTry,
    handleGoToHome,
}: Props) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => setIsOpen(!isOpen)

    const closeMenu = () => setIsOpen(false)

    return (
        <>
            <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-emerald-500/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    {/* LOGO */}
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-500">
                        <a href="/">€xp€nsiv€ Track€r</a>
                    </div>

                    {/* Desktop menu */}
                    <ul className="hidden md:flex gap-8 text-gray-500 font-bold">
                        <li>
                            <a
                                href="#features"
                                className="hover:text-emerald-500 transition"
                            >
                                Fonctionnalités
                            </a>
                        </li>
                        <li>
                            <a
                                href="#how"
                                className="hover:text-emerald-500 transition"
                            >
                                Comment ça marche
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                className="hover:text-emerald-500 transition"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex gap-4">
                        {isAuthenticated ? (
                            <Button onClick={handleGoToHome}>Go to Home</Button>
                        ) : (
                            <>
                                <Button
                                    onClick={handleSignIn}
                                    variant="secondary"
                                >
                                    Connexion
                                </Button>
                                <Button onClick={handleTry}>Essayer</Button>
                            </>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-gray-700 hover:text-emerald-500 transition z-50 relative"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile menu overlay */}
            <div
                className={`
                fixed inset-0 bg-white z-40 
                md:hidden
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
            >
                <div className="flex flex-col justify-center items-center h-full gap-8 px-6">
                    <ul className="flex flex-col gap-6 text-xl font-medium text-gray-700 text-center">
                        <li>
                            <a
                                href="#features"
                                onClick={closeMenu}
                                className="hover:text-emerald-500 transition block py-2"
                            >
                                Fonctionnalités
                            </a>
                        </li>
                        <li>
                            <a
                                href="#how"
                                onClick={closeMenu}
                                className="hover:text-emerald-500 transition block py-2"
                            >
                                Comment ça marche
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                onClick={closeMenu}
                                className="hover:text-emerald-500 transition block py-2"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>

                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        {isAuthenticated ? (
                            <Button
                                onClick={() => {
                                    handleGoToHome?.()
                                    closeMenu()
                                }}
                            >
                                Go to Home
                            </Button>
                        ) : (
                            <>
                                <Button
                                    onClick={() => {
                                        handleSignIn?.()
                                        closeMenu()
                                    }}
                                    variant="secondary"
                                >
                                    Connexion
                                </Button>
                                <Button
                                    onClick={() => {
                                        handleTry?.()
                                        closeMenu()
                                    }}
                                >
                                    Essayer
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Overlay background pour fermer le menu en cliquant à l'extérieur */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-30 md:hidden"
                    onClick={closeMenu}
                />
            )}
        </>
    )
}
