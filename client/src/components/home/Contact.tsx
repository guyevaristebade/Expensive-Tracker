import { useState } from 'react'
import { Mail, Send, CheckCircle, MapPin, Phone } from 'lucide-react'

export const Contact = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Simuler l'envoi
        setTimeout(() => {
            setIsSubmitted(true)
            setFormData({ name: '', email: '', subject: '', message: '' })

            // Réinitialiser après 5 secondes
            setTimeout(() => setIsSubmitted(false), 5000)
        }, 500)
    }

    return (
        <section
            id="contact"
            className="py-12 sm:py-16 md:py-20 bg-linear-to-b from-white to-emerald-50 relative overflow-hidden"
        >
            {/* Éléments décoratifs */}
            <div className="absolute top-20 right-10 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 left-10 w-40 h-40 bg-orange-200/20 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* En-tête */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 md:mb-4">
                        Contactez-<span className="text-emerald-500">nous</span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                        Une question ? Une suggestion ? Notre équipe est là pour
                        vous aider. Envoyez-nous un message et nous vous
                        répondrons dans les plus brefs délais.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
                    {/* Informations de contact */}
                    <div className="space-y-6 md:space-y-8">
                        <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                                Restons en contact
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 mb-6 md:mb-8">
                                Nous sommes toujours ravis d'échanger avec nos
                                utilisateurs. N'hésitez pas à nous contacter par
                                l'un des moyens ci-dessous.
                            </p>
                        </div>

                        {/* Cartes d'information */}
                        <div className="space-y-3 md:space-y-4">
                            <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                                    <Mail
                                        className="text-emerald-500"
                                        size={20}
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                                        Email
                                    </h4>
                                    <a
                                        href="mailto:contact@expensivetracker.com"
                                        className="text-emerald-500 hover:text-emerald-600 transition text-sm sm:text-base break-all"
                                    >
                                        contact@example_expensivetracker.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                                    <Phone
                                        className="text-orange-500"
                                        size={20}
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                                        Téléphone
                                    </h4>
                                    <a
                                        href="tel:+33123456789"
                                        className="text-gray-600 hover:text-emerald-500 transition text-sm sm:text-base"
                                    >
                                        +33 X XX XX XX XX
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                                    <MapPin
                                        className="text-emerald-500"
                                        size={20}
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                                        Adresse
                                    </h4>
                                    <p className="text-gray-600 text-sm sm:text-base">
                                        123 Avenue des Dépensiers
                                        <br />
                                        75001 Paris, France
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Formulaire de contact */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                        {isSubmitted ? (
                            <div className="text-center py-8 sm:py-12">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                    <CheckCircle
                                        className="text-green-500"
                                        size={32}
                                    />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                                    Message envoyé !
                                </h3>
                                <p className="text-sm sm:text-base text-gray-600">
                                    Merci pour votre message. Nous vous
                                    répondrons dans les plus brefs délais.
                                </p>
                            </div>
                        ) : (
                            <form
                                className="space-y-4 sm:space-y-6"
                                onSubmit={handleSubmit}
                            >
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        Nom complet
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition outline-none"
                                        placeholder="Jean Dupont"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition outline-none"
                                        placeholder="jean.dupont@example.com"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        Sujet
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition outline-none"
                                        placeholder="Question sur l'application"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition outline-none resize-none"
                                        placeholder="Votre message..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-emerald-500 text-white font-semibold py-3 sm:py-4 rounded-lg hover:bg-emerald-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
                                >
                                    <Send size={18} />
                                    Envoyer le message
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
