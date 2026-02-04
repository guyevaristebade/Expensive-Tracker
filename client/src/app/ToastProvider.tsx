import { useRef, useState } from 'react'
import { ToastContext, type ToastType } from './ToastContext'
import { CheckCircle, Info, TriangleAlert, X, XCircle } from 'lucide-react'

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<ToastType[]>([])
    const timersRef = useRef<{ [key: string]: number }>({})

    const getVariantStyles = (variant: string) => {
        switch (variant) {
            case 'success':
                return {
                    bg: 'bg-emerald-50 border-emerald-200',
                    icon: 'text-emerald-600',
                    title: 'text-emerald-900 font-bold text-lg',
                    desc: 'text-emerald-700',
                    Icon: CheckCircle,
                }
            case 'error':
                return {
                    bg: 'bg-red-50 border-red-200',
                    icon: 'text-red-600',
                    title: 'text-red-900 font-bold text-lg',
                    desc: 'text-red-700',
                    Icon: XCircle,
                }
            case 'warning':
                return {
                    bg: 'bg-amber-50 border-amber-200',
                    icon: 'text-amber-600',
                    title: 'text-amber-900 font-bold text-lg',
                    desc: 'text-amber-700',
                    Icon: TriangleAlert,
                }
            default:
                return {
                    bg: 'bg-blue-50 border-blue-200',
                    icon: 'text-blue-600',
                    title: 'text-blue-900 font-bold text-lg',
                    desc: 'text-blue-700',
                    Icon: Info,
                }
        }
    }

    const removeToast = (id: string) => {
        if (timersRef.current[id]) {
            clearTimeout(timersRef.current[id])
            delete timersRef.current[id] // on supprime la reférence à la  fin
        }

        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }

    const addToast = ({
        id = Date.now().toString(),
        description,
        title,
        variant,
    }: ToastType) => {
        // pop le toast lorsque l'utilisateur ne clique pas sur le bouton fermé

        setToasts((prev) => [...prev, { id, description, title, variant }])

        const timerId = setTimeout(() => {
            removeToast(id) // remove le toast
        }, 5000)

        timersRef.current[id] = timerId
    }

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed top-4 right-4 space-y-3 max-w-sm w-full z-50">
                {toasts.map((toast) => {
                    const styles = getVariantStyles(toast.variant as string)
                    const IconComponent = styles.Icon

                    return (
                        <div
                            key={toast.id}
                            className={`${styles.bg} border-l-4 ${styles.bg} rounded-lg shadow-lg p-4 flex items-start gap-3 animate-in slide-in-from-right duration-300`}
                        >
                            <IconComponent
                                className={`${styles.icon} w-6 h-6 shrink-0 mt-0.5`}
                            />

                            <div className="flex-1 min-w-0">
                                <h3
                                    className={`${styles.title} font-semibold text-sm mb-1`}
                                >
                                    {toast.title}
                                </h3>
                                <p className={`${styles.desc} text-sm`}>
                                    {toast.description}
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    toast.id && removeToast(toast.id)
                                }
                                className={`${styles.icon} hover:opacity-70 transition-opacity shrink-0 cursor-pointer `}
                                aria-label="Fermer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            {/* <div className="absolute left-0 -bottom-px h-2 w-full bg-green-500 rounded-full"></div> */}
                        </div>
                    )
                })}
            </div>
        </ToastContext.Provider>
    )
}
