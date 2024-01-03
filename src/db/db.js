import mongoose from "mongoose";

const connect = async () => {
    try{
        await mongoose.connect("mongodb+srv://saifkhadraoui656:AYSbUIMAcBJUXXTQ@cluster0.oobrkze.mongodb.net/", {
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
