'use client'
import React, { FormEvent, useContext, useState } from 'react'
import Link from 'next/link'
import "./login.scss"
import { useRouter } from 'next/navigation'
import { UserContext } from '@/(context)/UserContext'

function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const { setUserLoggedIn, setUsernameContext, setEmail, setProfilePic, setUserId } = useContext(UserContext)
    const router = useRouter()

    const attemptLogin = async (e: FormEvent) => {
        e.preventDefault()

        try{
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })

            const user = await res.json()
            console.log(user)

            if(user.data.length > 0){
                console.log(user.data)
                alert("user logged in")
                setUserLoggedIn("true")
                setUserId(user.data[0]._id)
                setEmail(user.data[0].email)
                setUsernameContext(user.data[0].username)
                setProfilePic(user.data[0].profilePic)
                

                router.push("/home")
            }

        } catch(err: unknown){
            console.log(err)
        }
    }

  return (
    <div className='login'>
        <div className='login_wrapper'>
            <form onSubmit={attemptLogin}>
                <input type="text" placeholder='Username...' value={username} onChange={((e) => setUsername(e.target.value))}/>
                <input type='password' placeholder='Password...' value={password} onChange={((e) => setPassword(e.target.value))}/>
                <button type='submit'>Login</button>
            </form>
            <div className='link'>
                <p>Don't have an account?</p>
                <Link href="/register"><p>Register</p></Link>
            </div>
        </div>
    </div>
  )
}

export default LoginPage;