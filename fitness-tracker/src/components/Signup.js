import { useState } from "react"
import { supabase } from "../supabaseClient"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


const SignUpPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            const { user, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            })
            if (error) throw error
            console.log('User signed up:', user)
            // Handle successful login (e.g., redirect to dashboard)
            navigate('/meal-log');
        } catch (error) {
            console.error('Error signing up:', error.message)
            // Handle login error (e.g., show error message to user)
        }

    }


    return (
        <>
            <div className='relative h-screen bg-[#272838]'>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 bg-white rounded-md shadow-lg w-1/4 '>
                    <div className="text-center text-3xl  p-3 text-[#272838] rounded font-sans">SIGN UP</div>
                    <div className='text-center flex flex-col items-center'>
                        <form onSubmit={handleSignUp} className='flex flex-col space-y-4 w-full max-w-xs'>
                            <label className='sr-only' htmlFor="email">Email</label>
                            <input type='email' id="email" value={email} onChange={handleEmail} placeholder="Email" required className='p-3 border rounded'></input>
                            <label className='sr-only' htmlFor="password">Password</label>
                            <input type='password' id="password" value={password} onChange={handlePassword} placeholder="Password" required className='p-3 border rounded'></input>
                            <button type='submit' className='px-4 py-2 bg-[#881700]  text-white rounded hover:bg-[#642113]'>Sign Up</button>
                        </form>
                    </div>
                </div>
            </div></>
    )
}

export default SignUpPage