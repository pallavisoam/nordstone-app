import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Calculator from './screens/Calculator'
import ForgotPassword from './screens/ForgotPassword'
import Login from './screens/Login'
import ScreenThree from './screens/ScreenThree'
import ScreenTwo from './screens/ScreenTwo'
import Signup from './screens/Signup'

function App() {
    return (
        <div>
            <ToastContainer
                position="top-center"
                progressClassName="toastProgress"
                bodyClassName="toastBody"
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/screen-one" element={<ScreenTwo />} />
                <Route path="/screen-two" element={<ScreenThree />} />
                <Route path="/calculator-screen" element={<Calculator />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
        </div>
    )
}

export default App
