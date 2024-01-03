// 'use server'

import openai from "@/config/openai"
import connect from "@/db/db"
import ReviewsModel from "@/models/Reviews"
import UsersModel from "@/models/User"
import { NextResponse } from "next/server"
 
export const fetchPopularAnimes = async () => {
    const response = await fetch(`https://shikimori.one/api/animes?limit=10&order=popularity`)
    const data = response.json()
    return data
}

// export const getAnimeDetails = async () => {

// }

export const searchAnime = async (anime: string) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${anime}&limit=1`)
    const data = await response.json()
    return data

}

export const fetchAnimes = async (anime: string) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${anime}&limit=10`)
    const data = await response.json()
    return data
}

export const fetchAnimeInfo = async (id: number) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`)
    const data = await response.json()
    return data
}


export const generateRecommendations = async () => {
    // const content = "test";
    // const response = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: "test" }],
    //   model: 'gpt-3.5-turbo'
    // })

    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        model: "gpt-3.5-turbo",
      });
    
      console.log(completion.choices[0]);
    
}