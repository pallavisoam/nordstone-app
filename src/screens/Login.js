import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
    const navigate = useNavigate()
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const onLogin = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user
                toast.success('Successfully Logged in.')
                navigate('/screen-one')
                localStorage.setItem('uid', user.uid)
                localStorage.setItem('email', email)
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorCode, errorMessage)
            })
    }

    return (
        <React.Fragment>
            <main>
                <section>
                    <div style={{ width: '60%', margin: '0rem auto' }}>
                        <div
                            style={{
                                width: '100%'
                            }}
                        >
                            <h1 style={{ textAlign: 'center' }}>Login Yourself</h1>

                            <form
                                style={{
                                    width: '60%',
                                    margin: '2rem auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '100%',
                                        margin: '2rem auto 0rem auto'
                                    }}
                                >
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="Email address"
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{
                                            width: '80%',
                                            border: '2px solid #acacb6',
                                            borderRadius: '20px',
                                            padding: '0.6rem 0.6rem',
                                            fontSize: '1rem',
                                            fontWeight: '500',
                                            margin: '0rem auto'
                                        }}
                                    />
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        margin: '2rem 0rem',
                                        width: '100%'
                                    }}
                                >
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{
                                            width: '80%',
                                            border: '2px solid #acacb6',
                                            borderRadius: '20px',
                                            padding: '0.6rem 0.6rem',
                                            fontSize: '1rem',
                                            fontWeight: '500',
                                            margin: '0rem auto'
                                        }}
                                    />
                                </div>

                                <button
                                    onClick={onLogin}
                                    style={{
                                        margin: '0rem auto',
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
                                    Login
                                </button>
                            </form>

                            <p style={{ textAlign: 'center', fontSize: '1rem', fontWeight: '500', color: '#575757' }}>
                                No account yet? <NavLink to="/">Sign up</NavLink>
                            </p>
                            <p
                                style={{ textAlign: 'center', fontSize: '1rem', fontWeight: '500', color: '#575757' }}
                                onClick={() => navigate('/forgot-password')}
                            >
                                Forgot Password ?
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </React.Fragment>
    )
}

export default Login
