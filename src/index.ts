import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes";
import contentRouter from "./routes/content.routes";
import mongoose from "mongoose";

const app = express();
dotenv.config();

//routes
//api/v1/user/signup
//api/v1/user/signin
//api/v1/user/contents  all contents fetch

//api/v1/content  add
//api/v1/content  delete
//api/v1/share/brain/134256  share brains

//think on whether you want to save all content in a user, or want to put a refernce to co ntent with userId

app.use(express.json());
app.use("/api/v1/user",userRouter);
app.use("/api/v1/content",contentRouter);


async function main(){
    if(!process.env.MONGO_URI){
        console.log("Wrong Mongo credenttials");
        return;
    }
    await mongoose.connect(process.env.MONGO_URI,{dbName:"brainly"});
    console.log("DB Connected!!");
    app.listen(process.env.PORT,()=>{
        console.log(`server is running on port ${process.env.PORT}`);
    })
}
main();
