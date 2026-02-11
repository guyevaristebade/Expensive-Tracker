import React from 'react'
import { DollarSign, Home, LogOut, Settings, X, Menu } from 'lucide-react'
import { Button } from '../ui/Button'
import { SidebarItem } from './SideBarItem'

type Props = {
    isOpen?: boolean
    toggleMenu: () => void
    onLogout: () => void
}

export const SideBar: React.FC<Props> = ({ isOpen, toggleMenu, onLogout }) => {
    const menuItems = [
        {
            label: 'Dashboard',
            path: '/dashboard',
            icon: Home,
        },
        {
            label: 'Pièces',
            path: '/rooms',
            icon: DollarSign,
        },
        {
            label: 'Paramètres',
            path: '/settings',
            icon: Settings,
            isOpen,
        },
    ]

    return (
        <>
            {/* OVERLAY - Fond noir semi-transparent */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={toggleMenu}
                />
            )}

            <aside
                className={`
                fixed lg:sticky
                top-0 left-0 z-50
                flex flex-col h-screen
                bg-[#121826]
                transition-transform duration-300 ease-in-out

                w-64
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}

                lg:translate-x-0
                ${isOpen ? 'lg:w-64' : 'lg:w-20'}
            `}
            >
                {/* PARTIE HAUTE - LOGO (hauteur fixe, ne scroll pas) */}
                <div className="border-b border-gray-700 p-4 shrink-0">
                    <div className="flex items-center justify-between gap-3">
                        {isOpen && (
                            <h2 className="text-white text-md font-bold whitespace-nowrap lg:text-xl">
                                Expensive Tracker
                            </h2>
                        )}

                        <Button
                            variant="outline"
                            onClick={toggleMenu}
                            className="text-white cursor-pointer shrink-0 p-3"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </Button>
                    </div>
                </div>

                {/* PARTIE MILIEU - MENU (scrollable si nécessaire) */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-4 space-y-2 text-white">
                        {menuItems.map((item) => (
                            <SidebarItem
                                key={item.path}
                                label={item.label}
                                icon={item.icon}
                                isOpen={!!isOpen}
                                path={item.path}
                            />
                        ))}
                    </div>
                </div>

                {/* PARTIE BASSE - FOOTER (hauteur fixe, ne scroll pas) */}
                <div className="border-t border-gray-800 p-4 shrink-0">
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-3 text-white text-base lg:text-lg cursor-pointer hover:text-red-400 transition-colors w-full"
                    >
                        <LogOut size={20} className="shrink-0" />
                        {isOpen && (
                            <span className="whitespace-nowrap">
                                Déconnexion
                            </span>
                        )}
                    </button>
                </div>
            </aside>
        </>
    )
}
