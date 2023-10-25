import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPass, setConfPass] = useState('')
    const [isPasswordsMatch, setIsPasswordsMatch] = useState(true)
    const [isEmailExists, seIsEmailExists] = useState(false)

    const handleRegister = async e => {
        e.preventDefault()

        //check if passwords match
        if (password !== confPass) {

            console.log('passwords do not match')
            setIsPasswordsMatch(false)
            setTimeout(() => {

                setIsPasswordsMatch(true)
            }, 3000)
            return
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                password
            })
        }
        try {

            const res = await fetch('http://localhost:3001/api/taskmanager/register', requestOptions)
            const data = await res.json()
            if (res.status === 201) {

                console.log(data.msg)
            }
            if (res.status === 400) {

                console.log('Email already Exists')
                seIsEmailExists(true)
                setTimeout(() => {

                    seIsEmailExists(false)
                }, 3000)

            }

        } catch (err) {
            console.log(err.message)
        }

    }
    return (
        <div>
            <div>
                <h2>Create an account</h2>
                <h4>Just a great way to track all your Tasks</h4>
                <p>Have an account, Sign in <Link to={'/login'}>here</Link> </p>
            </div>

            {!isPasswordsMatch && <p>Passwords are not match</p>}
            {isEmailExists && <p>Email already Exists</p>}
            <form onSubmit={handleRegister}>
                <div className='form-control'>
                    <input type='text' placeholder='Name' value={name} required onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='form-control'>
                    <input type='email' placeholder='Email' value={email} required onChange={e => setEmail(e.target.value)} />
                </div>
                <div className='form-control'>
                    <input type='password' placeholder='Password' value={password} required onChange={e => setPassword(e.target.value)} />
                </div>
                <div className='form-control'>
                    <input type='password' placeholder='Confirm Password' value={confPass} required onChange={e => setConfPass(e.target.value)} />
                </div>
                < input type='submit' value='Register' />
            </form>
        </div>
    )
}

export default Register;






