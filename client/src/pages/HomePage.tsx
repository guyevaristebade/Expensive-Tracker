import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'


export const HomePage = () => {
    const { signOut, session } = useAuth()
    const navigate = useNavigate()
    const handleSignOut = async () => {
        await signOut()
        navigate("/auth")
    }

    const goToDashBoard =()=>{
        navigate("/dashboard")
    }

    const goToAuth=()=>{
        navigate("/auth")
    }

    useEffect(() => {
        
        console.log(session)
    }, [session]);


    return (
        <div className="min-h-screen bg-linear-to-br from-zinc-800 to-zinc-900 px-4">
            {
                session ? (
                    <div className='flex justify-between items-center p-4'>
                        <h1 className='text-white text-5xl'>Bonjour <span className='font-bold text-amber-300'>{session?.user.user_metadata.displayName}</span></h1>

                        <div className='flex gap-4'>
                            <button
                                className="bg-red-600 text-white rounded-2xl font-bold p-4 cursor-pointer"
                                onClick={handleSignOut}
                            >
                                Déconnexion
                            </button>

                            <button className='cursor-pointer bg-amber-600 p-4 text-2xl text-white  rounded-2xl' onClick={goToDashBoard}>Go to DashBoard</button>
                        </div>
                    </div>
                ) : (
                    <div className='flex p-4 justify-between items-center'>
                        <h1 className='text-4xl text-white font-bold'>Budget Buddy 💸</h1>

                        <button
                        className="bg-green-600  text-white rounded-2xl font-bold p-4 cursor-pointer"
                        onClick={goToAuth}
                    >
                        Go to Auth
                    </button>
                    </div>
                )

            }
        </div>
    )
}
