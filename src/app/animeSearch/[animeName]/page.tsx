'use client'
import React, { useEffect, useState } from 'react'
import "./AnimeSearch.scss"
import { fetchAnimes } from '@/server-actions/actions';
import AnimeCard from '@/components/animeCard/AnimeCard';
import NavBar from '@/components/navbar/NavBar';
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

function AnimeSearch({params}: any) {
    const [animes, setAnimes] = useState([])

    const fetchAnimeArray = async () => {
        const data = await fetchAnimes(params.animeName);
        console.log(data.data)
        setAnimes(data.data)
    }

    useEffect(() => {
        fetchAnimeArray()
    }, [])

    //console.log(animes)

  return (
    <div className='anime_search'>
        <NavBar />
            {animes ? (
                <div className='search_result'>
                {animes.map((anime, idx) => {
                    return (
                        <AnimeCard anime={anime}/>
                    )
            })}
            </div>
            ) : (
                <p>Loading</p>
  
            )}

        </div>
  )
}

export default AnimeSearch