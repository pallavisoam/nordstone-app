import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Calculator = () => {
    const [ firstInput, setFirstInput ] = useState(0)
    const [ secondInput, setSecondInput ] = useState(0)
    const [ optionsState, setOptionsState ] = useState('Select')
    const [ finalCalculatedOutput, setFinalCalculatedOutput ] = useState('')
    const navigate = useNavigate()
    const handleOptionSelect = () => {
        console.log(firstInput, secondInput, optionsState)
        axios({
            method: 'post',
            url: `https://nordstone-api-production-c505.up.railway.app/api/calculator-screen`,
            data: {
                value1: firstInput,
                value2: secondInput,
                operation: optionsState
            }
        })
            .then((res) => {
                if (res.data !== undefined) {
                    setFinalCalculatedOutput(res.data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={{ cursor: 'pointer' }} onClick={() => navigate('/screen-two')}>
                Go Back
            </p>
            <h1 style={{ textAlign: 'center' }}>Calculator</h1>

            <input
                value={firstInput}
                onChange={(e) => setFirstInput(e.target.value)}
                type="number"
                style={{
                    width: '10%',
                    border: '2px solid #acacb6',
                    padding: '0.6rem 0.6rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    margin: '1rem auto'
                }}
            />
            <input
                value={secondInput}
                onChange={(e) => setSecondInput(e.target.value)}
                type="number"
                style={{
                    width: '10%',
                    border: '2px solid #acacb6',
                    padding: '0.6rem 0.6rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    margin: '0rem auto'
                }}
            />
            <select
                value={optionsState}
                onChange={(e) => setOptionsState(e.target.value)}
                style={{
                    width: '10%',
                    margin: '1rem auto',
                    padding: '0.5rem 0.5rem',
                    border: '2px solid #acacb6',
                    color: '#575757'
                }}
            >
                <option value="Select">Select</option>
                <option value="Addition">Addition</option>
                <option value="Subtraction">Subtraction</option>
                <option value="Multiplication">Multiplication</option>
            </select>
            <button
                onClick={handleOptionSelect}
                style={{
                    margin: '1rem auto',
                    width: '10%',
                    padding: '1rem 1rem',
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
                Calculate
            </button>
            <button
                style={{
                    margin: '1rem auto',
                    padding: '1rem 1rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    border: 'none',
                    outline: 'none',
                    backgroundColor: '#fcfcfc',
                    color: '#575757',
                    borderRadius: '0.5rem'
                }}
            >
                Your output is: {finalCalculatedOutput}
            </button>
        </div>
    )
}

export default Calculator
