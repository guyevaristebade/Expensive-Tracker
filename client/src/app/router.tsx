import { createBrowserRouter } from 'react-router-dom'
import {
    AuthPage,
    HomePage,
    DashBoardHomePage,
    RoomPage,
    UnKnowPage,
} from '../pages'
import { DashBoardLayout } from '../components'

const router = createBrowserRouter([
    {
        index: true,
        element: <HomePage />,
    },
    {
        element: <AuthPage />,
        path: 'auth',
    },
    {
        element: <DashBoardLayout />, // protected route component dans le futur
        children: [
            {
                path: 'dashboard',
                element: <DashBoardHomePage />,
                handle: {
                    crumb: () => 'Accueil',
                },
            },
            {
                path: 'rooms',
                element: <RoomPage />,
                handle: {
                    crumb: () => 'rooms',
                },
            },
        ],
    },
    {
        path: '*',
        element: <UnKnowPage />,
    },
])

export default router
