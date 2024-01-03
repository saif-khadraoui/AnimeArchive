'use client'
import React, { useState, useContext, FormEvent, KeyboardEvent } from 'react'
import "./NavBar.scss"
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useRouter } from 'next/navigation';
import {UserContext} from "../../(context)/UserContext"

function NavBar() {
  const [anime, setAnime] = useState("")
  const { setUserLoggedIn, setEmail, setUsernameContext, setUserId } = useContext(UserContext)

  const userLoggedIn = localStorage.getItem("userLoggedIn")
  const userId = localStorage.getItem("userId")
  
  const router = useRouter()

  const handleKeyDownSearch = (event: KeyboardEvent) => {
    if (event.key == "Enter"){
      router.push(`/animeSearch/${anime}`)
    }
  }

  const fetchAnimes = () => {
    console.log(anime)
    router.push(`/animeSearch/${anime}`)

  }

  const loadHome = () => {
    console.log(userLoggedIn)
    router.push("/home")
  }

  const logout = () => {
    setUserLoggedIn("false")
    setEmail("")
    setUserId("")
    setUsernameContext("")
    router.push("/home")
  }

  
  const redirectLogin = () => {
    router.push("/login")
  }
  
  const redirectProfile = () => {
    router.push(`/profile/${userId}`)
  }

  return (
    <nav className='navbar'>
        <div className='left'>
            <h2 onClick={loadHome}>AnimeArchive</h2>
        </div>
        <div className='right'>
            <div className='input'>
                <input type='text' placeholder='search anime...' value={anime} onChange={((e) => setAnime(e.target.value))} onKeyDown={handleKeyDownSearch} />
                <SearchIcon sx={{ color: "black", cursor: "pointer" }} onClick={fetchAnimes} />
            </div>
            {userLoggedIn == "true" ? (
              <>
                <PersonOutlineIcon sx={{ color: "white", cursor: "pointer" }} onClick={redirectProfile} />
                <p onClick={logout}>Logout</p>
              </>
            ) : (
              <p onClick={redirectLogin}>Login</p>
            )
          }
        </div>
    </nav>
  )
}

export default NavBar