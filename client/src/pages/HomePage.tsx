import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/home/NavBar'
import { Hero } from '../components/home/Hero'
import { Stats } from '../components/home/Stats'
import { Features } from '../components/home/Features'
import { CTA } from '../components/home/CTA'
import { HowItWorks } from '../components/home/HowItWorks'
import { Footer } from '../components/home/Footer'
import { Contact } from '../components/home/Contact'

export const HomePage = () => {
    const navigate = useNavigate()
    const { session } = useAuth()

    const goToDashBoard = () => {
        navigate('/dashboard')
    }

    const goToAuth = () => {
        navigate('/auth')
    }

    useEffect(() => {
        console.log(session)
    }, [session])

    return (
        <>
            <Navbar
                isAuthenticated={session ? true : false}
                handleGoToHome={goToDashBoard}
                handleSignIn={goToAuth}
            />
            <Hero handleBeginning={goToAuth} />
            <Stats />
            <Features />
            <HowItWorks />
            <CTA />
            <Contact />
            <Footer />
        </>
    )
}
