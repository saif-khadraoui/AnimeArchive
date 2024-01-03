import connect from '@/db/db';
import { NextRequest, NextResponse } from 'next/server';
import UsersModel from './../../../models/User';
import { redirect } from 'next/navigation';


export const POST = async (request, res) => {
    const { username, password } = await request.json()

    await connect();

    try{
        const data = await UsersModel.find({
            username: username,
            password: password
        })

        console.log(data)
        return NextResponse.json({ data })
    } catch(err){
        console.log(err)
        return new NextResponse("error")
    }


}