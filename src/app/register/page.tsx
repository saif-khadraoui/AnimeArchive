'use client'
import React, { FormEvent, useState } from 'react'
import "./register.scss"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function RegisterPage() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const attemptRegister = async (e: FormEvent) => {
        e.preventDefault();

        try{
            const res = await fetch("api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    username,
                    password,
                    profilePic: "https://i.pinimg.com/236x/0c/5a/da/0c5adadb67141dfef9cb8fc7e441a5d7.jpg"
                })
            })

            const data = await res.json()

            if(data.message){
                console.log(data)
                // console.log(data.checkUserExists.length)
                alert("User already exists with the same email and/or username")
            } else{
                router.push("/login")
            }

        } catch(error: unknown){
            console.log(error)
        }

    } 

  return (
    <div className='register'>
        <div className='register_wrapper'>
            <form onSubmit={attemptRegister}>
                <input type="email" placeholder='Email...' value={email} onChange={((e) => setEmail(e.target.value))}/>
                <input type="text" placeholder='Username...' value={username} onChange={((e) => setUsername(e.target.value))}/>
                <input type='password' placeholder='Password...' value={password} onChange={((e) => setPassword(e.target.value))}/>
                <button type="submit">Register</button>
            </form>
            <div className='link'>
                <p>Already have an account?</p>
                <Link href="/login"><p>Login</p></Link>
            </div>
        </div>
    </div>
  )
}

export default RegisterPage