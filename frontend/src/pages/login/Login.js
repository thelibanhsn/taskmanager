import React, { useState } from 'react';
import { MdOutlineEmail, MdPassword } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';


import './login.css';
function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [wrongCred, setWrongCred] = useState(false)
    const navigate = useNavigate()

    // Handle Login
    const handleLogin = async e => {
        e.preventDefault()

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password
            })
        }
        try {
            const res = await fetch('http://localhost:3001/api/taskmanager/login', requestOptions)
            const data = await res.json()
            if (res.status === 200) {
                alert('succesfully logged in')
                localStorage.setItem('token', JSON.stringify(data.token))
                navigate('/')
            }

        } catch (e) {

            console.log('unauthorised')

            setWrongCred(true);
            setTimeout(() => {
                setWrongCred(false)
            }, 3000)

        }

    }

    return (
        <div className=''>
            <h2 className='title'>Task Manager</h2>
            <div className='container'>
                <h3>Sign in here</h3>

                {wrongCred && <p>Email or Password is wrong</p>}
                <form onSubmit={handleLogin} className='form'>
                    <div className='form-control'>
                        <MdOutlineEmail className='icon' />
                        <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' />
                    </div>
                    <div className='form-control'>
                        <MdPassword className='icon' />
                        <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' />
                    </div>
                    <input type='submit' value='Login' className='signin-btn' />
                </form>
                <p className=''>Don't have an account, create <Link to={'/register'}>here</Link></p>
            </div>
        </div>
    )
}

export default Login