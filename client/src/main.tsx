import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/App.tsx'
import { AuthProvider } from '@/app/AuthProvider.tsx'
import { ToastProvider } from '@/app/ToastProvider.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ToastProvider>
                    <App />
                </ToastProvider>
            </AuthProvider>
        </QueryClientProvider>
    </StrictMode>
)
