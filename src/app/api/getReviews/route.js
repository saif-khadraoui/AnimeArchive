import { NextResponse } from 'next/server';
import ReviewsModel from "../../../models/Reviews";
import connect from '@/db/db';


export const POST = async(request) => {
    const {animeId} = await request.json()
    console.log(animeId)
    await connect();

    try{
        const data = await ReviewsModel.find({ AnimeId: animeId })
        console.log(data)
        return NextResponse.json({ data })
    } catch(e){
        return new NextResponse("error")
    }

}