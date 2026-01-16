import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthPage, HomePage } from './pages'
import { DashBoardLayout, ProtectedRoute } from './components'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/auth',
        element: <AuthPage />,
    },
    {
        element: (
            <ProtectedRoute>
                <DashBoardLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: '/dashboard',
            },
            {
                path: '/rooms',
            },
        ],
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
