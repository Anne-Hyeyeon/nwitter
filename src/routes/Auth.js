import { authService, firebaseInstance } from 'fbase'
import React, { useState } from 'react';

function Auth() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [newAccount, setNewAccount] = useState(true)
    const [error, setError] = useState('')

    const onChange = (event) => {
        const { target:{name, value} } = event
        if (name === 'email'){
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault()
        try{
            let data
            if(newAccount){
                //create Account
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                //log in
                data = await authService.signInWithEmailAndPassword(email, password)
            }
            console.log(data)
        }catch (error) {
            setError(error.message)
        }
     
    }
    const toggleAccount = () => setNewAccount(prev => !prev)
    const onSocialClick = async (event) => {
        const { target: {name} } = event
        let provider
        if (name === 'google'){
            provider = new firebaseInstance.auth.GoogleAuthProvider()
        } else if (name === 'github') {
            provider = new firebaseInstance.auth.GithubAuthProvider()
        } else if (name === 'facebook') {
            provider = new firebaseInstance.auth.FacebookAuthProvider()
        }
        const data = await authService.signInWithPopup(provider)
        console.log(data)
    }
    return (
        <>
        <form onSubmit={onSubmit}>
            <input name='email' type='text' placeholder='Email' required value={email} onChange={onChange} />
            <input name='password' type='text' placeholder='Password' value={password} onChange={onChange} />
            <input type='submit' value={newAccount ? 'Create account' : 'Sign in'} />
        </form>
        {error}
        <div onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</div>
        <button onClick={onSocialClick} name='google'>Continue with Google</button>
        <button onClick={onSocialClick} name='github'>Continue with Github</button>
        <button onClick={onSocialClick} name='facebook'>Continue with Facebook</button>
        </>
    )
}

export default Auth;