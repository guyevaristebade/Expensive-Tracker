import { Outlet } from 'react-router-dom'
import { DashBoardHeader } from '../dashboard/DashBoardHeader'
import { SideBar } from '../dashboard/SideBar'
import { useState } from 'react'

// export const DashBoardLayout = () => {
//     const [isOpen, setIsOpen] = useState<boolean>(false);

//     const toggleMenu = () =>{
//         setIsOpen(!isOpen)
//     }
//     return (
//         <div className="flex h-screen">
//             {/* Sidebar */}
//             <SideBar isOpen={isOpen} toggleMenu={toggleMenu}/>
//             <div className='w-full min-h-screen bg-red-300'>
//                 {/* Header  */}
//                 <DashBoardHeader displayName='Jean'/>
//                 {/* Pages */}
//                 <div className='p-8 overflow-scroll'>
//                     <Outlet/>
//                 </div>
//             </div>
//         </div>
//     )
// }

export const DashBoardLayout = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="flex h-screen overflow-hidden w-screen bg-amber-500">
            {/* SIDEBAR */}
            <SideBar isOpen={isOpen} toggleMenu={toggleMenu} />

            {/* 
          CONTENU PRINCIPAL
          - flex-1 : prend tout l'espace restant
          - min-w-0 : permet au contenu de se rétrécir correctement
          - overflow-hidden : évite les scrollbars indésirables
        */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* HEADER */}
                <DashBoardHeader displayName="Guy" toggleMenu={toggleMenu} />

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
