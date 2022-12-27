import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

const ScreenThree = () => {
    const [ message, setMessage ] = useState('')
    const navigate = useNavigate()
    const handleMessageSubmit = async () => {
        try {
            const userRef = doc(db, 'users', `${localStorage.getItem('uid')}`)
            setDoc(userRef, { message: message }, { merge: true })

            console.log('Document written with ID: ', userRef.id)
        } catch (e) {
            console.error('Error adding document: ', e)
        }
    }

    const handleMoveToCalculator = () => {
        navigate('/calculator-screen')
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '80%',
                margin: '0rem auto'
            }}
        >
            <p style={{ cursor: 'pointer' }} onClick={() => navigate('/screen-one')}>
                Go Back
            </p>
            <h1 style={{ textAlign: 'center' }}>Send a text to Firestore</h1>
            <input
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                    width: '40%',
                    border: '2px solid #acacb6',
                    borderRadius: '20px',
                    padding: '0.6rem 0.6rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    margin: '0rem auto'
                }}
            />
            <button
                onClick={handleMessageSubmit}
                disabled={!message}
                style={{
                    margin: '1rem auto',
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
                Send Message
            </button>
            <button
                onClick={handleMoveToCalculator}
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
                Move to next screen
            </button>
        </div>
    )
}

export default ScreenThree
