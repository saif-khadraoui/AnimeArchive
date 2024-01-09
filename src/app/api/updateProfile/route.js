import connect from "../../../db/db"
import { NextResponse } from 'next/server';
import UsersModel from './../../../models/User';


export const POST = async (res) => {
    const { userId, updatedEmail, updatedUsername, updatedImagePath } = await res.json()
    console.log(userId, updatedEmail, updatedUsername, updatedImagePath)

    await connect();

    const checkUserExists = await UsersModel.exists({ username: updatedUsername })
    const checkEmailExists = await UsersModel.exists({ email: updatedEmail })

    if(checkUserExists || checkEmailExists){
        console.log("user exists")
        return NextResponse.json({ message: "exists" })
    } else{
        try{
            const data = await UsersModel.findByIdAndUpdate(userId, {
                username: updatedUsername,
                email: updatedEmail,
                profilePic: updatedImagePath
            })
    
            console.log(data)
            return NextResponse.json({ data })
        } catch(e){
            return new NextResponse(e)
        }
    }
}