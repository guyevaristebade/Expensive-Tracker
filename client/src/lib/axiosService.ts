import axios from 'axios'
import { signOut } from '../features/auth'
import { useSession } from '../hooks/useSession'

export const axiosService = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

axiosService.interceptors.request.use(async (config) => {
    const session = useSession()

    const token = session?.access_token

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

axiosService.interceptors.response.use(
    (res) => res,
    async (error) => {
        if (error.response?.status === 401) {
            await signOut()
            window.location.href = '/auth'
        }
        return Promise.reject(error)
    }
)
