import React from 'react'
import "./AnimeCard.scss"
import { useRouter } from 'next/navigation'

interface imageTypes{
  image_url: string
}

interface animeImages{
  jpg: imageTypes
}

interface anime{
  mal_id: string,
  title: string,
  images: animeImages
}

function AnimeCard({ anime }: { anime: anime }) {
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