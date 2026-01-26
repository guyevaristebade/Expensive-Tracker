import React, { useEffect, useState } from 'react'
import { Mail, User, ArrowRight } from 'lucide-react'
import { PasswordInput, TextInput } from '../components'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks'
import { message } from 'antd'

type AuthModeType = 'login' | 'register'

export const AuthPage = () => {
    const { signIn, signUp, session } = useAuth()
    const navigate = useNavigate()
    const [authMode, setAuthMode] = useState<AuthModeType>('login')

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')

    const [loginData, setLoginData] = useState({ email: '', password: '' })
    const [registerData, setRegisterData] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
    })
    const [errors, setErrors] = useState<{
        email?: string
        password?: string
        displayName?: string
        agreeTerms?: string
        confirmPassword?: string
    }>({
        email: '',
        password: '',
        displayName: '',
        agreeTerms: '',
        confirmPassword: '',
    })

    // Validation simplifiée
    // const validateEmail = (email: string) =>
    //     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        const { email, password } = loginData

        const newErrors = {} as {
            email: string
            password: string
        }

        if (!loginData.email) newErrors.email = 'Email requis'
        if (!loginData.password) newErrors.password = 'Mot de passe requis'

        if (Object.keys(newErrors).length === 0) {
            const { data, error } = await signIn(email, password)

            if (data.session) {
                setLoginData({ email: '', password: '' })
                navigate('/')
            }

            if (error) {
                if (error.message === 'Invalid login credentials')
                    message.error('Email/password incorrect')
                else message.error(error.message)

                return
            }
        } else setErrors(newErrors)
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        const newErrors = {} as {
            displayName: string
            email: string
            password: string
            confirmPassword: string
            agreeTerms: string
        }

        const { email, displayName, password } = registerData

        if (!registerData.displayName)
            newErrors.displayName = 'Nom complet requis'
        if (!registerData.email) newErrors.email = 'Email requis'
        if (!registerData.password) newErrors.password = 'Mot de passe requis'
        if (!registerData.confirmPassword)
            newErrors.confirmPassword = 'Confirmation requise'
        if (!registerData.agreeTerms)
            newErrors.agreeTerms = 'Vous devez accepter les conditions'

        if (Object.keys(newErrors).length === 0) {
            const { data, error } = await signUp(email, password, displayName)

            if (data.user) {
                setLoading(true)
                setTimeout(() => {
                    setLoading(false)
                    setSuccessMessage('Inscription réussie! Redirection...')
                    setTimeout(() => {
                        setSuccessMessage('')
                        setRegisterData({
                            displayName: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            agreeTerms: false,
                        })
                        setAuthMode('login')
                    }, 2000)
                }, 1500)
                console.log(data)
                // message.success('inscription réussi')
            }

            if (error) {
                message.error(error.message)
                return
            }
        } else setErrors(newErrors)
    }

    useEffect(() => {
        if (session) navigate('/dashboard')
    }, [navigate, session])

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 via-green-900 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Décos */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-10"></div>

            <div className="relative z-10 w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-green-400 to-green-600 rounded-2xl mb-4 mx-auto text-5xl">
                        💰
                    </div>
                    <h1 className="text-4xl font-bold text-white">
                        Budget Buddy
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Gérez vos dépenses intelligemment
                    </p>
                </div>

                {successMessage && (
                    <div className="mb-6 p-4 bg-green-900 border border-green-500 rounded-lg flex items-center gap-3 animate-pulse">
                        <p className="text-green-300 font-medium">
                            {successMessage}
                        </p>
                    </div>
                )}

                <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
                    {/* TABS */}
                    <div className="flex gap-2 mb-8">
                        <button
                            onClick={() => {
                                setAuthMode('login')
                                setErrors({})
                            }}
                            className={`cursor-pointer flex-1 py-3 px-4 rounded-lg font-semibold transition ${authMode === 'login' ? 'bg-linear-to-r from-green-500 to-green-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600 cursor-pointer'}`}
                        >
                            Connexion
                        </button>
                        <button
                            onClick={() => {
                                setAuthMode('register')
                                setErrors({})
                            }}
                            className={` cursor-pointer flex-1 py-3 px-4 rounded-lg font-semibold transition ${authMode === 'register' ? 'bg-linear-to-r from-green-500 to-green-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600 cursor-pointer'}`}
                        >
                            Inscription
                        </button>
                    </div>

                    {authMode === 'login' && (
                        <form className="space-y-5" onSubmit={handleLogin}>
                            <TextInput
                                label="Email"
                                value={loginData.email}
                                onChange={(v) =>
                                    setLoginData({ ...loginData, email: v })
                                }
                                error={errors.email}
                                IconComponent={Mail}
                                placeholder="vous@exemple.com"
                            />
                            <PasswordInput
                                label="Mot de passe"
                                value={loginData.password}
                                onChange={(v) =>
                                    setLoginData({ ...loginData, password: v })
                                }
                                error={errors.password}
                                showPassword={showPassword}
                                toggleShowPassword={() =>
                                    setShowPassword(!showPassword)
                                }
                                placeholder="Votre mot de passe"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-linear-to-r from-green-500 to-green-600 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer hover:bg-linear-to-l hover:from-green-800 hover:to-green-900"
                            >
                                {loading
                                    ? 'Connexion en cours...'
                                    : 'Se connecter'}{' '}
                                <ArrowRight size={18} />
                            </button>
                        </form>
                    )}

                    {authMode === 'register' && (
                        <form className="space-y-5" onSubmit={handleRegister}>
                            <TextInput
                                label="Nom complet"
                                value={registerData.displayName}
                                onChange={(v) =>
                                    setRegisterData({
                                        ...registerData,
                                        displayName: v,
                                    })
                                }
                                error={errors.displayName}
                                IconComponent={User}
                                placeholder="Jean Dupont"
                            />
                            <TextInput
                                label="Email"
                                value={registerData.email}
                                onChange={(v) =>
                                    setRegisterData({
                                        ...registerData,
                                        email: v,
                                    })
                                }
                                error={errors.email}
                                IconComponent={Mail}
                                placeholder="vous@exemple.com"
                            />
                            <PasswordInput
                                label="Mot de passe"
                                value={registerData.password}
                                onChange={(v) =>
                                    setRegisterData({
                                        ...registerData,
                                        password: v,
                                    })
                                }
                                error={errors.password}
                                showPassword={showPassword}
                                toggleShowPassword={() =>
                                    setShowPassword(!showPassword)
                                }
                                placeholder="Minimum 8 caractères"
                            />
                            <PasswordInput
                                label="Confirmer le mot de passe"
                                value={registerData.confirmPassword}
                                onChange={(v) =>
                                    setRegisterData({
                                        ...registerData,
                                        confirmPassword: v,
                                    })
                                }
                                error={errors.confirmPassword}
                                showPassword={showConfirmPassword}
                                toggleShowPassword={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                placeholder="Confirmez votre mot de passe"
                            />
                            <div className="flex items-start gap-3">
                                <input
                                    title="agreeTerms"
                                    type="checkbox"
                                    checked={registerData.agreeTerms}
                                    onChange={(e) =>
                                        setRegisterData({
                                            ...registerData,
                                            agreeTerms: e.target.checked,
                                        })
                                    }
                                    className="mt-1 w-5 h-5 bg-gray-700 border border-gray-600 rounded cursor-pointer accent-green-500"
                                />
                                <label className="text-gray-400 text-sm">
                                    J'accepte les conditions
                                </label>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-linear-to-r from-green-500 to-green-600 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer hover:bg-linear-to-l hover:from-green-800 hover:to-green-900"
                            >
                                {loading
                                    ? 'Inscription en cours...'
                                    : 'Créer mon compte'}{' '}
                                <ArrowRight size={18} />
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
