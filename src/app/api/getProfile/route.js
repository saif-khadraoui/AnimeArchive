import connect from "../../../db/db"
import { NextResponse } from 'next/server';
import UsersModel from '../../../models/User';

export const POST = async(res) => {
    const {userId} = await res.json()

    await connect()

    try{
        const data = await UsersModel.find({ _id: userId })
        console.log(data)
        return NextResponse.json({ data })
    } catch(e){
        return new NextResponse(e)
    }


}