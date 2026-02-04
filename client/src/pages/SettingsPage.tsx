import React, { useState } from 'react'
import { User, Lock } from 'lucide-react'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { DashBoardTitle, PasswordInput } from '../components'

type ProfileForm = {
    displayName: string
}

type PasswordForm = {
    newPassword: string
    confirmPassword: string
}

export const SettingsPage = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const [profile, setProfile] = useState<ProfileForm>({
        displayName: '',
    })

    const [passwords, setPasswords] = useState<PasswordForm>({
        newPassword: '',
        confirmPassword: '',
    })

    const [errors, setErrors] = useState<{
        displayName?: string
        newPassword?: string
        confirmPassword?: string
    }>({
        displayName: '',
        newPassword: '',
        confirmPassword: '',
    })

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setProfile((prev) => ({ ...prev, [name]: value }))
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setPasswords((prev) => ({ ...prev, [name]: value }))
    }

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!profile.displayName) {
            setErrors({ displayName: 'Le nom et prénom est requis' })
            return
        }

        console.log('UPDATE PROFILE', profile)
    }

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const { newPassword, confirmPassword } = passwords

        // Validate fields are filled
        if (!newPassword || !confirmPassword) {
            setErrors({
                newPassword: !newPassword
                    ? 'Veuillez entrer un nouveau mot de passe'
                    : '',
                confirmPassword: !confirmPassword
                    ? 'Veuillez confirmer votre nouveau mot de passe'
                    : '',
            })
            return
        }

        // Validate new password match
        if (newPassword !== confirmPassword) {
            setErrors((prev) => ({
                ...prev,
                confirmPassword: 'Les mots de passe ne correspondent pas',
            }))
            return
        }
        // If all validations pass
        console.log('UPDATE PASSWORD', passwords)
    }

    return (
        <div className="min-h-screen  px-4 py-10">
            <div className="mx-auto max-w-3xl space-y-10">
                {/* Header */}
                <DashBoardTitle
                    title="Paramètres du compte"
                    subtitle="Gérez vos informations personnelles et votre sécurité"
                />

                {/* PROFILE */}
                <section className="rounded-xl bg-white p-6 shadow-sm">
                    <div className="mb-6 flex items-center gap-3">
                        <User className="text-emerald-500" />
                        <h2 className="text-xl font-semibold text-gray-900">
                            Informations personnelles
                        </h2>
                    </div>

                    <form onSubmit={handleProfileSubmit} className="gap-4">
                        <Input
                            label="Nom & prénom"
                            name="displayName"
                            placeholder="Guy"
                            error={errors.displayName}
                            value={profile.displayName}
                            onChange={handleProfileChange}
                        />

                        <div className="md:col-span-2 flex justify-end pt-4">
                            <Button type="submit">Sauvegarder</Button>
                        </div>
                    </form>
                </section>

                {/* PASSWORD */}
                <section className="rounded-xl bg-white p-6 shadow-sm">
                    <div className="mb-6 flex items-center gap-3">
                        <Lock className="text-emerald-500" />
                        <h2 className="text-xl font-semibold text-gray-900">
                            Sécurité
                        </h2>
                    </div>

                    <form
                        onSubmit={handlePasswordSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        <PasswordInput
                            label="Nouveau mot de passe"
                            name="newPassword"
                            value={passwords.newPassword}
                            onChange={handlePasswordChange}
                            error={errors.newPassword}
                            showPassword={showPassword}
                            toggleShowPassword={toggleShowPassword}
                        />

                        <PasswordInput
                            label="Confirmer le mot de passe"
                            name="confirmPassword"
                            value={passwords.confirmPassword}
                            onChange={handlePasswordChange}
                            error={errors.confirmPassword}
                            showPassword={showPassword}
                            toggleShowPassword={toggleShowPassword}
                        />

                        <div className="md:col-span-2 flex justify-end pt-4">
                            <Button variant="secondary" type="submit">
                                Modifier le mot de passe
                            </Button>
                        </div>
                    </form>

                    <p className="mt-4 text-xs text-gray-400">
                        💡 Laissez les champs vides si vous ne souhaitez pas
                        changer votre mot de passe.
                    </p>
                </section>
            </div>
        </div>
    )
}
