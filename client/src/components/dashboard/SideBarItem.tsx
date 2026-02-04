import { type LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import type React from 'react'

type Props = {
    icon: LucideIcon
    label: string
    isOpen: boolean
    path: string
}

export const SidebarItem: React.FC<Props> = ({ icon, label, isOpen, path }) => {
    const Icon = icon

    return (
        <NavLink
            to={path}
            className={({ isActive }) =>
                `
            flex items-center gap-3 p-3 rounded-lg cursor-pointer
            text-base lg:text-lg transition-colors
            ${isActive ? 'bg-emerald-500 text-white' : 'hover:bg-gray-700'}
            `
            }
        >
            <Icon size={20} className="shrink-0" />
            {isOpen && <span className="whitespace-nowrap">{label}</span>}
        </NavLink>
    )
}
