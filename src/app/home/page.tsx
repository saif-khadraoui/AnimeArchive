'use client'
import React, { useContext } from 'react'
import "./home.scss"
import NavBar from '@/components/navbar/NavBar';
import Carousel from '@/components/carousel/Carousel';
import { hot_animes, winter_animes } from "../../components/carousel/images"
import { UserContext } from "../../(context)/UserContext"
import LoginNavbar from '@/components/loginNavbar/LoginNavbar';


function Home() {
  // const { UserLoggedIn, setLoggedIn } = useAppContext
  // setLoggedIn()
  // console.log(UserLoggedIn)

  const { userLoggedIn } = useContext(UserContext)

  return (
    <div className='home'>
      <NavBar />
        <div className='hero'>
            <div className='first_section' id="slider_section">
                <h4>Hot this week</h4>
                <Carousel animes={hot_animes}/>
            </div>
            <div className='second_section' id="slider_section">
                <h4>Winter animes</h4>
                <Carousel animes={winter_animes} />
            </div>
        </div>
    </div>
  )
}

export default Home;