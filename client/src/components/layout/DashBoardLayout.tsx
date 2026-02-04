import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { DashBoardHeader } from '../dashboard/DashBoardHeader'
import { SideBar } from '../dashboard/SideBar'
import { useAuth } from '../../hooks'

export const DashBoardLayout: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { signOut, session } = useAuth()

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const handleLogout = async () => {
        await signOut()
    }

    return (
        <div className="flex h-screen overflow-hidden w-screen bg-amber-500">
            {/* SIDEBAR */}
            <SideBar
                isOpen={isOpen}
                toggleMenu={toggleMenu}
                onLogout={handleLogout}
            />

            {/* 
          CONTENU PRINCIPAL
          - flex-1 : prend tout l'espace restant
          - min-w-0 : permet au contenu de se rétrécir correctement
          - overflow-hidden : évite les scrollbars indésirables
        */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* HEADER */}
                <DashBoardHeader
                    displayName="Guy"
                    toggleMenu={toggleMenu}
                    lastLogin={session?.user.last_sign_in_at ?? ''}
                />

                {/* 
            ZONE DE CONTENU
            - flex-1 : prend toute la hauteur disponible
            - overflow-y-auto : scroll vertical seulement
            - p-4 sm:p-6 lg:p-8 : padding responsive
          */}
                <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
