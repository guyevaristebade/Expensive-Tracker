import { Button, Form, Input, type FormInstance } from 'antd'
import { ArrowRight, Lock, User, Mail } from 'lucide-react'
import React from 'react'

type RegisterFormProps = {
    handleRegister?: (values: any) => void
    form?: FormInstance
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
    handleRegister,
    form,
}) => {
    return (
        <Form
            initialValues={{ remember: true }}
            form={form}
            onFinish={handleRegister}
            className="space-y-5"
        >
            <Form.Item label="Nom complet" className="relative flex flex-col">
                <Input
                    type="text"
                    className="w-full bg-gray-700 border rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none transition"
                />
                <User
                    size={18}
                    className="absolute left-4 top-3.5 text-gray-500"
                />
            </Form.Item>
            <Form.Item label="Email" className="relative">
                <Input
                    type="email"
                    className="w-full bg-gray-700 border rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none transition"
                />
                <Mail
                    size={18}
                    className="absolute left-4 top-3.5 text-gray-500"
                />
            </Form.Item>
            <Form.Item label="Mot de passe" className="relative">
                <Lock
                    size={18}
                    className="absolute left-4 top-3.5 text-gray-500"
                />
                <Input.Password className="w-full bg-gray-700 border rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none transition" />
            </Form.Item>
            <Form.Item label="Confirmer le mot de passe" className="relative">
                <Lock
                    size={18}
                    className="absolute left-4 top-3.5 text-gray-500"
                />
                <Input.Password className="w-full bg-gray-700 border rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none transition" />
            </Form.Item>
            <Form.Item label={null}>
                <Button
                    htmlType="submit"
                    className="w-full bg-linear-to-r from-green-500 to-green-600 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer hover:bg-linear-to-l hover:from-green-800 hover:to-green-900"
                >
                    {'Créer mon compte'}
                    <ArrowRight size={18} />
                </Button>
            </Form.Item>
            {/* <TextInput
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
                        title='agreeTerms'
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
                </button> */}
        </Form>
    )
}
