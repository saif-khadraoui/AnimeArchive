import React from 'react'
import "./AnimeCard.scss"
import { useRouter } from 'next/navigation'

function AnimeCard({ anime }: Object) {
    const router = useRouter()

    const getAnimeInfo = async () => {
        const id = anime.mal_id
        router.push(`/anime/${id}`)

    }

  return (
    <div className='anime_card' onClick={getAnimeInfo}>
        <img src={anime.images.jpg.image_url} alt=""/>
        <p>{anime.title}</p>
    </div>
  )
}

export default AnimeCard