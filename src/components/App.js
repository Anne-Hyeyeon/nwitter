// import './App.css';
import React, { useEffect, useState } from "react";
import Router from "components/Router";
import { authService } from 'fbase';

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser)
  useEffect(()=>{
    authService.onAuthStateChanged((user)=> {
    if(user) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
    setInit(true)
  })
},[])
  return (
    <>
   {init ? <Router isLoggedIn={isLoggedIn} /> : "Initializing..."}
    </>
  );
}

export default App;
