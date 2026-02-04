import { createBrowserRouter } from 'react-router-dom'
import {
    AuthPage,
    HomePage,
    DashBoardHomePage,
    RoomPage,
    UnKnowPage,
    RoomDetailsPage,
    SettingsPage,
} from '../pages'
import { DashBoardLayout, ProtectedRoute } from '../components'

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
        element: (
            <ProtectedRoute>
                <DashBoardLayout />
            </ProtectedRoute>
        ),
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
            {
                path: 'rooms/:roomId',
                element: <RoomDetailsPage />,
                handle: {
                    crumb: () => 'rooms/:roomId',
                },
            },
            {
                path: 'settings',
                element: <SettingsPage />,
                handle: {
                    crumb: () => 'settings',
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
