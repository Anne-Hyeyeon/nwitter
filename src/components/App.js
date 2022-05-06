// import './App.css';
import React, { useState } from "react";
import Router from "components/Router";
import { authService } from 'firebase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser)
  return (
    <>
      <Router isLoggedIn={isLoggedIn} />
    </>
  );
}

export default App;
