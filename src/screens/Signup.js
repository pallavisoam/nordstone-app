import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const Signup = () => {
    const navigate = useNavigate()
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    function verifyEmail(email) {
        let ans = false
        if (email.match(/[^\s@]+@[^\s@]+\.[^\s@]+/gi)) {
            ans = true
        } else {
            ans = false
        }
        return ans
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        if (verifyEmail(email)) {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user
                    console.log(user)
                    navigate('/login')
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                    console.log(errorCode, errorMessage)
                    // ..
                })
        }
    }

    return (
        <main>
            <section>
                <div style={{ width: '60%', margin: '0rem auto' }}>
                    <div
                        style={{
                            width: '100%'
                        }}
                    >
                        <h1 style={{ textAlign: 'center' }}>Register Yourself</h1>
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
                                    type="email"
                                    label="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Email address"
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
                                    type="password"
                                    label="Create password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Password"
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
                                type="submit"
                                onClick={onSubmit}
                                disabled={!email && !password}
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
                                Sign up
                            </button>
                        </form>

                        <p style={{ textAlign: 'center', fontSize: '1rem', fontWeight: '500', color: '#575757' }}>
                            Already have an account? <NavLink to="/login">Sign in</NavLink>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Signup
