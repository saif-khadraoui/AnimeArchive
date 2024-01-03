'use client'
import React, { useRef, useState, useEffect, RefObject } from 'react'
import "./Carousel.scss"
import { motion } from 'framer-motion'
//import animes from "./images"
import Image, { StaticImageData } from 'next/image';
import { searchWiki, fetchPopularAnimes, searchAnime } from '@/server-actions/actions';
import { useRouter } from 'next/navigation'

interface Anime{
    image: StaticImageData,
    title: string

}


function Carousel( {animes} : {animes: Array<Anime>} ) {
    const [width, setWidth] = useState(0)
    const carousel = useRef<React.Ref<HTMLDivElement>>()
    const router = useRouter()
    



    const fetchAnime = async (item: Anime) => {
        const data = await searchAnime(item.title)
        const id = data.data[0].mal_id
        router.push(`/anime/${id}`)
    }







    useEffect(() => {
        setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth)
    }, [])


  return (
    <div className='carousel'>
        <motion.div ref={carousel} className='carousel_content'>
            <motion.div drag="x" dragConstraints={{ right: 0,  left: -width}} className='inner_carousel'>
                {animes.map((item, idx) => {
                    return(
                        <motion.div className="item" key={idx} onClick={() => fetchAnime(item)}>
                            <Image src={item.image} alt=""/>
                            <p className="anime_title">{item.title}</p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </motion.div>
    </div>
  )
}

export default Carousel