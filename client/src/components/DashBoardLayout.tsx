import React from 'react'
import { Outlet } from 'react-router-dom'

export const DashBoardLayout = () => {
    return <div className='p-4'>
        <h1 className='text-5xl font-bold text-[#333]'>Dashboard Layout</h1>
        <Outlet/>
    </div>
}
