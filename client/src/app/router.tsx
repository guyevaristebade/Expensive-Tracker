import { createBrowserRouter } from 'react-router-dom'
import { AuthPage, HomePage, DashBoardPage, RoomPage } from '../pages'
import { DashBoardLayout, ProtectedRoute, PublicRoute } from '../components'

const router = createBrowserRouter([
    {
        index : true,
        element: <HomePage />,
    },
    {
        element : <PublicRoute/>,
        children : [
            {
                path : "auth",
                element :<AuthPage />
            }
        ]
    },
    {
        element: <ProtectedRoute>
            <DashBoardLayout />,
        </ProtectedRoute>,
        children: [
            {
                path: 'dashboard',
                element: <DashBoardPage />,
                handle : {
                    crumb : () => "Accueil"
                }
            },
            {
                path: 'rooms',
                element: <RoomPage />,
                handle : {
                    crumb : () => "Rooms"
                }
            },
        ],
    }
])

export default router
