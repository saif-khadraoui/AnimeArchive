'use client'
import React, { useState } from 'react'
import "./LoginNavbar.scss"
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useRouter } from 'next/navigation';

function LoginNavbar() {
  const [anime, setAnime] = useState("")
  const router = useRouter()

  const fetchAnimes = () => {
    console.log(anime)
    router.push(`/animeSearch/${anime}`)
  }

  const loadHome = () => {
    router.push("/home")
  }

  const redirectLogin = () => {
    router.push("/login")
  }


  return (
    <nav className='navbar'>
        <div className='left'>
            <h2 onClick={loadHome}>AnimeArchive</h2>
        </div>
        <div className='right'>
            <div className='input'>
                <input type='text' placeholder='search anime...' value={anime} onChange={((e) => setAnime(e.target.value))}/>
                <SearchIcon sx={{ color: "black", cursor: "pointer" }} onClick={fetchAnimes} />
            </div>
            {/* <PersonOutlineIcon sx={{ color: "white", cursor: "pointer" }}/> */}
            <p onClick={redirectLogin}>Login</p>
        </div>
    </nav>
  )
}

export default LoginNavbar