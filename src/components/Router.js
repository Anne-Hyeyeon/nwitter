import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from 'routes/Home'
import Auth from 'routes/Auth'
import Navigation from './Navigation'
import Profile from 'routes/Profile'


const Router = ({ isLoggedIn, userObj }) => {
  console.log(isLoggedIn)  
    return (
        <BrowserRouter>
        {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? (
                <>
                <Route path="/" element={<Home userObj={userObj} />} />
                <Route path="/profile" element={<Profile />} />
                </>
                ) : (
                <Route path="/" element={<Auth />} />
                )}
                {/* <Route path="*" element={<Navigate replace to ="/" />} /> */}
                </Routes>
        </BrowserRouter>
    )
}
export default Router