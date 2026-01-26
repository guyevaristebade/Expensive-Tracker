import React from 'react'
import { DollarSign, Home, LogOut, Settings, X, Menu } from 'lucide-react'
import { Button } from '../ui/Button'
import { SidebarItem } from './SideBarItem'

type SideBarProps = {
    isOpen?: boolean
    toggleMenu: () => void
}

export const SideBar: React.FC<SideBarProps> = ({ isOpen, toggleMenu }) => {

    const menuItems  = [
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
            isOpen
        }
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
            {/* LOGO */}
            <div className='border-b border-gray-700 p-4'>
                <div className='flex items-center justify-between gap-3'>
                    {/* Titre - visible sur mobile OU au hover sur desktop */}
                    {isOpen && <h2 className='text-white text-md font-bold whitespace-nowrap lg:text-xl'>
                        Expensive Tracker
                    </h2>}
                    
                    {/* Bouton X visible uniquement sur MOBILE */}
                    <Button
                        variant='outline' 
                        onClick={toggleMenu}
                        className='text-white cursor-pointer shrink-0 p-3'
                    >
                    {isOpen ? <X size={24} /> : <Menu size={24}/>}
                    </Button>
                </div>
            </div>

            {/* MENU PRINCIPAL */}
            <div className='flex-1 p-4 space-y-2 text-white overflow-hidden'>
                {
                    menuItems.map(item => (
                        <SidebarItem
                        key={item.path}
                        label={item.label}
                        icon={item.icon}
                        isOpen={!!isOpen}
                        path={item.path}
                        />
                    ))
                }
            </div>

            {/* FOOTER */}
            <div className='border-t border-gray-800 p-4'>
                <div className='flex items-center gap-3 text-white text-base lg:text-lg cursor-pointer hover:text-red-400 transition-colors group'>
                    <LogOut size={20} className='shrink-0' />
                    {isOpen && <span className='whitespace-nowrap'>
                    Déconnexion
                    </span>}
                </div>
                </div>
            </aside>
            </>
        )
}

// type SideBarProps = {
//     isOpen?: boolean
//     toggleMenu: () => void
// }

// export const SideBar = ({ isOpen, toggleMenu }: SideBarProps) => {
//     return (
//         <>
//             {/* 
//           OVERLAY - Fond noir semi-transparent
//           - Apparaît uniquement sur MOBILE quand la sidebar est ouverte
//           - Permet de fermer la sidebar en cliquant en dehors
//           - lg:hidden = caché sur desktop (≥1024px)
//         */}
//             {isOpen && (
//                 <div
//                     className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//                     onClick={toggleMenu}
//                 />
//             )}

//             {/* 
//           SIDEBAR
//           Position selon la taille d'écran :
//           - MOBILE : fixed (flotte par-dessus le contenu)
//           - DESKTOP : sticky (reste collée au scroll)
//         */}
//             <div
//                 className={`
//             fixed lg:sticky
//             top-0 left-0 h-screen z-50
//             flex flex-col bg-[#121826]
//             transition-transform duration-300 ease-in-out
            
//             ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            
//             lg:translate-x-0 lg:w-20 lg:hover:w-64
            
//             w-64
//             `}
//             >
//                 {/* LOGO */}
//                 <div className="border-b border-gray-700 p-4">
//                     <div className="flex justify-between items-center">
//                         {/* Titre visible seulement quand sidebar ouverte */}
//                         <h2 className="text-white text-lg lg:text-xl font-bold whitespace-nowrap lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
//                             Expensive Tracker
//                         </h2>

//                         {/* Bouton X visible uniquement sur MOBILE */}
//                         <Button
//                             variant="outline"
//                             onClick={toggleMenu}
//                             className="text-white cursor-pointer lg:hidden"
//                         >
//                             <X size={24} />
//                         </Button>
//                     </div>
//                 </div>

//                 {/* MENU PRINCIPAL */}
//                 <div className="flex-1 p-4 space-y-2 text-white overflow-hidden">
//                     <div className="flex items-center gap-3 text-base lg:text-lg rounded-lg p-3 cursor-pointer bg-emerald-500 hover:bg-emerald-600 transition-colors">
//                         <Home size={20} className="shrink-0" />
//                         <span className="whitespace-nowrap lg:opacity-0 lg:group-hover:opacity-100">
//                             Dashboard
//                         </span>
//                     </div>

//                     <div className="flex items-center gap-3 text-base lg:text-lg rounded-lg p-3 cursor-pointer hover:bg-gray-700 transition-colors">
//                         <DollarSign size={20} className="shrink-0" />
//                         <span className="whitespace-nowrap lg:opacity-0 lg:group-hover:opacity-100">
//                             Dépenses
//                         </span>
//                     </div>

//                     <div className="flex items-center gap-3 text-base lg:text-lg rounded-lg p-3 cursor-pointer hover:bg-gray-700 transition-colors">
//                         <Settings size={20} className="shrink-0" />
//                         <span className="whitespace-nowrap lg:opacity-0 lg:group-hover:opacity-100">
//                             Paramètres
//                         </span>
//                     </div>
//                 </div>

//                 {/* FOOTER */}
//                 <div className="border-t border-gray-800 p-4">
//                     <div className="flex items-center gap-3 text-white text-base lg:text-lg cursor-pointer hover:text-red-400 transition-colors">
//                         <LogOut size={20} className="shrink-0" />
//                         <span className="whitespace-nowrap lg:opacity-0 lg:group-hover:opacity-100">
//                             Déconnexion
//                         </span>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }
