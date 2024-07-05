import { useState } from "react"
import { supabase } from "../supabaseClient"
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate(); 

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const { user, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })
            if (error) throw error
            console.log('User logged in:', user)
            // Handle successful login (e.g., redirect to dashboard)
            navigate('/meal-log');
        } catch (error) {
            console.error('Error logging in:', error.message)
            // Handle login error (e.g., show error message to user)
        }

    }


    return (
        <>
            <div>
                <form onSubmit={handleLogin}>
                    <input type='email' value={email} onChange={handleEmail} placeholder="Email" required></input>
                    <input type='password' value={password} onChange={handlePassword} placeholder="Password" required></input>
                    <button type='submit'>Login</button>
                </form>
            </div></>
    )
}

export default LoginPage