import React, { useState } from 'react';

function Auth() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const onChange = (event) => {
        const {target:{name, value}} = event
        if (name === 'email'){
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        }
    }
    const onSubmit = (event) => {
        event.preventDefault()
    }
    return (
        <>
        <form onSubmit={onSubmit}>
            <input name='email' type='text' placeholder='Email' required value={email} onChange={onChange} />
            <input name='password' type='text' placeholder='Password' value={password} onChange={onChange} />
            <input type='submit' value='Log In' />
        </form>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
        </>
    )
}

export default Auth;