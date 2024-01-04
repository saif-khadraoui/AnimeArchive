import mongoose from "mongoose";

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then((response) => {
            if(response){
                console.log("connected to db")
            }
        })
    } catch(error){
        console.log(error)
    }
}

export default connect;
