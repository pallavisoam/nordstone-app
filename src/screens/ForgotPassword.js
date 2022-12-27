import React, { useState } from 'react'
import { auth } from '../firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
    const [ email, setEmail ] = useState('')
    const navigate = useNavigate()

    const handlePasswordReset = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success('Check your mail or spam folder to reset the password.')
                navigate('/login')
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                // ..
                console.log(errorCode, errorMessage)
            })
    }

    return (
        <div
            style={{
                width: '60%',
                margin: '0rem auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}
        >
            <h1 style={{ textAlign: 'center' }}>Reset your Password</h1>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                    width: '50%',
                    border: '2px solid #acacb6',
                    borderRadius: '20px',
                    padding: '0.6rem 0.6rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    margin: '1rem auto'
                }}
            />
            <button
                onClick={handlePasswordReset}
                style={{
                    margin: '2rem auto',
                    width: '20%',
                    padding: '0.5rem 0.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    border: 'none',
                    outline: 'none',
                    backgroundColor: '#255FD5',
                    color: '#fcfcfc',
                    borderRadius: '0.5rem'
                }}
            >
                Reset Password
            </button>
        </div>
    )
}

export default ForgotPassword
