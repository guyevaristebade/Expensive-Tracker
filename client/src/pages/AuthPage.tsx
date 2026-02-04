import React, { useEffect, useState } from 'react'
import { Mail, User, ArrowRight, DollarSign } from 'lucide-react'
import { PasswordInput, Input, Deco } from '../components'
import { useNavigate } from 'react-router-dom'
import { useAuth, useToast } from '../hooks'
import type { AuthModeType } from '../types'

export const AuthPage = () => {
    const { signIn, signUp, session } = useAuth()
    const { addToast } = useToast()
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

    const addToastMessage = (
        description: string,
        title: string,
        variant: 'success' | 'error' | 'info' | 'warning'
    ) => {
        addToast({ description, title, variant })
    }

    const handleChangeLoginData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setLoginData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const resetLoginForm = () => {
        setLoginData({ email: '', password: '' })
        setErrors({})
    }

    const validateLogin = (): boolean => {
        const newErrors: typeof errors = {}

        if (!loginData.email) {
            newErrors.email = 'Email requis'
        }
        if (!loginData.password) {
            newErrors.password = 'Mot de passe requis'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        const { email, password } = loginData
        if (!validateLogin()) return

        setLoading(true)

        const { data, error } = await signIn(email, password)

        if (error) {
            setLoading(false)
            addToastMessage(
                error.message || "Une erreur s'est produite",
                'Erreur',
                'error'
            )
            return
        }

        if (data.user) {
            setLoading(false)
            resetLoginForm()
            navigate('/dashboard')
        }
    }

    const validateRegister = (): boolean => {
        const newErrors: typeof errors = {}

        if (!registerData.displayName) {
            newErrors.displayName = 'Nom requis'
        }
        if (!registerData.email) {
            newErrors.email = 'Email requis'
        }
        if (!registerData.password) {
            newErrors.password = 'Mot de passe requis'
        }
        if (!registerData.confirmPassword) {
            newErrors.confirmPassword = 'Confirmation requise'
        }
        if (
            registerData.password &&
            registerData.confirmPassword &&
            registerData.password !== registerData.confirmPassword
        ) {
            newErrors.confirmPassword = 'Les mots de passe ne correspondent pas'
        }
        if (!registerData.agreeTerms) {
            newErrors.agreeTerms = 'Veuillez cocher les conditions'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChangeRegisterData = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target

        setRegisterData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const resetRegisterForm = () => {
        setRegisterData({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreeTerms: false,
        })
        setErrors({})
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateRegister()) return

        setLoading(true)

        const { data, error } = await signUp(
            registerData.email,
            registerData.password,
            registerData.displayName
        )

        if (error) {
            setLoading(false)
            addToastMessage(
                error.message || "Une erreur s'est produite",
                'Erreur',
                'error'
            )
            return
        }

        if (data.user) {
            setSuccessMessage('Inscription réussie! Redirection...')
            await new Promise((resolve) => setTimeout(resolve, 1500))
            setLoading(false)
            setSuccessMessage('')
            resetRegisterForm()
            await new Promise((resolve) => setTimeout(resolve, 500))
            setAuthMode('login')
        }
    }

    useEffect(() => {
        if (session) navigate('/dashboard')
    }, [navigate, session])

    return (
        <div className="min-h-screen bg-linear-to-br flex items-center justify-center p-4 relative overflow-hidden">
            {/* Décos */}
            <Deco />

            <div className="relative z-10 w-full max-w-md">
                <div className="flex flex-col items-center justify-center text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-green-400 to-green-600 rounded-2xl mb-4 mx-auto text-5xl">
                        <DollarSign className="text-white" size={32} />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 text-center">
                        Expensive Tracker
                    </h1>
                    <p className="text-gray-400 mt-2 text-center">
                        Gérez vos dépenses intelligemment
                    </p>
                </div>

                {successMessage && (
                    <div className="mb-6 p-4 bg-green-900 border border-green-500 rounded-lg flex items-center gap-3 animate-pulse">
                        <p className="-green-300 font-medium">
                            {successMessage}
                        </p>
                    </div>
                )}

                <div className=" rounded-2xl shadow-2xl p-8 border border-gray-300">
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
                            <Input
                                label="Email"
                                type="email"
                                name="email"
                                onChange={handleChangeLoginData}
                                value={loginData.email}
                                error={errors.email}
                                IconComponent={Mail}
                                placeholder="vous@exemple.com"
                            />
                            <PasswordInput
                                label="Mot de passe"
                                name="password"
                                value={loginData.password}
                                error={errors.password}
                                onChange={handleChangeLoginData}
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
                            <Input
                                label="Nom complet"
                                onChange={handleChangeRegisterData}
                                name="displayName"
                                error={errors.displayName}
                                IconComponent={User}
                                placeholder="Jean Dupont"
                            />
                            <Input
                                label="Email"
                                onChange={handleChangeRegisterData}
                                name="email"
                                error={errors.email}
                                IconComponent={Mail}
                                placeholder="vous@exemple.com"
                            />
                            <PasswordInput
                                label="Mot de passe"
                                name="password"
                                onChange={handleChangeRegisterData}
                                error={errors.password}
                                showPassword={showPassword}
                                toggleShowPassword={() =>
                                    setShowPassword(!showPassword)
                                }
                                placeholder="Minimum 8 caractères"
                            />
                            <PasswordInput
                                label="Confirmer le mot de passe"
                                name="confirmPassword"
                                onChange={handleChangeRegisterData}
                                error={errors.confirmPassword}
                                showPassword={showConfirmPassword}
                                toggleShowPassword={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                placeholder="Confirmez votre mot de passe"
                            />
                            <div className="flex  items-center gap-3">
                                <input
                                    title="agreeTerms"
                                    type="checkbox"
                                    checked={registerData.agreeTerms}
                                    name="agreeTerms"
                                    onChange={() =>
                                        setRegisterData((prev) => ({
                                            ...prev,
                                            agreeTerms: !prev.agreeTerms,
                                        }))
                                    }
                                    // onChange={handleChangeRegisterData}
                                    className={`mt-1 w-5 h-5 bg-gray-700 border border-gray-600 rounded cursor-pointer accent-green-500 ${errors.agreeTerms ? 'focus:ring-2 focus:ring-red-500' : 'focus:ring-2 focus:ring-green-500'}`}
                                />
                                <label
                                    className={`text-gray-400 text-sm ${errors.agreeTerms ? 'text-red-500' : ''}`}
                                >
                                    {errors.agreeTerms
                                        ? errors.agreeTerms
                                        : "J'accepte les conditions"}
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
